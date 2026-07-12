from bson import ObjectId

from app.database.mongodb import get_database


class BookingRepository:

    @staticmethod
    async def create(booking: dict):
        db = get_database()

        result = await db.bookings.insert_one(
            booking
        )

        return await db.bookings.find_one(
            {
                "_id": result.inserted_id
            }
        )

    @staticmethod
    async def get_all():
        db = get_database()

        bookings = []

        async for booking in db.bookings.find().sort(
            "created_at",
            -1,
        ):
            bookings.append(booking)

        return bookings

    @staticmethod
    async def get_by_id(booking_id: str):
        db = get_database()

        return await db.bookings.find_one(
            {
                "_id": ObjectId(booking_id)
            }
        )

    @staticmethod
    async def get_by_user(user_id: str):
        db = get_database()

        bookings = []

        async for booking in db.bookings.find(
            {
                "user_id": user_id
            }
        ).sort(
            "created_at",
            -1,
        ):
            bookings.append(booking)

        return bookings

    @staticmethod
    async def get_by_asset(asset_id: str):
        db = get_database()

        bookings = []

        async for booking in db.bookings.find(
            {
                "asset_id": asset_id
            }
        ).sort(
            "created_at",
            -1,
        ):
            bookings.append(booking)

        return bookings

    @staticmethod
    async def get_pending():
        db = get_database()

        bookings = []

        async for booking in db.bookings.find(
            {
                "status": "Pending"
            }
        ).sort(
            "created_at",
            -1,
        ):
            bookings.append(booking)

        return bookings

    @staticmethod
    async def update(
        booking_id: str,
        data: dict,
    ):
        db = get_database()

        await db.bookings.update_one(
            {
                "_id": ObjectId(booking_id)
            },
            {
                "$set": data
            },
        )

        return await db.bookings.find_one(
            {
                "_id": ObjectId(booking_id)
            }
        )

    @staticmethod
    async def delete(booking_id: str):
        db = get_database()

        return await db.bookings.delete_one(
            {
                "_id": ObjectId(booking_id)
            }
        )