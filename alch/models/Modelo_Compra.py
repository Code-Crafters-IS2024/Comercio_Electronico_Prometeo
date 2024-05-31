from alch.alchemyClasses.compra import Compra
from alch.alchemyClasses import db

class ModeloCompra():
    def agregar_compra(data):
        id_producto = data.get('id_producto')
        id_vendedor = data.get('id_vendedor')
        id_comprador = data.get('id_comprador')
        total = data.get('total')
        fecha = data.get('fecha')

        compra = Compra(id_producto, id_vendedor, id_comprador, total, fecha)
        db.session.add(compra)
        db.session.commit()
        return True
    def obtener_compra(id_compra):
        data = Compra.query.filter_by(id_compra=id_compra).first()
        return data
    def obtener_compras(id_vendedor):
        data = Compra.query.filter_by(id_vendedor=id_vendedor)
        return data
    def to_dict(compra):
        compra_data = {
            'id_compra': compra.id_compra,
            'id_vendedor': compra.id_vendedor,
            'id_comprador': compra.id_comprador,
            'id_producto': compra.id_producto,
            'total': compra.total,
            'fecha': compra.fecha,
        }
        return compra_data
