from sqlalchemy import delete
from alch.alchemyClasses.resena import Resena
from alch.alchemyClasses import db
from sqlalchemy import and_

class ModeloResena():
    """
    Agrega una reseña a los registros

    Params
    ------
    data : datos del nuevo registro

    Returns
    -------
    bool : Indica si la operacion fue exitosa o no
    """
    def agregar_resena(data):
        try:
            db.session.add(data)
            db.session.commit()
        except Exception as e:
            print("Algo salio mal al agregar esta reseña" + str(e))
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
            print("Algo salio mal al obtener los registros de reseñas para este producto: " + str(e))
        return data
    
    """
    Obtiene la reseña que un usuario ha escrito para un producto dado

    Params
    ------
    id_resena : id del comprador
    id_producto : id del producto

    Returns
    -------
    data : reseña del comprador para el producto
    """
    def obtener_resena_usuario_prod(id_comprador, id_producto):
        data = None
        try:
            data = Resena.query.filter(and_(Resena.id_producto == id_producto, Resena.id_comprador == id_comprador)).first()
        except Exception as e:
            print("Algo salio mal al obtener las reseñas del usuario para este producto: " + str(e))
        return data

    """
    Elimina una reseña
    
    Params
    ------
    id_resena : id de resena a eliminar

    Returns
    -------
    bool : Indica si la operacion fue exitosa o no
    """   
    def eliminar_resena(id_resena):
        resena = Resena.query.get(id_resena)
        try:
            db.session.delete(resena)
            db.session.commit()
        except Exception as e:
            print("Algo salio mal al eliminar el registro de reseña: " + str(e))
            return False
        return True
    """
    Modifica un registro de reseña

    Params
    ------
    id_resena : id de resena a modificar

    Returns
    -------
    bool : Indica si la operacion fue exitosa o no
    """
    def modificar_resena(id_resena, data):
        resena = Resena.query.get(id_resena)
        try:
            resena.comentario = data.get("comentario")
            resena.calificacion = data.get("calificacion")

            db.session.commit()
        except Exception as e:
            print("Algo salio mal al modificar el registro de reseña: " + str(e))
            return False
        return True
        