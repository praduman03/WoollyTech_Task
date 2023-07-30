from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# specifying the data type and the data file name in the url
SQL_DATABASE_URL =  "sqlite:///./data.db"

# creating engine for the database to use it
engine = create_engine(SQL_DATABASE_URL, connect_args={"check_same_thread":False})

# creating a Session for the database whenever the database is required
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# creating base for the models to be set in databse
Base = declarative_base()

# function to run the session and close it whenever the changes is done
def getData():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()