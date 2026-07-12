from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Booking(BaseModel):
    asset_id: str

    user_id: str

    start_time: datetime

    end_time: datetime

    purpose: str

    status: str = "Pending"

    approved_by: Optional[str] = None

    rejection_reason: Optional[str] = None

    created_at: datetime = datetime.utcnow()

    updated_at: datetime = datetime.utcnow()