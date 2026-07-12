from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserCreate(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    role: str
    is_active: bool


class UserInDB(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    hashed_password: str
    role: str
    is_active: bool = True