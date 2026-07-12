from app.database.mongodb import get_database


async def generate_asset_tag():

    db = get_database()

    total = await db.assets.count_documents({})

    number = total + 1

    return f"AF-{number:04d}"