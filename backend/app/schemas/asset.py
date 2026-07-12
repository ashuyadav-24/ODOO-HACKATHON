from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class AssetCreate(BaseModel):

    asset_name: str = Field(..., min_length=2)

    serial_number: str

    category_id: str

    department_id: str

    location: str

    condition: str

    purchase_date: datetime

    purchase_cost: float

    warranty_expiry: Optional[datetime] = None

    is_shared: bool = False

    photo_url: Optional[str] = None

    documents: list[str] = []


class AssetUpdate(BaseModel):

    asset_name: Optional[str] = None

    serial_number: Optional[str] = None

    category_id: Optional[str] = None

    department_id: Optional[str] = None

    location: Optional[str] = None

    condition: Optional[str] = None

    purchase_date: Optional[datetime] = None

    purchase_cost: Optional[float] = None

    warranty_expiry: Optional[datetime] = None

    is_shared: Optional[bool] = None

    photo_url: Optional[str] = None

    documents: Optional[list[str]] = None

    status: Optional[str] = None


class AssetResponse(BaseModel):

    id: str

    asset_name: str

    asset_tag: str

    serial_number: str

    category_id: str

    department_id: str

    location: str

    condition: str

    purchase_date: datetime

    purchase_cost: float

    warranty_expiry: Optional[datetime]

    is_shared: bool

    status: str

    photo_url: Optional[str]

    documents: list[str]

    created_by: str

    created_at: datetime

    updated_at: datetime