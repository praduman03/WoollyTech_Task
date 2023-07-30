from fastapi import FastAPI
from .routes import user, auth
from .database import engine
from . import models
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

#for loading env in the server
load_dotenv()

app = FastAPI()

#for creating cors for the frontend
origins = {"*"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# for initiating models in the database
models.Base.metadata.create_all(engine)

# importing api from other route files
app.include_router(user.route)
app.include_router(auth.route)

@app.get('/')
def Hello():
    return {"message":"hello to this server"}
