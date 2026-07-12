from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import RoleChecker, get_current_user
from app.schemas.asset import AssetCreate, AssetUpdate
from app.services.asset_service import AssetService

router = APIRouter(
    prefix="/assets",
    tags=["Assets"],
)

asset_manager = RoleChecker(["admin", "asset_manager"])


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
async def create_asset(
    data: AssetCreate,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await AssetService.create(
            data,
            current_user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("")
async def get_all_assets(
    current_user=Depends(get_current_user),
):
    return await AssetService.get_all()


@router.get("/{asset_id}")
async def get_asset(
    asset_id: str,
    current_user=Depends(get_current_user),
):
    try:
        return await AssetService.get_by_id(asset_id)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.get("/tag/{asset_tag}")
async def get_asset_by_tag(
    asset_tag: str,
    current_user=Depends(get_current_user),
):
    try:
        return await AssetService.get_by_asset_tag(asset_tag)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.get("/search/{keyword}")
async def search_assets(
    keyword: str,
    current_user=Depends(get_current_user),
):
    return await AssetService.search(keyword)


@router.get("/status/{status_name}")
async def get_assets_by_status(
    status_name: str,
    current_user=Depends(get_current_user),
):
    return await AssetService.get_by_status(status_name)


@router.get("/department/{department_id}")
async def get_assets_by_department(
    department_id: str,
    current_user=Depends(get_current_user),
):
    return await AssetService.get_by_department(department_id)


@router.get("/category/{category_id}")
async def get_assets_by_category(
    category_id: str,
    current_user=Depends(get_current_user),
):
    return await AssetService.get_by_category(category_id)


@router.put("/{asset_id}")
async def update_asset(
    asset_id: str,
    data: AssetUpdate,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await AssetService.update(
            asset_id,
            data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.delete("/{asset_id}")
async def delete_asset(
    asset_id: str,
    current_user=Depends(get_current_user),
    user=Depends(asset_manager),
):
    try:
        return await AssetService.delete(asset_id)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )