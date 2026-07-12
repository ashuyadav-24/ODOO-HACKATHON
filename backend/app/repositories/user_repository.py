from bson import ObjectId

from app.database.mongodb import get_database


class UserRepository:

    @staticmethod
    async def get_user_by_email(email: str):
        db = get_database()
        return await db.users.find_one({"email": email})

    @staticmethod
    async def get_user_by_id(user_id: str):
        db = get_database()
        return await db.users.find_one({"_id": ObjectId(user_id)})

    @staticmethod
    async def create_user(user: dict):
        db = get_database()

        result = await db.users.insert_one(user)

        return await db.users.find_one({"_id": result.inserted_id})