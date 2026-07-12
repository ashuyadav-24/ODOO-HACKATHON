from datetime import datetime

from app.models.department import Department
from app.repositories.department_repository import DepartmentRepository
from app.repositories.user_repository import UserRepository


class DepartmentService:

    @staticmethod
    async def create(data):

        existing = await DepartmentRepository.get_by_name(data.name)

        if existing:
            raise ValueError("Department already exists")

        if data.head_id:

            head = await UserRepository.get_user_by_id(data.head_id)

            if head is None:
                raise ValueError("Department head not found")

        department = Department(
            **data.model_dump()
        )

        created = await DepartmentRepository.create(
            department.model_dump()
        )

        created["id"] = str(created["_id"])
        del created["_id"]
        return created

    @staticmethod
    async def get_all():

        departments = await DepartmentRepository.get_all()

        for department in departments:
            department["id"] = str(department["_id"])
            del department["_id"]
        return departments

    @staticmethod
    async def get_by_id(department_id: str):

        department = await DepartmentRepository.get_by_id(
            department_id
        )

        if department is None:
            raise ValueError("Department not found")

        department["id"] = str(department["_id"])
        del department["_id"]
        return department

    @staticmethod
    async def update(department_id: str, data):

        department = await DepartmentRepository.get_by_id(
            department_id
        )

        if department is None:
            raise ValueError("Department not found")

        update_data = data.model_dump(exclude_unset=True)

        update_data["updated_at"] = datetime.utcnow()

        updated = await DepartmentRepository.update(
            department_id,
            update_data,
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]
        return updated

    @staticmethod
    async def delete(department_id: str):

        department = await DepartmentRepository.get_by_id(
            department_id
        )

        if department is None:
            raise ValueError("Department not found")

        await DepartmentRepository.delete(department_id)

        return {
            "message": "Department deleted successfully"
        }