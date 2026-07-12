from fastapi import APIRouter, HTTPException, status

from app.schemas.user import UserCreate
from app.schemas.auth import LoginRequest
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate):
    try:
        return await AuthService.signup(user)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/login")
async def login(credentials: LoginRequest):
    try:
        return await AuthService.login(
            credentials.email,
            credentials.password,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )