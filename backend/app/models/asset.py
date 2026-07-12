from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Asset(BaseModel):
    asset_name: str

    asset_tag: str

    serial_number: str

    category_id: str

    department_id: str

    location: str

    condition: str

    purchase_date: datetime

    purchase_cost: float

    warranty_expiry: Optional[datetime] = None

    is_shared: bool = False

    status: str = "Available"

    photo_url: Optional[str] = None

    documents: list[str] = []

    created_by: str

    created_at: datetime = datetime.utcnow()

    updated_at: datetime = datetime.utcnow()