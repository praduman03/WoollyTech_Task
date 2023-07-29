from fastapi import FastAPI
from .routes import user, auth
from .database import engine
from . import models
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

models.Base.metadata.create_all(engine)

app.include_router(user.route)
app.include_router(auth.route)

@app.get('/')
def Hello():
    return {"message":"hello to this server"}
