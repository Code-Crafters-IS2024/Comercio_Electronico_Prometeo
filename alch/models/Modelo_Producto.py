from sqlalchemy import delete
from alch.alchemyClasses.producto import Producto
from alch.alchemyClasses import db
class ModeloProducto():
    def agregar(data, foto):
        id_vendedor=data.get('id_vendedor')
        descripcion=data.get('descripcion')
        costo=data.get('costo')
        categoria=data.get('categoria')
        unidades=data.get('unidades')
        producto = Producto(id_vendedor, descripcion, costo, categoria, unidades, foto)
        db.session.add(producto)
        db.session.commit()
        return True
