from sqlalchemy import delete
from alch.alchemyClasses.producto import Producto
from alch.alchemyClasses import db
class ModeloProducto():
    def agregar(self, producto):
        db.session.add(producto)
        db.session.commit()
        return True
