from bson import ObjectId

from app.database.mongodb import get_database


class AuditRepository:

    @staticmethod
    async def create(audit: dict):
        db = get_database()

        result = await db.audits.insert_one(audit)

        return await db.audits.find_one(
            {
                "_id": result.inserted_id
            }
        )

    @staticmethod
    async def get_all():
        db = get_database()

        audits = []

        async for audit in db.audits.find().sort("timestamp", -1):
            audits.append(audit)

        return audits

    @staticmethod
    async def get_by_id(audit_id: str):
        db = get_database()

        return await db.audits.find_one(
            {
                "_id": ObjectId(audit_id)
            }
        )

    @staticmethod
    async def get_by_user(user_id: str):
        db = get_database()

        audits = []

        async for audit in db.audits.find(
            {
                "user_id": user_id
            }
        ).sort("timestamp", -1):
            audits.append(audit)

        return audits

    @staticmethod
    async def get_by_module(module: str):
        db = get_database()

        audits = []

        async for audit in db.audits.find(
            {
                "module": module
            }
        ).sort("timestamp", -1):
            audits.append(audit)

        return audits

    @staticmethod
    async def get_by_action(action: str):
        db = get_database()

        audits = []

        async for audit in db.audits.find(
            {
                "action": action
            }
        ).sort("timestamp", -1):
            audits.append(audit)

        return audits

    @staticmethod
    async def delete(audit_id: str):
        db = get_database()

        return await db.audits.delete_one(
            {
                "_id": ObjectId(audit_id)
            }
        )