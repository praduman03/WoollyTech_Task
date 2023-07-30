from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from .. import schemas, database, models
from ..authorisation import token
from ..hashing import Hash
from sqlalchemy.orm import Session

route = APIRouter(
    tags=["Authentication"]
)

# API to authenticate users
@route.post('/login', status_code = status.HTTP_201_CREATED)
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.getData)):

    # returning invalid credentials after not getting email or password
    user = db.query(models.User).filter(models.User.email==request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")

    #generate a jwt token and return it to the user

    access_token = token.create_token(
        data = {"sub": user.email}
    )

    return {"access_token": access_token, "token_type": "bearer", "user":{"email":user.email,"name":user.name,"id":user.id}}
