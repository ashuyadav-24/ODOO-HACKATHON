from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class MaintenanceCreate(BaseModel):
    asset_id: str

    assigned_to: Optional[str] = None

    issue: str = Field(..., min_length=5)

    description: Optional[str] = None

    priority: str = "Medium"

    scheduled_date: Optional[datetime] = None


class MaintenanceUpdate(BaseModel):
    assigned_to: Optional[str] = None

    issue: Optional[str] = None

    description: Optional[str] = None

    priority: Optional[str] = None

    scheduled_date: Optional[datetime] = None

    remarks: Optional[str] = None

    status: Optional[str] = None


class MaintenanceComplete(BaseModel):
    remarks: Optional[str] = None


class MaintenanceResponse(BaseModel):
    id: str

    asset_id: str

    reported_by: str

    assigned_to: Optional[str]

    issue: str

    description: Optional[str]

    priority: str

    status: str

    scheduled_date: Optional[datetime]

    completed_date: Optional[datetime]

    remarks: Optional[str]

    created_at: datetime

    updated_at: datetime