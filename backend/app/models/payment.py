from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime

from app.database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    payment_id = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    order_id = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    customer_name = Column(
        String,
        nullable=True,
    )

    customer_email = Column(
        String,
        nullable=True,
        index=True,
    )

    customer_phone = Column(
        String,
        nullable=True,
    )

    plan = Column(
        String,
        nullable=False,
        default="Lifetime",
    )

    amount = Column(
        Float,
        nullable=False,
    )

    currency = Column(
        String,
        nullable=False,
    )

    status = Column(
        String,
        nullable=False,
        default="paid",
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )