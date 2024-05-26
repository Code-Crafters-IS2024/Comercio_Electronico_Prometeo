from sqlalchemy import delete
from alch.alchemyClasses.producto import Producto
from alch.alchemyClasses import db

class ModeloProducto():
    def agregar(self, producto):
        db.session.add(producto)
        db.session.commit()
        return True
    
    def consultar_producto(id_producto):
        data = None
        try:
            data = Producto.query.filter_by(id_producto = id_producto).first()
        except Exception as e:
            print(e)
        return data
