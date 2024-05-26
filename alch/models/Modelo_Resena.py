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