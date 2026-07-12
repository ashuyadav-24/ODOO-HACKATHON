from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Allocation(BaseModel):
    asset_id: str

    user_id: str

    allocated_by: str

    allocated_at: datetime = datetime.utcnow()

    expected_return_date: datetime

    returned_at: Optional[datetime] = None

    remarks: Optional[str] = None

    status: str = "Allocated"