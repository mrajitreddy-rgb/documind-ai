from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)

    upload_id = Column(
        Integer,
        ForeignKey("uploads.id")
    )

    invoice_number = Column(String)

    invoice_date = Column(String)

    dealer = Column(String)

    customer = Column(String)

    amount = Column(Float)

    page = Column(Integer)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    upload = relationship(
        "Upload",
        back_populates="invoices"
    )