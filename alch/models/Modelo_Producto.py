from sqlalchemy import delete
from alch.alchemyClasses.producto import Producto
from alch.alchemyClasses import db
class ModeloProducto():
    def agregar_producto(data, foto):
        id_vendedor=data.get('id_vendedor')
        descripcion=data.get('descripcion')
        costo=data.get('costo')
        categoria=data.get('categoria')
        unidades=data.get('unidades')
        producto = Producto(id_vendedor, descripcion, costo, categoria, unidades, foto)
        db.session.add(producto)
        db.session.commit()
        return True
    def modificar_producto(id_producto, data, foto):
        id_vendedor=data.get('id_vendedor')
        descripcion=data.get('descripcion')
        costo=data.get('costo')
        categoria=data.get('categoria')
        unidades=data.get('unidades')
        
        producto = Producto.query.get(id_producto)
        if not producto:
            return False
        
        producto.id_vendedor = id_vendedor
        producto.descripcion = descripcion
        producto.costo = costo
        producto.categoria = categoria
        producto.unidades = unidades
        if foto:
            producto.foto = foto
        db.session.commit()
        return True
    def eliminar_producto(id_producto):
        producto = Producto.query.get(id_producto)
        db.session.delete(producto)
        db.session.commit()
        return True
    def obtener_producto(id_producto):
        data = Producto.query.filter_by(id_producto=id_producto).first()
        return data
    
