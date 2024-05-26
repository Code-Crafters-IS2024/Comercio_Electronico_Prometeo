from sqlalchemy import delete
from alch.alchemyClasses.resena import Resena
from alch.alchemyClasses import db

class ModeloResena():
    def agregar_resena(data):
        try:
            canBeReviewed = True
            idProd = data.get("id_producto")
            idComp = data.get("id_comprador")
            comentario = data.get("comentario")
            calificacion = data.get("calificacion")

            resena = Resena(idProd, idComp, comentario, calificacion)

            db.session.add(resena)
            db.session.commit()
        except Exception as e:
            print(e)
            return False
        return True
    
    def modificar_resena(data):
        try:
            idResena = data.get("id_resena")
            comentario = data.get("comentario")
            calificacion = data.get("calificacion")

            resena = Resena.query.get(idResena)
            resena.comentario = comentario
            resena.calificacion = calificacion

            db.session.commit()
        except Exception as e:
            print(e)
            return False
        return True
    """
    Obtiene todas las reseñas registradas para un producto

    Params
    ------
    id_producto : id del producto cuyas reseñas se consultan

    Returns
    -------
    data : query conteniendo las reseñas
    """
    def obtener_resenas_producto(id_producto):
        data = None
        try:
            data = Resena.query.filter_by(id_producto = id_producto)
        except Exception as e:
            print(e)
        return data