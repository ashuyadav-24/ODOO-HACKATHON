from bson import ObjectId

from app.database.mongodb import get_database


class DepartmentRepository:

    @staticmethod
    async def get_by_name(name: str):
        db = get_database()
        return await db.departments.find_one(
            {
                "name": {
                    "$regex": f"^{name}$",
                    "$options": "i"
                }
            }
        )

    @staticmethod
    async def create(department: dict):
        db = get_database()

        result = await db.departments.insert_one(department)

        return await db.departments.find_one(
            {
                "_id": result.inserted_id
            }
        )

    @staticmethod
    async def get_all():
        db = get_database()

        departments = []

        async for department in db.departments.find():
            departments.append(department)

        return departments

    @staticmethod
    async def get_by_id(department_id: str):
        db = get_database()

        return await db.departments.find_one(
            {
                "_id": ObjectId(department_id)
            }
        )

    @staticmethod
    async def update(department_id: str, data: dict):
        db = get_database()

        await db.departments.update_one(
            {
                "_id": ObjectId(department_id)
            },
            {
                "$set": data
            }
        )

        return await db.departments.find_one(
            {
                "_id": ObjectId(department_id)
            }
        )

    @staticmethod
    async def delete(department_id: str):
        db = get_database()

        return await db.departments.delete_one(
            {
                "_id": ObjectId(department_id)
            }
        )