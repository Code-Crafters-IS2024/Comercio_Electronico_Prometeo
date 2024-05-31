from flask import Flask, redirect, render_template, url_for, request, flash, session, jsonify
from alch.models.Modelo_Producto import ModeloProducto
from alch.alchemyClasses.producto import Producto
from alch.alchemyClasses.resena import Resena
from alch.models.Modelo_Vendedor import ModeloVendedor
from alch.models.Modelo_Resena import ModeloResena
from alch.models.Modelo_Comprador import ModeloComprador
from alch.models.Modelo_Vendedor import ModeloVendedor
from alch.models.Modelo_Compra import ModeloCompra
from alch.models.Modelo_Encuentro import ModeloEncuentro

from controller.catalogue import catalogue
from authenticate import authenticate_user

from alch.alchemyClasses import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://usertianguis:Developer123!@localhost:3306/TianguisFC"

app.config['SECRET_KEY'] = 'dev'

db.init_app(app)

app.register_blueprint(catalogue)



@app.route('/')
def hello_world():
    return redirect(url_for('/api/login'))

@app.route('/api/login', methods=['GET','POST'])
def login():
    if session.get('user_id') != None and session.get('user_type') != None:
        return jsonify({
            "logged" : True,
            "user" : session['user_id'],
            "type" : session['user_type']
            })
    if request.method == 'GET':
        return jsonify({"logged" : False,
                "user" : None,
                "type" : None})

    name = request.form.get('username')
    passwd = request.form.get('password')
    typeOfUser = authenticate_user(name, passwd)
    if typeOfUser is not None:

        session['user_id'] = name #definición de cookie de sesión.
        session['user_type'] = typeOfUser
        return jsonify({
            "logged" : True,
            "user" : session['user_id'],
            "type" : session['user_type']
            })

    else:
        return jsonify({"logged" : False,
                "user" : None,
                "type" : None})

    

@app.route('/api/logout')
def logout():
    session['user_id'] = None
    return jsonify({"logged" : False,
                "user" : None})

@app.route('/api/add_product', methods=['POST'])
def add_product():
    if request.method == 'POST':
        data = request.form
        foto = request.files['foto'].read() if 'foto' in request.files else None
        id_vendedor = data.get('id_vendedor')
        if ModeloVendedor.obtener_vendedor(id_vendedor) == None:
            return jsonify({"message": "No existe el vendedor"}), 201
        ModeloProducto.agregar_producto(data, foto)
        return jsonify({"message": "Producto agregado con éxito"}), 201
    return jsonify({"message": "Producto no agregado con éxito"}), 201

    
"""
Obtiene la informacion simplificada de todos los productos
"""
@app.route("/api/view_prods")
def view_prods():
    data = Producto.query.all()
    dict = {}
    for d in data:
        prod_data = {}
        
        id_vendedor = d.id_vendedor
        vendedor = ModeloVendedor.obtener_vendedor(id_vendedor)

        prod_data["id_producto"] = d.id_producto
        prod_data["vendedor"] = vendedor.nombres
        prod_data["calificacion"] = ModeloProducto.calificacion_promedio(d.id_producto)
        prod_data["precio"] = d.costo
        prod_data["unidades"] = d.unidades

        dict[d.id_producto] = prod_data
    return jsonify({"message":"Productos consultados exitosamente", "data":dict}), 201

"""
API para obtener la informacion de un producto por ID. Incluye toda la informacion del producto y datos basicos del vendedor
"""
@app.route('/api/get_prod', methods=['GET'])
def get_prod():
    data = {}
    try:
        id_producto = request.args.get('id_producto')
        data_producto = ModeloProducto.consultar_producto(id_producto)

        id_vendedor = data_producto.id_vendedor
        data_vendedor = ModeloVendedor.obtener_vendedor(id_vendedor)

        dict_vendedor = {}
        dict_vendedor["id_vendedor"] = data_vendedor.id_vendedor
        dict_vendedor["nombres"] = data_vendedor.nombres
        dict_vendedor["apPat"] = data_vendedor.ap_pat
        dict_vendedor["apMat"] = data_vendedor.ap_mat

        data["vendedor"] = dict_vendedor

        dict_prod = {}
        dict_prod["descripcion"] = data_producto.descripcion
        dict_prod["costo"] = data_producto.costo
        dict_prod["unidades"] = data_producto.unidades
        dict_prod["calificacion"] = ModeloProducto.calificacion_promedio(id_producto)
        dict_prod["categoria"] = data_producto.categoria

        data["producto"] = dict_prod
    except Exception as e:
        print("Algo salio mal " + str(e))
        return jsonify({"message":str(e), "data" : data}), 404
    
    return jsonify({"message": "Datos de producto recuperados con exito", "data":data}), 201

"""
Borra un producto y todas las reseñas asociadas con el
"""
@app.route("/api/producto/eliminar", methods=['GET'])
def eliminar_producto():
    try:
        id_producto = request.args.get("id_producto")
        ModeloProducto.delete_product(id_producto)
    except Exception as e:
        print(e)
        return jsonify({"message": str(e)}), 401

    return jsonify({"message": "Reseña eliminada exitosamente"}), 201

"""
Obtiene las reseñas de un producto
"""
@app.route("/api/view_resenas_prod", methods=['GET'])
def view_resenas_prod():
    
    dict = {}

    try:
        id_producto = request.args.get('id_producto')
        data = ModeloResena.obtener_resenas_producto(id_producto)

        for d in data:
            res_data = {}
            
            id_comprador= d.id_comprador
            comprador = ModeloComprador.obtener_comprador(id_comprador)

            res_data["id_resena"] = d.id_resena
            res_data["id_producto"] = d.id_producto
            res_data["id_comprador"] = d.id_comprador
            res_data["nombres"] = comprador.nombres
            res_data["comentario"] = d.comentario
            res_data["calificacion"] = d.calificacion

            dict[d.id_resena] = res_data

    except Exception as e:
        print("Algo salio mal" + str(e))
        return jsonify({"message": str(e), "data":None}), 404
    
    return jsonify({"message":"Resenas consultados exitosamente", "data":dict}), 201

"""
API para registrar una nueva reseña
"""
@app.route("/api/resena/agregar", methods=['POST'])
def agregar_resena():
    try:
        id_producto = request.form.get('id_producto')
        id_comprador = session['user_id']
        calificacion = request.form.get('calificacion')
        comentario = request.form.get('comentario')

        resena = Resena(id_producto, id_comprador, comentario, calificacion)

        ModeloResena.agregar_resena(resena)

    except Exception as e:
        print(e)
        return jsonify({"message":str(e)}), 401
    
    return jsonify({"message" : "Producto agregado exitosamente"}), 201

"""
API para obtener la reseña que un usuario ha escrito para un producto dado
"""
@app.route("/api/resena/obtener_comprador_prod", methods=['GET'])
def obtener_resena_comprador_producto():
    data = None
    try:
        id_producto = request.args.get("id_producto")
        id_comprador = session["user_id"]

        resena = ModeloResena.obtener_resena_usuario_prod(id_comprador, id_producto)

        ##Si no hay reseñas para este producto, devolver nada exitosamente
        if resena is None:
            return jsonify({"message" : "No hay datos", "data":data}), 201        

        res = {}

        res["id_resena"] = resena.id_resena
        res["calificacion"] = resena.calificacion
        res["id_comprador"] = resena.id_comprador
        res["id_producto"] = resena.id_producto
        res["comentario"] = resena.comentario

        data = res
    except Exception as e:
        print(e)
        return jsonify({"message":str(e), "data":None}), 404
    return jsonify({"message" : "Reseña consultada exitosamente", "data":data}), 201

"""API para eliminar una reseña"""
@app.route("/api/resena/eliminar", methods=['GET'])
def eliminar_resena():
    try:
        id_resena = request.args.get("id_resena")
        ModeloResena.eliminar_resena(id_resena)
    except Exception as e:
        print(e)
        return jsonify({"message":str(e)}), 401
    
    return jsonify({"message" : "Reseña eliminada exitosamente"}), 201

"""API para modificar una reseña"""
@app.route("/api/resena/modificar", methods=['POST'])
def modificar_resena():
    try:
        id_producto = request.form.get('id_resena')
        calificacion = request.form.get('calificacion')
        comentario = request.form.get('comentario')

        ModeloResena.modificar_resena(id_producto, {"comentario" : comentario, "calificacion":calificacion})
    except Exception as e:
        print("Algo salio mal al modificar la reseña: " + str(e))
        return jsonify({"message":str(e)}), 401
    
    return jsonify({"message" : "Reseña modificada exitosamente"}), 201

@app.route('/api/update_product/<int:id>', methods=['POST'])
def update_product(id):
    data = request.form
    foto = request.files['foto'].read() if 'foto' in request.files else None
    if ModeloProducto.modificar_producto(id, data, foto):
        return jsonify({"message": "Producto actualizado con éxito"}), 201
    return jsonify({"message": "Error al actualizar el producto"}), 400

@app.route('/api/get_product/<int:id>', methods=['GET'])
def get_product(id):
    product = ModeloProducto.obtener_producto(id)
    if product:
        product_data = {
            'id': product.id_producto,
            'id_vendedor': product.id_vendedor,
            'descripcion': product.descripcion,
            'costo': product.costo,
            'categoria': product.categoria,
            'unidades': product.unidades,
            'foto': product.imagen.decode('latin1') if product.imagen else None
        }
        return jsonify(product_data), 200
    return jsonify({"message": "Producto no encontrado"}), 404

@app.route('/api/get_compras/<int:id_vendedor>', methods=['GET', 'POST'])
def get_compras(id_vendedor):
    #print("Obteniendo compras")
    compras = ModeloCompra.obtener_compras(id_vendedor)
    #print(compras)
    return jsonify([ModeloCompra.to_dict(compra) for compra in compras]), 200

@app.route('/api/get_compra/<int:id>', methods=['GET'])
def get_compra(id):
    print("GET COMPRA")
    compra = ModeloCompra.obtener_compra(id)
    if compra:
        return jsonify(ModeloCompra.to_dict(compra)), 200
    return jsonify({"message": "Compra no encontrada"}), 404

@app.route('/api/crear_encuentro', methods=['POST'])
def crear_encuentro():
    data = request.json
    print(data)
    if ModeloEncuentro.crear_encuentro(data):
        return jsonify({"message": "Encuentro creado con éxito"}), 201
    return jsonify({"message": "Error al crear el encuentro"}), 400

@app.route('/api/get_encuentros/<int:id>', methods=['GET'])
def get_encuentros(id):
    print("encuentros por id: ", id)
    encuentros = ModeloEncuentro.obtener_encuentros(id)
    return jsonify([ModeloEncuentro.to_dict(encuentro) for encuentro in encuentros]), 200

if __name__ == '__main__':
    app.run()
