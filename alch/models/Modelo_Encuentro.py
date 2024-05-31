from alch.alchemyClasses.encuentro import Encuentro
from alch.alchemyClasses import db
from alch.models.Modelo_Comprador import ModeloComprador
from alch.models.Modelo_Vendedor import ModeloVendedor

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
    def obtener_encuentros(id, user_type):
        try:
            if user_type == "vendedor":
                vendedor = ModeloVendedor.obtener_vendedor(id)
                data = Encuentro.query.filter_by(id_vendedor=vendedor.id_vendedor).all()
                return data
            else:
                    
                comprador = ModeloComprador.obtener_comprador(id)
                data = Encuentro.query.filter_by(id_comprador=comprador.id_comprador).all()
                return data
        
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
