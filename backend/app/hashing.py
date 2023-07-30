from passlib.context import CryptContext

#creating password context using bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Hash():
    # hashing password using bcrypt
    @staticmethod
    def bcrypt(password:str):
        return pwd_context.hash(password)

    # decoding and verifying the given password with the hashed one
    @staticmethod
    def verify(hashed_password, plain_password):
        return pwd_context.verify(plain_password,hashed_password)