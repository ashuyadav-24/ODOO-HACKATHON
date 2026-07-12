from pydantic import BaseModel, EmailStr


class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    hashed_password: str
    role: str = "employee"
    is_active: bool = True