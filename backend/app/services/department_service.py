from datetime import datetime

from app.models.department import Department
from app.repositories.department_repository import DepartmentRepository
from app.repositories.user_repository import UserRepository
from app.utils.audit import log_audit


class DepartmentService:

    @staticmethod
    async def create(data, current_user):

        existing = await DepartmentRepository.get_by_name(
            data.name
        )

        if existing:
            raise ValueError("Department already exists")

        if data.head_id:

            head = await UserRepository.get_user_by_id(
                data.head_id
            )

            if head is None:
                raise ValueError("Department head not found")

        department = Department(
            **data.model_dump()
        )

        created = await DepartmentRepository.create(
            department.model_dump()
        )

        await log_audit(
            current_user=current_user,
            action="CREATE_DEPARTMENT",
            module="Departments",
            reference_id=str(created["_id"]),
            details={
                "department": created["name"],
                "code": created["code"],
            },
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
    async def update(
        department_id: str,
        data,
        current_user,
    ):

        department = await DepartmentRepository.get_by_id(
            department_id
        )

        if department is None:
            raise ValueError("Department not found")

        update_data = data.model_dump(
            exclude_unset=True
        )

        update_data["updated_at"] = datetime.utcnow()

        updated = await DepartmentRepository.update(
            department_id,
            update_data,
        )

        await log_audit(
            current_user=current_user,
            action="UPDATE_DEPARTMENT",
            module="Departments",
            reference_id=department_id,
            details={
                "department": updated["name"],
                "code": updated["code"],
            },
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def delete(
        department_id: str,
        current_user,
    ):

        department = await DepartmentRepository.get_by_id(
            department_id
        )

        if department is None:
            raise ValueError("Department not found")

        await DepartmentRepository.delete(
            department_id
        )

        await log_audit(
            current_user=current_user,
            action="DELETE_DEPARTMENT",
            module="Departments",
            reference_id=department_id,
            details={
                "department": department["name"],
                "code": department["code"],
            },
        )

        return {
            "message": "Department deleted successfully"
        }