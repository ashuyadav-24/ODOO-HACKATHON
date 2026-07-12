from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class BookingCreate(BaseModel):
    asset_id: str

    start_time: datetime

    end_time: datetime

    purpose: str = Field(..., min_length=3, max_length=500)


class BookingUpdate(BaseModel):
    start_time: Optional[datetime] = None

    end_time: Optional[datetime] = None

    purpose: Optional[str] = None


class BookingApproval(BaseModel):
    status: str
    rejection_reason: Optional[str] = None


class BookingResponse(BaseModel):
    id: str

    asset_id: str

    user_id: str

    start_time: datetime

    end_time: datetime

    purpose: str

    status: str

    approved_by: Optional[str]

    rejection_reason: Optional[str]

    created_at: datetime

    updated_at: datetime