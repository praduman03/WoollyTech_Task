from pydantic import BaseModel
from typing import Optional

# schema for creating user
class User(BaseModel):
    name:str
    email:str
    password:str

# schema to return user 
class ShowUser(BaseModel):
    id:int
    name:str
    email:str

# schema to fetch user data using user id 
class UserId(BaseModel):
    id: int

# schema for login 
class Login(BaseModel):
    email:str
    password:str

# schema to send token 
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None

