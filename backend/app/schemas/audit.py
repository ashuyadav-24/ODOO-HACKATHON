from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AuditCreate(BaseModel):
    user_id: str

    action: str

    module: str

    reference_id: Optional[str] = None

    details: dict = {}


class AuditResponse(BaseModel):
    id: str

    user_id: str

    action: str

    module: str

    reference_id: Optional[str]

    details: dict

    timestamp: datetime