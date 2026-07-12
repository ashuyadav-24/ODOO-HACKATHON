from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Maintenance(BaseModel):
    asset_id: str

    reported_by: str

    assigned_to: Optional[str] = None

    issue: str

    description: Optional[str] = None

    priority: str = "Medium"

    status: str = "Pending"

    scheduled_date: Optional[datetime] = None

    completed_date: Optional[datetime] = None

    remarks: Optional[str] = None

    created_at: datetime = datetime.utcnow()

    updated_at: datetime = datetime.utcnow()