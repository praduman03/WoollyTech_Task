from sqlalchemy import String, Integer, Column
from .database import Base

# model for the database to store the user
class User(Base):
    __tablename__="Users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)