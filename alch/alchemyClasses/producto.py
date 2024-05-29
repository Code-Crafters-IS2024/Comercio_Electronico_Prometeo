from sqlalchemy import Column, Float, Integer, LargeBinary, String
from alch.alchemyClasses import db
class Producto(db.Model):
    __tablename__ = 'producto'
    id_producto = Column(Integer,nullable=False, autoincrement=True, primary_key=True)
    id_vendedor = Column(Integer)
    descripcion = Column(String(300), nullable=False)#Not null
    costo = Column(Float, nullable=False)
    categoria = Column(String(100), nullable=False)
    imagen = Column(LargeBinary, nullable=True)#Longblob
    unidades = Column(Integer, nullable=False)

    def __init__(self, id_vendedor, descripcion, costo, categoria, unidades, foto):
        self.id_vendedor = id_vendedor
        self.descripcion = descripcion
        self.costo = costo
        self.categoria = categoria
        self.imagen = foto
        self.unidades = unidades
        
    def __str__(self):
        return f'Nombre:{self.id_producto} {self.descripcion}\n'
