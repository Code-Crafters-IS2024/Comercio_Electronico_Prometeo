from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.mysql import TINYINT
from alch.alchemyClasses import db
class Resena(db.Model):
    __tablename__ = 'resena'
    id_resena = Column(Integer,nullable=False, autoincrement=True, primary_key=True)
    id_producto = Column(Integer)
    id_comprador = Column(Integer)
    comentario = Column(String(300), nullable=False)#Not null
    calificacion = Column(TINYINT, nullable=False)
    
    def __init__(self, id_producto, id_comprador, comentario, calificacion):
        self.id_producto = id_producto
        self.id_comprador = id_comprador
        self.comentario = comentario
        self.calificacion = calificacion
    def __str__(self):
        return f'Producto:{self.id_producto} {self.calificacion}\n'