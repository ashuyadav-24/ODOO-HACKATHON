from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Audit(BaseModel):
    user_id: str

    action: str

    module: str

    reference_id: Optional[str] = None

    details: dict = {}

    timestamp: datetime = datetime.utcnow()