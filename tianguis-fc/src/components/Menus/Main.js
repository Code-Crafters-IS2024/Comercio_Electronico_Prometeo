import React, { useState} from "react";
import { NavLink, Route, Routes } from 'react-router-dom';
import './Main.css';

import IniciarSesionUsuario from "./IniciarSesionUsuario";
import Start from "./Start";
import Home from "./Home";
import Logout from "./Logout";
import ModificarProductos from "../ModificarProductos/ModificarProductos";
import Consultar_Producto from "../ConsultarProductos/Consultar_Productos";

//Main con rutas de navegacion y sus respectivos componentes 
const Main = () => {

    return (<Routes>
                <Route path="/" Component={Start}></Route>
                <Route path="/login" Component={IniciarSesionUsuario}></Route>
                <Route path="/home" Component={Home}></Route>
                <Route path="/logout" Component={Logout}/>
                <Route path="/modificarproducto" Component={ModificarProductos}></Route>
                <Route path="/productos/consultar" Component={Consultar_Producto}></Route>
             </Routes>);

};

export default Main;