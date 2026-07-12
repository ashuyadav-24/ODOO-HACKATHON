from app.database.mongodb import get_database


class DashboardService:

    @staticmethod
    async def get_summary():

        db = get_database()

        total_assets = await db.assets.count_documents({})

        available_assets = await db.assets.count_documents(
            {
                "status": "Available"
            }
        )

        allocated_assets = await db.assets.count_documents(
            {
                "status": "Allocated"
            }
        )

        maintenance_assets = await db.assets.count_documents(
            {
                "status": "Under Maintenance"
            }
        )

        total_users = await db.users.count_documents({})

        active_bookings = await db.bookings.count_documents(
            {
                "status": "Approved"
            }
        )

        total_departments = await db.departments.count_documents({})

        total_categories = await db.categories.count_documents({})

        return {
            "total_assets": total_assets,
            "available_assets": available_assets,
            "allocated_assets": allocated_assets,
            "maintenance_assets": maintenance_assets,
            "total_users": total_users,
            "active_bookings": active_bookings,
            "total_departments": total_departments,
            "total_categories": total_categories,
        }

    @staticmethod
    async def get_recent_activities():

        db = get_database()

        activities = await db.audits.find().sort(
            "timestamp",
            -1,
        ).limit(10).to_list(length=10)

        for activity in activities:
            activity["id"] = str(activity["_id"])
            del activity["_id"]

        return activities

    @staticmethod
    async def get_asset_status():

        db = get_database()

        return {
            "Available": await db.assets.count_documents(
                {
                    "status": "Available"
                }
            ),
            "Allocated": await db.assets.count_documents(
                {
                    "status": "Allocated"
                }
            ),
            "Under Maintenance": await db.assets.count_documents(
                {
                    "status": "Under Maintenance"
                }
            ),
        }

    @staticmethod
    async def get_department_summary():

        db = get_database()

        departments = await db.departments.find().to_list(length=None)

        summary = []

        for department in departments:

            count = await db.assets.count_documents(
                {
                    "department_id": str(department["_id"])
                }
            )

            summary.append(
                {
                    "department": department["name"],
                    "total_assets": count,
                }
            )

        return summary

    @staticmethod
    async def get_category_summary():

        db = get_database()

        categories = await db.categories.find().to_list(length=None)

        summary = []

        for category in categories:

            count = await db.assets.count_documents(
                {
                    "category_id": str(category["_id"])
                }
            )

            summary.append(
                {
                    "category": category["name"],
                    "total_assets": count,
                }
            )

        return summary