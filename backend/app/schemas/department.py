from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class DepartmentCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    code: str = Field(..., min_length=2, max_length=10)
    description: Optional[str] = None
    head_id: Optional[str] = None
    parent_department_id: Optional[str] = None


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    description: Optional[str] = None
    head_id: Optional[str] = None
    parent_department_id: Optional[str] = None
    status: Optional[str] = None


class DepartmentResponse(BaseModel):
    id: str
    name: str
    code: str
    description: Optional[str]
    head_id: Optional[str]
    parent_department_id: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime