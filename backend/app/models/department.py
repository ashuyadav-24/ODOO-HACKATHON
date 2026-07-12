from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Department(BaseModel):
    name: str
    code: str
    description: Optional[str] = None

    head_id: Optional[str] = None
    parent_department_id: Optional[str] = None

    status: str = "active"

    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()