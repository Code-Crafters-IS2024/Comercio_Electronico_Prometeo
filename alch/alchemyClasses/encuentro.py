from sqlalchemy import Column, Date, Integer, DECIMAL, String, Time
from alch.alchemyClasses import db
class Encuentro(db.Model):
    __tablename__ = 'encuentro'
    id_encuentro = Column(Integer, primary_key=True, autoincrement=True)
    id_vendedor = Column(Integer)
    id_comprador = Column(Integer)
    id_compra = Column(Integer)
    fecha = Column(Date, nullable=False)
    lugar = Column(String(60), nullable=False)
    hora = Column(Time, nullable=False)
    def __init__(self, id_vendedor, id_comprador, id_compra, fecha, lugar, hora):
        self.id_vendedor = id_vendedor
        self.id_comprador = id_comprador
        self.id_compra = id_compra
        self.fecha = fecha
        self.lugar = lugar
        self.hora = hora
