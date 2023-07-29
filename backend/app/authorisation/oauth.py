from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from . import token

oauth2_data = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(data: str = Depends(oauth2_data)):

    # Raising error If the token is validated
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not Authenticated, Sorry",
        headers={"WWW-Authenticate": "Bearer"}
    )

    #verifying the token
    return token.verify_token(data, credentials_exception)

