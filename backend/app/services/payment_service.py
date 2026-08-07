import os
import razorpay
from dotenv import load_dotenv

load_dotenv()

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
    raise ValueError("Razorpay API keys are missing in .env")

client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)


def create_order(amount: int, currency: str = "INR"):
    """
    amount must be in the smallest currency unit.

    Example:
        ₹4999  -> 499900 paise
        $149   -> 14900 cents
    """

    order = client.order.create(
        {
            "amount": amount,
            "currency": currency,
            "payment_capture": 1,
        }
    )

    return order


def verify_signature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
):
    try:

        client.utility.verify_payment_signature(
            {
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": razorpay_payment_id,
                "razorpay_signature": razorpay_signature,
            }
        )

        return True

    except Exception:

        return False