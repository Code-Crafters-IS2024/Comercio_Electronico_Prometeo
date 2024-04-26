from flask import Flask, redirect, render_template, url_for, request, flash, session, jsonify

from controller.catalogue import catalogue
from classes.Usuario import obtenerUsuario
from authenticate import authenticate_user

from alchemyClasses import db

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://usertianguis:Developer123!@localhost:3306/TianguisFC"


app = Flask(__name__)
app.register_blueprint(catalogue)
app.config['SECRET_KEY'] = 'dev'

db.init_app(app)


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
    return jsonify({'message': 'Saliste de la sesion'}), 200
>>>>>>> bcfbfab (Login)


if __name__ == '__main__':
    app.run()
