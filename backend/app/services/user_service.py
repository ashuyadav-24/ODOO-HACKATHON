from app.repositories.user_repository import UserRepository


class UserService:

    @staticmethod
    async def get_all_users():

        users = await UserRepository.get_all_users()

        for user in users:
            user["id"] = str(user["_id"])
            del user["_id"]
            user.pop("hashed_password", None)

        return users

    @staticmethod
    async def get_user_by_id(user_id: str):

        user = await UserRepository.get_user_by_id(user_id)

        if user is None:
            raise ValueError("User not found")

        user["id"] = str(user["_id"])
        del user["_id"]
        user.pop("hashed_password", None)

        return user

    @staticmethod
    async def update_user(user_id: str, data):

        user = await UserRepository.get_user_by_id(user_id)

        if user is None:
            raise ValueError("User not found")

        update_data = data.model_dump(exclude_unset=True)

        updated_user = await UserRepository.update_user(
            user_id,
            update_data,
        )

        updated_user["id"] = str(updated_user["_id"])
        del updated_user["_id"]
        updated_user.pop("hashed_password", None)

        return updated_user

    @staticmethod
    async def update_role(user_id: str, role: str):

        user = await UserRepository.get_user_by_id(user_id)

        if user is None:
            raise ValueError("User not found")

        allowed_roles = [
            "admin",
            "asset_manager",
            "department_head",
            "employee",
        ]

        if role not in allowed_roles:
            raise ValueError("Invalid role")

        updated_user = await UserRepository.update_user(
            user_id,
            {
                "role": role,
            },
        )

        updated_user["id"] = str(updated_user["_id"])
        del updated_user["_id"]
        updated_user.pop("hashed_password", None)

        return updated_user

    @staticmethod
    async def deactivate_user(user_id: str):

        user = await UserRepository.get_user_by_id(user_id)

        if user is None:
            raise ValueError("User not found")

        updated_user = await UserRepository.update_user(
            user_id,
            {
                "is_active": False,
            },
        )

        updated_user["id"] = str(updated_user["_id"])
        del updated_user["_id"]
        updated_user.pop("hashed_password", None)

        return updated_user

    @staticmethod
    async def activate_user(user_id: str):

        user = await UserRepository.get_user_by_id(user_id)

        if user is None:
            raise ValueError("User not found")

        updated_user = await UserRepository.update_user(
            user_id,
            {
                "is_active": True,
            },
        )

        updated_user["id"] = str(updated_user["_id"])
        del updated_user["_id"]
        updated_user.pop("hashed_password", None)

        return updated_user