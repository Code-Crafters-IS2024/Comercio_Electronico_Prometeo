from flask import Flask, redirect, render_template, url_for, request, flash, session, jsonify
from alch.models.Modelo_Producto import ModeloProducto
from alch.alchemyClasses.producto import Producto
from alch.models.Modelo_Vendedor import ModeloVendedor
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
    return jsonify({"meddage":"Productos consultados exitosamente", "data":dict}), 201

if __name__ == '__main__':
    app.run()
