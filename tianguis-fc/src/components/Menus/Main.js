import React, { useState} from "react";
import { NavLink, Route, Routes } from 'react-router-dom';
import './Main.css';

import IniciarSesionUsuario from "./IniciarSesionUsuario";
import Start from "./Start";
import Home from "./Home";
import Logout from "./Logout";
import AgregarProducto from "../AgregarProductos/AgregarProducto";
import ListarCompras from "../Compras/ListarCompras";
import CompraInfo from "../Compras/Compra";
import EstablecerEncuentro from "../Compras/EstablecerEncuentro";
import ListarEncuentros from "../Compras/ListarEncuentros";

//Main con rutas de navegacion y sus respectivos componentes 
const Main = () => {

    return (<Routes>
                <Route path="/" Component={Start}></Route>
                <Route path="/login" Component={IniciarSesionUsuario}></Route>
                <Route path="/home" Component={Home}></Route>
                <Route path="/logout" Component={Logout}/>
                <Route path="/AgregarProducto" Component={AgregarProducto}/>
		<Route path="/compras/:id" element={<ListarCompras />} />
		<Route path="/compra/:id" element={<CompraInfo />} />
		<Route path="/crear_encuentro/:id_compra" element={<EstablecerEncuentro />} />
		<Route path="/ver_encuentros/:id" element={<ListarEncuentros />} />
             </Routes>);

};

export default Main;
