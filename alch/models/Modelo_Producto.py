from sqlalchemy import delete
from alch.alchemyClasses.producto import Producto
from alch.models.Modelo_Resena import ModeloResena
from alch.alchemyClasses.resena import Resena
from alch.alchemyClasses import db

class ModeloProducto():
    def agregar_producto(data, foto, id):
        id_vendedor=id
        nombre=data.get('nombre')
        descripcion=data.get('descripcion')
        costo=data.get('costo')
        categoria=data.get('categoria')
        unidades=data.get('unidades')
        producto = Producto(id_vendedor, nombre, descripcion, costo, categoria, unidades, foto)
        db.session.add(producto)
        db.session.commit()
        return True
    
    def consultar_producto(id_producto):
        data = None
        try:
            data = Producto.query.filter_by(id_producto = id_producto).first()
        except Exception as e:
            print("No se encontro el producto" + str(e))
        return data

    def query_all():
        data = None
        try:
            data = Producto.query.all()
            print("Success")
        except Exception as e:
            print(e)
        return data

    def delete_product(id_producto):
        # Primero tenemos que borrar todas las reseñas en donde esta asociado el producto
        resenas_asociadas = Resena.query.filter_by(id_producto=id_producto).all()
        try:
            for resena in resenas_asociadas:
                db.session.delete(resena)
                db.session.commit()
            # Una vez hacemos eso podemos borrar el producto
            producto = Producto.query.get(id_producto)
            db.session.delete(producto)
            db.session.commit()
        except Exception as e:
            print("Algo salió mal al eliminar el registro del producto: " + str(e))
            return False
        return True

    
    """
    Dado un id de producto, calcula la calificacion promedio del producto basado en todas las reseñas posibles para esta

    Params
    ------
    id_producto : id del producto

    Returns
    -------
    calificacion : calificacion promedio
    """
    def calificacion_promedio(id_producto):
        calificacion = 0
        try:
            resenas = ModeloResena.obtener_resenas_producto(id_producto)
            total = 0
            if resenas != None:
                for r in resenas:
                    total += 1
                    calificacion += r.calificacion
            if total != 0:
                calificacion /= total
        except Exception as e:
            print(e)
        return calificacion
            
        
    def modificar_producto(id_producto, data, foto):
        producto = Producto.query.get(id_producto)
        if not producto:
            return False
        producto.id_vendedor=data.get('id_vendedor')
        producto.nombre=data.get('nombre')
        producto.descripcion=data.get('descripcion')
        producto.costo=data.get('costo')
        producto.categoria=data.get('categoria')
        producto.unidades=data.get('unidades')
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
    
    """Obtener la lista de los productos que un vendedor vende"""
    def productos_vendedor(id_vendedor):
        data = None
        try:
            data = Producto.query.filter_by(id_vendedor=id_vendedor).all()
        except Exception as e:
            print(e)
        return data
    
    def restar_unidades(id_producto, total):
        producto = Producto.query.get(id_producto)

        if(producto.unidades < int(total)):
            return False
        
        producto.unidades -= int(total)
        db.session.commit()

        return True
        
    
