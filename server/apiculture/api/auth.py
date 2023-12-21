from datetime import datetime, timedelta
from typing import List, Tuple

from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from jose import ExpiredSignatureError, JWTError, jwt
from passlib.context import CryptContext

from apiculture.api.schemas import TokenDataSchema
from apiculture.config import settings
from apiculture.dal.command import create_user
from apiculture.dal.query import get_user_by_email
from apiculture.database import get_db
from apiculture.models import User

ALGORITHM = "HS256"


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user(username: str):
    # TODO: implement caching mechanism
    db = next(get_db())
    return get_user_by_email(db, username)


def verify_password(plain_password, hashed_password):
    """
    Compare plain password against a hashed password.

    :param plain_password:
    :param hashed_password:
    :return:
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    """
    Hash the password.

    :param password:
    :return:
    """
    return pwd_context.hash(password)


def authenticate_user(username: str, password: str):
    """
    Verify user's username (email) and password to log him in.

    :param username: the email actually
    :param password:
    :return:
    """
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def register_user(user_data):
    # send verification email
    user_data.password = get_password_hash(user_data.password)
    return create_user(get_db(), user_data)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """
    Create an access token to return to successfully logged user.

    :param data:
    :param expires_delta:
    :return: encoded JWT
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def handle_auth_error(request, auth_error):
    """
    Handle any error that occurred during verifying user access token.

    :param request:
    :param auth_error: starlette.AuthenticationError that occurred
    :return:
    """
    return JSONResponse(
        {"error": "Token expired or invalid"}, status_code=status.HTTP_401_UNAUTHORIZED
    )


def verify_authorization_header(headers) -> Tuple[List[str], User]:
    """
    Verify that the token in Authorization header is valid.
    Used by AuthMiddleware.

    :param headers: http connection headers
    :return: scopes and user object
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Extract token from header
        scheme, _, token = headers["authorization"].partition(" ")
        if scheme.lower() != "bearer":
            raise credentials_exception

        # Decode token to get username
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenDataSchema(username=username)
    except JWTError:
        raise credentials_exception

    # Try getting user from database (or cache)
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception

    scopes = []
    return scopes, user
