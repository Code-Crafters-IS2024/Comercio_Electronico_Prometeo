from alch.alchemyClasses import db
from alch.models.Modelo_Vendedor import ModeloVendedor
from sqlalchemy.orm.exc import NoResultFound
import bcrypt
import sys

def authenticate_user(username, password):
    try:
        user = ModeloVendedor.obtener_vendedor(username)
        
        if user is not None and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return True
        else:
            return False
    except NoResultFound:
        return False
