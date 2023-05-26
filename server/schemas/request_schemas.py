from pydantic import BaseModel

class RequestBodyParams(BaseModel):
    user_query: str
    meta: str
 