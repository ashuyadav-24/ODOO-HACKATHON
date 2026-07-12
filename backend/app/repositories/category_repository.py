from bson import ObjectId

from app.database.mongodb import get_database


class CategoryRepository:

    @staticmethod
    async def create_category(category: dict):
        db = get_database()

        result = await db.categories.insert_one(category)

        return await db.categories.find_one({"_id": result.inserted_id})

    @staticmethod
    async def get_category_by_name(name: str):
        db = get_database()

        return await db.categories.find_one({"name": name})

    @staticmethod
    async def get_all_categories():
        db = get_database()

        return await db.categories.find().to_list(length=None)

    @staticmethod
    async def get_category_by_id(category_id: str):
        db = get_database()

        return await db.categories.find_one(
            {"_id": ObjectId(category_id)}
        )

    @staticmethod
    async def update_category(category_id: str, data: dict):
        db = get_database()

        await db.categories.update_one(
            {"_id": ObjectId(category_id)},
            {"$set": data},
        )

        return await db.categories.find_one(
            {"_id": ObjectId(category_id)}
        )

    @staticmethod
    async def delete_category(category_id: str):
        db = get_database()

        await db.categories.delete_one(
            {"_id": ObjectId(category_id)}
    )