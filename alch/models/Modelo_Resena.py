from sqlalchemy import delete
from alch.alchemyClasses.resena import Resena
from alch.alchemyClasses import db
from sqlalchemy import and_

class ModeloResena():
    """
    Agrega una reseña a los registros
    """
    def agregar_resena(data):
        try:
            db.session.add(data)
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
    
    """
    Obtiene la reseña que un usuario ha escrito para un producto dado
    """
    def obtener_resena_usuario_prod(id_comprador, id_producto):
        data = None
        try:
            data = Resena.query.filter(and_(Resena.id_producto == id_producto, Resena.id_comprador == id_comprador)).first()
        except Exception as e:
            print(e)
        return data
        