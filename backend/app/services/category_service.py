from app.repositories.category_repository import CategoryRepository
from app.schemas.category import CategoryCreate, CategoryUpdate
from app.utils.audit import log_audit


class CategoryService:

    @staticmethod
    async def create_category(
        category: CategoryCreate,
        current_user,
    ):

        existing = await CategoryRepository.get_category_by_name(
            category.name
        )

        if existing:
            raise ValueError("Category already exists")

        category_data = category.model_dump()

        created = await CategoryRepository.create_category(
            category_data
        )

        await log_audit(
            current_user=current_user,
            action="CREATE_CATEGORY",
            module="Categories",
            reference_id=str(created["_id"]),
            details={
                "category": created["name"],
            },
        )

        return {
            "message": "Category created successfully",
            "category_id": str(created["_id"]),
        }

    @staticmethod
    async def get_all_categories():

        categories = await CategoryRepository.get_all_categories()

        for category in categories:
            category["id"] = str(category["_id"])
            del category["_id"]

        return categories

    @staticmethod
    async def get_category_by_id(category_id: str):

        category = await CategoryRepository.get_category_by_id(
            category_id
        )

        if not category:
            raise ValueError("Category not found")

        category["id"] = str(category["_id"])
        del category["_id"]

        return category

    @staticmethod
    async def update_category(
        category_id: str,
        category: CategoryUpdate,
        current_user,
    ):

        existing = await CategoryRepository.get_category_by_id(
            category_id
        )

        if not existing:
            raise ValueError("Category not found")

        update_data = {
            k: v
            for k, v in category.model_dump().items()
            if v is not None
        }

        updated = await CategoryRepository.update_category(
            category_id,
            update_data,
        )

        await log_audit(
            current_user=current_user,
            action="UPDATE_CATEGORY",
            module="Categories",
            reference_id=category_id,
            details={
                "category": updated["name"],
            },
        )

        return {
            "message": "Category updated successfully"
        }

    @staticmethod
    async def delete_category(
        category_id: str,
        current_user,
    ):

        category = await CategoryRepository.get_category_by_id(
            category_id
        )

        if not category:
            raise ValueError("Category not found")

        await CategoryRepository.delete_category(
            category_id
        )

        await log_audit(
            current_user=current_user,
            action="DELETE_CATEGORY",
            module="Categories",
            reference_id=category_id,
            details={
                "category": category["name"],
            },
        )

        return {
            "message": "Category deleted successfully"
        }