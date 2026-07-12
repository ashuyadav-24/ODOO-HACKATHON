from motor.motor_asyncio import AsyncIOMotorClient
import certifi

from app.core.config import settings

client = AsyncIOMotorClient(
    settings.MONGODB_URL,
    tlsCAFile=certifi.where(),
)

db = client[settings.DATABASE_NAME]


def get_database():
    return db