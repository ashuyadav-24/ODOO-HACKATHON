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
        return await db.users.find_one(
            {"_id": ObjectId(user_id)}
        )

    @staticmethod
    async def create_user(user: dict):
        db = get_database()

        result = await db.users.insert_one(user)

        return await db.users.find_one(
            {"_id": result.inserted_id}
        )

    @staticmethod
    async def get_all_users():
        db = get_database()

        users = []

        async for user in db.users.find():
            users.append(user)

        return users

    @staticmethod
    async def update_user(user_id: str, data: dict):
        db = get_database()

        await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": data
            }
        )

        return await db.users.find_one(
            {"_id": ObjectId(user_id)}
        )

    @staticmethod
    async def delete_user(user_id: str):
        db = get_database()

        return await db.users.delete_one(
            {"_id": ObjectId(user_id)}
        )