from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AllocationCreate(BaseModel):
    asset_id: str

    user_id: str

    expected_return_date: datetime

    remarks: Optional[str] = None


class AllocationReturn(BaseModel):
    remarks: Optional[str] = None


class AllocationUpdate(BaseModel):
    expected_return_date: Optional[datetime] = None

    remarks: Optional[str] = None


class AllocationResponse(BaseModel):
    id: str

    asset_id: str

    user_id: str

    allocated_by: str

    allocated_at: datetime

    expected_return_date: datetime

    returned_at: Optional[datetime]

    remarks: Optional[str]

    status: str