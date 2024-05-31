import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';

import Card from "./components/UI/Card";
import Main from "./components/Menus/Main"

import { Navigate } from "react-router";
import { Link } from 'react-router-dom';
import LoginStatus from './components/Utils/FetchLogIn';

const App = () => {

    let logStatus = LoginStatus();

    if(logStatus == null)
    {
	return null
    }
    return (
	<div className="App">
	    <h1>Tianguis Facultad de Ciencias</h1>
	    {logStatus.logged &&
	     <div className='nav-bar'>
		 <a href="/home" className='nav-button'>Inicio</a>
		 {logStatus.type === "vendedor" && 
		  <>
		      <a href="/AgregarProducto" className='nav-button'>Agregar Producto</a>
		      <Link to={`/compras/${logStatus.user}`} className='nav-button'>Listar Compras</Link>
		  </>
		 }
		 <Link to={`/ver_encuentros/${logStatus.user}`} className='nav-button'>Listar Encuentros</Link>
		 <a href="/productos" className='nav-button'>Ver Productos</a>
		 <a href="/logout" className='nav-button cerrar'>Cerrar sesión</a>
             </div>
	    }
	    <Card>
		<Main/>
	    </Card>
	</div>
    );    
};

export default App;
