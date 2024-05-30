from flask import Flask, redirect, render_template, url_for, request, flash, session, jsonify
from alch.models.Modelo_Producto import ModeloProducto
from alch.alchemyClasses.producto import Producto
from alch.models.Modelo_Vendedor import ModeloVendedor
from alch.models.Modelo_Resena import ModeloResena
from alch.models.Modelo_Comprador import ModeloComprador
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
    if session.get('user_id') != None:
        return jsonify({
            "logged" : True,
            "user" : session['user_id']
            })
    if request.method == 'GET':
        return jsonify({"logged" : False,
                "user" : None})

    name = request.form.get('username')
    passwd = request.form.get('password')
    if authenticate_user(name, passwd):

        session['user_id'] = name #definición de cookie de sesión.
        return jsonify({
            "logged" : True,
            "user" : session['user_id']
            })

    else:
        return jsonify({"logged" : False,
                "user" : None})

    

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

        new_product = Producto(
            id_vendedor=data.get('id_vendedor'),
            descripcion=data.get('descripcion'),
            costo=data.get('costo'),
            categoria=data.get('categoria'),
            #foto=foto,
            unidades=data.get('unidades')
        )

        ModeloProducto.agregar(new_product)
        return jsonify({"message": "Producto agregado con éxito", "product": new_product.id_producto}), 201
    
@app.route("/api/view_prods")
def view_prods():
    data = Producto.query.all()
    dict = {}
    for d in data:
        prod_data = {}
        
        id_vendedor = d.id_vendedor
        vendedor = ModeloVendedor.obtener_vendedor(id_vendedor)

        prod_data["vendedor"] = vendedor.nombres
        prod_data["calificacion"] = ModeloProducto.calificacion_promedio(d.id_producto)
        prod_data["precio"] = d.costo
        prod_data["unidades"] = d.unidades

        dict[d.id_producto] = prod_data
    return jsonify({"message":"Productos consultados exitosamente", "data":dict}), 201

@app.route('/api/get_prod', methods=['GET'])
def get_prod():
    data = {}
    try:
        id_producto = request.form.get("id_producto")
        data_producto = ModeloProducto.consultar_producto(id_producto)
        resenas_producto = ModeloResena.obtener_resenas_producto(id_producto)

        id_vendedor = data_producto["id_vendedor"]
        data_vendedor = ModeloVendedor.obtener_vendedor(id_vendedor)

        dict_vendedor = {}
        dict_vendedor["nombres"] = data_vendedor.nombres
        dict_vendedor["apPat"] = data_vendedor.apPat
        dict_vendedor["apMat"] = data_vendedor.apMat

        data["vendedor"] = dict_vendedor

        dict_prod = {}
        dict_prod["descripcion"] = data_producto.descripcion
        dict_prod["costo"] = data_producto.costo
        dict_prod["unidades"] = data_producto.unidades
        dict_prod["calificacion"] = ModeloProducto.calificacion_promedio(id_producto)
        dict_prod["categoria"] = data_producto.categoria

        data["producto"] = dict_prod
    except Exception as e:
        print("Algo salio mal")
        return jsonify({"message":str(e), "data" : data}), 404
    
    return jsonify({"message": "Datos de producto recuperados con exito", "data":data}), 201

if __name__ == '__main__':
    app.run()
