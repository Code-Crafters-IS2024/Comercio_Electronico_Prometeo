from flask import Flask, redirect, render_template, url_for, request, flash, session, jsonify
from alch.models.Modelo_Producto import ModeloProducto
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
        id_vendedor = data.get('id_vendedor')
        if ModeloVendedor.obtener_vendedor(id_vendedor) == None:
            return jsonify({"message": "No existe el vendedor"}), 201
        ModeloProducto.agregar_producto(data, foto)
        return jsonify({"message": "Producto agregado con éxito"}), 201
    return jsonify({"message": "Producto no agregado con éxito"}), 201

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
