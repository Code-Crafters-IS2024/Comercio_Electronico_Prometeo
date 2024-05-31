from sqlalchemy import Column, Date, Integer, DECIMAL
from alch.alchemyClasses import db
class Compra(db.Model):
    __tablename__ = 'compra'
    id_compra = Column(Integer, primary_key=True, autoincrement=True)
    id_producto = Column(Integer, nullable=False)
    id_vendedor = Column(Integer, nullable=False)
    id_comprador = Column(Integer, nullable=False)
    total = Column(DECIMAL, nullable=False)
    fecha = Column(Date, nullable=False)
    
    def __init__(self, id_producto, id_vendedor, id_comprador, total, fecha):
        self.id_producto = id_producto
        self.id_vendedor = id_vendedor
        self.id_comprador = id_comprador
        self.total = total
        self.fecha = fecha
