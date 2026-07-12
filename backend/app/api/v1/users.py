from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("/me")
async def get_me(
    current_user=Depends(get_current_user),
):
    current_user["_id"] = str(current_user["_id"])
    current_user.pop("hashed_password", None)

    return current_user