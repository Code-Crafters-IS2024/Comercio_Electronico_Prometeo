from alch.alchemyClasses.encuentro import Encuentro
from alch.alchemyClasses import db

class ModeloEncuentro():
    def crear_encuentro(data):
        id_vendedor = data.get('id_vendedor')
        id_comprador = data.get('id_comprador')
        id_compra = data.get('id_compra')
        fecha = data.get('fecha')
        lugar = data.get('lugar')
        hora = data.get('hora')
        encuentro = Encuentro(id_vendedor, id_comprador, id_compra, fecha, lugar, hora)
        db.session.add(encuentro)
        db.session.commit()
        return True
    def obtener_encuentros(id):
        try:
            data1 = Encuentro.query.filter_by(id_vendedor=id).all()
            data2 = Encuentro.query.filter_by(id_comprador=id).all()
            return data1 + data2
        except Exception as e:
            print("Error:", str(e))
        return []
    def to_dict(encuentro):
        encuentro_data = {
            'id_encuentro': encuentro.id_encuentro,
            'id_vendedor': encuentro.id_vendedor,
            'id_comprador': encuentro.id_comprador,
            'id_compra': encuentro.id_compra,
            'fecha': encuentro.fecha,
            'lugar': encuentro.lugar,
            'hora': encuentro.hora.strftime("%H:%M:%S")
        }
        return encuentro_data
