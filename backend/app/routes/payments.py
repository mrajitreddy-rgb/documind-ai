from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db
from app.models.payment import Payment

from app.services.payment_service import (
    create_order,
    verify_signature,
    RAZORPAY_KEY_ID,
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


class CreateOrderRequest(BaseModel):
    plan: str


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


@router.post("/create-order")
def create_payment_order(request: CreateOrderRequest):

    if request.plan == "india":
        amount = 499900
        currency = "INR"

    elif request.plan == "international":
        amount = 14900
        currency = "USD"

    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid pricing plan",
        )

    order = create_order(
        amount=amount,
        currency=currency,
    )

    return {
        "success": True,
        "key": RAZORPAY_KEY_ID,
        "order": order,
    }


@router.post("/verify")
def verify_payment(
    request: VerifyPaymentRequest,
    db: Session = Depends(get_db),
):

    verified = verify_signature(
        razorpay_order_id=request.razorpay_order_id,
        razorpay_payment_id=request.razorpay_payment_id,
        razorpay_signature=request.razorpay_signature,
    )


    if not verified:
        raise HTTPException(
            status_code=400,
            detail="Payment verification failed.",
        )
    existing_payment = (
        db.query(Payment)
        .filter(
            Payment.payment_id == request.razorpay_payment_id
        )
        .first()
    )

    if existing_payment:
        return {
            "success": True,
            "message": "Payment already recorded.",
        }

    payment = Payment(
        payment_id=request.razorpay_payment_id,
        order_id=request.razorpay_order_id,
        amount=1.0,          # We'll replace this after launch with the actual order amount
        currency="INR",      # We'll make this dynamic in the next version
        status="paid",
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)
    return {
        "success": True,
        "message": "Payment verified successfully.",
    }