import React, { useState} from "react";
import { NavLink, Route, Routes } from 'react-router-dom';
import './Main.css';

import IniciarSesionUsuario from "./IniciarSesionUsuario";
import Start from "./Start";
import Home from "./Home";
import Logout from "./Logout";
import ModificarProductos from "../ModificarProductos/ModificarProductos";
import Consultar_Producto from "../ConsultarProductos/Consultar_Productos";
import Producto_Individual from "../ConsultarProductos/Producto_Individual";
import AgregarProducto from "../AgregarProductos/AgregarProducto";
import ListarCompras from "../Compras/ListarCompras";
import CompraInfo from "../Compras/Compra";
import EstablecerEncuentro from "../Compras/EstablecerEncuentro";
import ListarEncuentros from "../Compras/ListarEncuentros";
import AgregarUsuario from "../AgregarUsuario/AgregarUsuario"
import EliminarProducto from "../EliminarProducto/EliminarProd";
//Main con rutas de navegacion y sus respectivos componentes 
const Main = () => {

    return (<Routes>
                <Route path="/" Component={Start}></Route>
                <Route path="/login" Component={IniciarSesionUsuario}></Route>
                <Route path="/home" Component={Home}></Route>
                <Route path="/logout" Component={Logout}/>
                <Route path="/modificarproducto/:id" Component={ModificarProductos}></Route>
                <Route path="/productos" Component={Consultar_Producto}></Route>
                <Route path="/productos/producto/:id_producto" Component={Producto_Individual}></Route>
                <Route path="/productos/eliminar/:id_producto" Component={EliminarProducto}></Route>
                <Route path="/AgregarProducto" Component={AgregarProducto}/>
                <Route path="/compras/:id" element={<ListarCompras />} />
                <Route path="/compra/:id" element={<CompraInfo />} />
                <Route path="/crear_encuentro/:id_compra" element={<EstablecerEncuentro />} />
                <Route path="/ver_encuentros/:id" element={<ListarEncuentros />} />
		<Route path="/agregar_usuario" Component={AgregarUsuario}></Route>
             </Routes>);

};

export default Main;
