from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Upload(Base):
    __tablename__ = "uploads"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    pages = Column(Integer)

    batch_count = Column(Integer)

    invoice_count = Column(Integer)

    total_amount = Column(Float, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)

    invoices = relationship(
        "Invoice",
        back_populates="upload",
        cascade="all, delete-orphan"
    )