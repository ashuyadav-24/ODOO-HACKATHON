from datetime import datetime

from app.models.booking import Booking
from app.repositories.asset_repository import AssetRepository
from app.repositories.booking_repository import BookingRepository
from app.repositories.user_repository import UserRepository
from app.utils.audit import log_audit


class BookingService:

    @staticmethod
    async def create(data, current_user):

        asset = await AssetRepository.get_by_id(
            data.asset_id
        )

        if asset is None:
            raise ValueError("Asset not found")

        if not asset["is_shared"]:
            raise ValueError(
                "This asset cannot be booked"
            )

        user = await UserRepository.get_user_by_id(
            str(current_user["_id"])
        )

        if user is None:
            raise ValueError("User not found")

        booking = Booking(
            **data.model_dump(),
            user_id=str(current_user["_id"]),
        )

        created = await BookingRepository.create(
            booking.model_dump()
        )

        await log_audit(
            current_user=current_user,
            action="CREATE_BOOKING",
            module="Bookings",
            reference_id=str(created["_id"]),
            details={
                "asset_id": created["asset_id"],
                "purpose": created["purpose"],
            },
        )

        created["id"] = str(created["_id"])
        del created["_id"]

        return created

    @staticmethod
    async def get_all():

        bookings = await BookingRepository.get_all()

        for booking in bookings:
            booking["id"] = str(booking["_id"])
            del booking["_id"]

        return bookings

    @staticmethod
    async def get_by_id(
        booking_id: str,
    ):

        booking = await BookingRepository.get_by_id(
            booking_id
        )

        if booking is None:
            raise ValueError("Booking not found")

        booking["id"] = str(booking["_id"])
        del booking["_id"]

        return booking

    @staticmethod
    async def get_by_user(
        user_id: str,
    ):

        bookings = await BookingRepository.get_by_user(
            user_id
        )

        for booking in bookings:
            booking["id"] = str(booking["_id"])
            del booking["_id"]

        return bookings

    @staticmethod
    async def get_by_asset(
        asset_id: str,
    ):

        bookings = await BookingRepository.get_by_asset(
            asset_id
        )

        for booking in bookings:
            booking["id"] = str(booking["_id"])
            del booking["_id"]

        return bookings

    @staticmethod
    async def get_pending():

        bookings = await BookingRepository.get_pending()

        for booking in bookings:
            booking["id"] = str(booking["_id"])
            del booking["_id"]

        return bookings

    @staticmethod
    async def update(
        booking_id: str,
        data,
        current_user,
    ):

        booking = await BookingRepository.get_by_id(
            booking_id
        )

        if booking is None:
            raise ValueError("Booking not found")

        update_data = data.model_dump(
            exclude_unset=True
        )

        update_data["updated_at"] = datetime.utcnow()

        updated = await BookingRepository.update(
            booking_id,
            update_data,
        )

        await log_audit(
            current_user=current_user,
            action="UPDATE_BOOKING",
            module="Bookings",
            reference_id=booking_id,
            details={
                "asset_id": updated["asset_id"],
            },
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def approve(
        booking_id: str,
        current_user,
    ):

        booking = await BookingRepository.get_by_id(
            booking_id
        )

        if booking is None:
            raise ValueError("Booking not found")

        updated = await BookingRepository.update(
            booking_id,
            {
                "status": "Approved",
                "approved_by": str(current_user["_id"]),
                "updated_at": datetime.utcnow(),
            },
        )

        await log_audit(
            current_user=current_user,
            action="APPROVE_BOOKING",
            module="Bookings",
            reference_id=booking_id,
            details={
                "asset_id": updated["asset_id"],
            },
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def reject(
        booking_id: str,
        reason: str,
        current_user,
    ):

        booking = await BookingRepository.get_by_id(
            booking_id
        )

        if booking is None:
            raise ValueError("Booking not found")

        updated = await BookingRepository.update(
            booking_id,
            {
                "status": "Rejected",
                "approved_by": str(current_user["_id"]),
                "rejection_reason": reason,
                "updated_at": datetime.utcnow(),
            },
        )

        await log_audit(
            current_user=current_user,
            action="REJECT_BOOKING",
            module="Bookings",
            reference_id=booking_id,
            details={
                "reason": reason,
            },
        )

        updated["id"] = str(updated["_id"])
        del updated["_id"]

        return updated

    @staticmethod
    async def delete(
        booking_id: str,
        current_user,
    ):

        booking = await BookingRepository.get_by_id(
            booking_id
        )

        if booking is None:
            raise ValueError("Booking not found")

        await BookingRepository.delete(
            booking_id
        )

        await log_audit(
            current_user=current_user,
            action="DELETE_BOOKING",
            module="Bookings",
            reference_id=booking_id,
            details={
                "asset_id": booking["asset_id"],
            },
        )

        return {
            "message": "Booking deleted successfully"
        }