from sqlalchemy import delete
from alch.alchemyClasses.producto import Producto
from alch.models.Modelo_Resena import ModeloResena
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
            
        