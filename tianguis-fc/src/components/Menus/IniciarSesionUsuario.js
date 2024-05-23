import React, { useState} from "react";
import './IniciarSesionUsuario.css';
import Card from "../UI/Card";
import FiltroVistasUsuario from "./FiltroVistasUsuario";
import { Navigate } from "react-router";
import LoginStatus from "../Utils/FetchLogIn";

const IniciarSesionUsuario = (props) => {

    let logStatus = LoginStatus();

    if(logStatus == null)
    {
        return null
    }
    //Si el usuario esta logeado, redirigir al inicio
    if(logStatus != null && logStatus.logged)
    {
        return <Navigate to="/"/>
    }

    //Hacer fetch al back end para determinar si los datos son correctos
    async function sendFormData(formData) {
        await fetch('/api/login', {
          method: 'POST',
          body: formData
        })
        .then((response) => response.json())
      }

    //Submit
    async function submitHandler(event){
        event.preventDefault();
        const form = event.target;

        const username = form.username.value;
        const password = form.password.value;

        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        await sendFormData(formData);
        //Ir a home
        window.location.href = "/"
    };

    return(
        <div className="sign-in-section">
            <h2>Iniciar Sesión</h2>
            ¿Ya tienes sesión?
            ¿Qué tipo de usuario eres?<br></br>
            <Card>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Número de cuenta:</label>
                        <input 
                        type="text"
                        required
                        name="username"
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                        type="password"
                        required
                        name="password"
                        />
                    </div>
                    <div>
                        <button type="submit">Iniciar Sesión</button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default IniciarSesionUsuario;