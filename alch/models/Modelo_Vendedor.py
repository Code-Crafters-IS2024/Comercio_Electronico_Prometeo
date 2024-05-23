from sqlalchemy import delete
from alch.alchemyClasses.vendedor import Vendedor
from alch.alchemyClasses import db

class ModeloVendedor():
    def agregar_vendedor(data):
        cuenta = data.get("numero_cuenta")
        nombre = data.get("nombres")
        apPat = data.get("ap_pat")
        apMat = data.get("ap_mat")
        telefono = data.get("num_telefono")
        email = data.get("correo")
        genero = data.get("genero")
        profile_picture = data.get("foto")
        password = data.get("password")

        vendedor = Vendedor(cuenta, nombre, apPat, apMat, telefono, email, genero, profile_picture, password)
        db.session.add(vendedor)
        db.session.commit()
        return True
    def agregar_vendedor2(cuenta, nombre, apPat, apMat, telefono, email, genero, profile_picture, password):
        vendedor = Vendedor(cuenta, nombre, apPat, apMat, telefono, email, genero, profile_picture, password)
        db.session.add(vendedor)
        db.session.commit()
        return True

    def modificar_vendedor(data, id_vendedor):
        cuenta = data.get("numero_cuenta")
        nombre = data.get("nombres")
        apPat = data.get("ap_pat")
        apMat = data.get("ap_mat")
        telefono = data.get("num_telefono")
        email = data.get("correo")
        genero = data.get("genero")
        profile_picture = data.get("foto")
        password = data.get("password")

        vendedor = Vendedor.query.get(id_vendedor)
        vendedor.numero_cuenta = cuenta
        vendedor.nombres = nombre
        vendedor.ap_pat = apPat
        vendedor.ap_mat = apMat
        vendedor.num_telefono = telefono
        vendedor.correo = email
        vendedor.genero = genero
        vendedor.foto = profile_picture
        vendedor.password = password

        db.session.commit()
        return True

    def eliminar_vendedor(id_vendedor):
        vendedor = Vendedor.query.get(id_vendedor)
        db.session.delete(vendedor)
        db.session.commit()
        return True

    def obtener_vendedor(id_vendedor):
        data = Vendedor.query.filter_by(numero_cuenta=id_vendedor).first()
        return data

    def obtener_vendedores():
        try:
            data = Vendedor.query.all()
            return data
        except Exception as e:
            print("Error:", str(e))
        return []
