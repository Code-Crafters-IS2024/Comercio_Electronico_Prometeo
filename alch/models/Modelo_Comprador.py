from sqlalchemy import delete
from alch.alchemyClasses.comprador import Comprador
from alch.alchemyClasses import db

class ModeloComprador():
    def agregar_comprador(data):
        cuenta = data.get("numero_cuenta")
        nombre = data.get("nombres")
        apPat = data.get("ap_pat")
        apMat = data.get("ap_mat")
        telefono = data.get("num_telefono")
        email = data.get("correo")
        genero = data.get("genero")
        profile_picture = data.get("foto")
        password = data.get("password")

        comprador = Comprador(cuenta, nombre, apPat, apMat, telefono, email, genero, profile_picture, password)
        db.session.add(comprador)
        db.session.commit()
        return True
    def agregar_comprador2(cuenta, nombre, apPat, apMat, telefono, email, genero, profile_picture, password):
        comprador = Comprador(cuenta, nombre, apPat, apMat, telefono, email, genero, profile_picture, password)
        db.session.add(comprador)
        db.session.commit()
        return True

    def modificar_comprador(data, id_comprador):
        cuenta = data.get("numero_cuenta")
        nombre = data.get("nombres")
        apPat = data.get("ap_pat")
        apMat = data.get("ap_mat")
        telefono = data.get("num_telefono")
        email = data.get("correo")
        genero = data.get("genero")
        profile_picture = data.get("foto")
        password = data.get("password")

        comprador = Comprador.query.get(id_comprador)
        comprador.numero_cuenta = cuenta
        comprador.nombres = nombre
        comprador.ap_pat = apPat
        comprador.ap_mat = apMat
        comprador.num_telefono = telefono
        comprador.correo = email
        comprador.genero = genero
        comprador.foto = profile_picture
        comprador.password = password

        db.session.commit()
        return True

    def eliminar_comprador(id_comprador):
        comprador = Comprador.query.get(id_comprador)
        db.session.delete(comprador)
        db.session.commit()
        return True

    def obtener_comprador(id_comprador):
        data = Comprador.query.filter_by(numero_cuenta=id_comprador).first()
        return data

    def obtener_compradores():
        try:
            data = Comprador.query.all()
            return data
        except Exception as e:
            print("Error:", str(e))
        return []
