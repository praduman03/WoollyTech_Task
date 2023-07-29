from fastapi import APIRouter, Depends, status, HTTPException
from .. import models, schemas, database
from ..authorisation import oauth
from ..hashing import Hash
from sqlalchemy.orm import Session

route = APIRouter(
    prefix="/user",
    tags={"User"}
)

@route.get("/signin")
def GetUser(current_user:schemas.User = Depends(oauth.get_current_user)):
    return {"message":"Hello to the user API"}

@route.post("/", response_model = schemas.ShowUser, status_code = status.HTTP_201_CREATED)
def NewUser(request: schemas.User, db: Session = Depends(database.getData)):
    # to check if username or email already exist in the data
    user_username = db.query(models.User).filter(models.User.name==request.name).first()
    if user_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already in use")
    user_email = db.query(models.User).filter(models.User.email==request.email).first()
    if user_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already in use")
    
    #hashing the password
    hashed_password = Hash.bcrypt(request.password)

    #creating the user
    new_user = models.User(name = request.name, email = request.email, password = hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user