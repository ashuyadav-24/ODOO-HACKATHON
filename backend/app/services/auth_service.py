from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


class AuthService:

    @staticmethod
    async def signup(user: UserCreate):

        existing_user = await UserRepository.get_user_by_email(user.email)

        if existing_user:
            raise ValueError("Email already registered")

        user_data = user.model_dump()

        password = user_data.pop("password")

        user_data["hashed_password"] = hash_password(password)

        user_data["role"] = "employee"

        user_data["is_active"] = True

        created_user = await UserRepository.create_user(user_data)

        return {
            "message": "User registered successfully",
            "user_id": str(created_user["_id"])
        }

    @staticmethod
    async def login(email: str, password: str):

        user = await UserRepository.get_user_by_email(email)

        if not user:
            raise ValueError("Invalid email or password")

        if not verify_password(password, user["hashed_password"]):
            raise ValueError("Invalid email or password")

        token = create_access_token(
            {
                "sub": str(user["_id"]),
                "email": user["email"],
                "role": user["role"],
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }