from sqlalchemy import Boolean, Column, Integer, LargeBinary, String
from alch.alchemyClasses import db

class Vendedor(db.Model):
    __tablename__ = 'vendedor'
    id_vendedor = Column(String(50),nullable=False)
    numero_cuenta = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    nombres = Column(String(50), nullable=False)
    ap_pat = Column(String(50), nullable=False)#Not null
    ap_mat = Column(String(20), nullable=False)
    password = Column(String(255), nullable=False)#Not null
    correo = Column(String(255), unique=True, default=None)#Null
    foto = Column(LargeBinary)#Longblob
    num_telefono = Column(String(20), nullable=False)
    genero = Column(String(15), nullable=False)

    def __init__(self, cuenta, nombre, apPat, apMat, telefono, email, genero, profile_picture, password):
        self.numero_cuenta = cuenta
        self.nombres = nombre
        self.ap_pat = apPat
        self.ap_mat = apMat
        self.num_telefono = telefono
        self.correo = email
        self.genero = genero
        self.foto = profile_picture
        self.password = password

    def __str__(self):
        return f'Nombre:{self.nombres} {self.ap_pat}\nNum. de Cuenta:{self.id_vendedor}'