from fastapi import APIRouter, HTTPException, status

from app.schemas.category import CategoryCreate, CategoryUpdate
from app.services.category_service import CategoryService

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_category(category: CategoryCreate):
    try:
        return await CategoryService.create_category(category)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("/")
async def get_all_categories():
    return await CategoryService.get_all_categories()


@router.get("/{category_id}")
async def get_category(category_id: str):
    try:
        return await CategoryService.get_category_by_id(category_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.put("/{category_id}")
async def update_category(category_id: str, category: CategoryUpdate):
    try:
        return await CategoryService.update_category(category_id, category)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.delete("/{category_id}")
async def delete_category(category_id: str):
    try:
        return await CategoryService.delete_category(category_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )