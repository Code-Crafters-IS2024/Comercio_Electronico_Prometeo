from alch.alchemyClasses import db
from alch.models.Modelo_Vendedor import ModeloVendedor
from alch.models.Modelo_Comprador import ModeloComprador
from sqlalchemy.orm.exc import NoResultFound
import bcrypt
import sys

def authenticate_user(username, password):
    try:
        user = ModeloVendedor.obtener_vendedor(username)
        
        #if user != None and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        if user is not None and password == user.password:
            return "vendedor"
        
        user = ModeloComprador.obtener_comprador(username)
        if user is not None and password == user.password:
            return "comprador"
        
        return None

    except NoResultFound:
        return None


def authenticate_buyer(username, password):
    try:
        user = ModeloComprador.obtener_comprador(username)

        # if user != None and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        if user is not None and password == user.password:
            return True

    except NoResultFound:
        return False
    
    return False


def authenticate_seller(username, password):
    try:
        user = ModeloVendedor.obtener_vendedor_cuenta(username)

        # if user != None and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        if user is not None and password == user.password:
            return True

    except NoResultFound:
        return False
    
    return False
