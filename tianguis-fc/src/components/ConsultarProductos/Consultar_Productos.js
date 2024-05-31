import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import CardProduct from "./CardProducto";
import "./ConsultarProductos.css";
import LoginStatus from "../Utils/FetchLogIn";
/**
 * Componente para consultar todos los productos disponibles en forma de lista
 * @returns 
 */
const Consultar_Producto = () =>
{
  let login = LoginStatus();

  const [data, setData] = useState({});
  useEffect(() => {
    fetch("/api/view_prods")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []); 

  if(login == null)
  {
    return <h1>Login null</h1>;
  }

  if(!login.logged)
  {
    return <Navigate to="/login"/>;
  }

  //Cambiar por chequeo para determinar tipo de usuario
  let esVendedor = login.type == "vendedor";

  if(data == null)
  {
    return <h1>No hay productos</h1>
  }

  let productos = data.data
  if(productos == null)
  {
    return <h1>No hay nada por aqui</h1>;
  }

  console.log(data)

  return(
    <div>
    <div className="productos-grid">
      {Object.keys(productos).map((key) => (
        <div key={key}>
          <CardProduct data={productos[key]} id={key} esVendedor={esVendedor}/>
        </div>
      ))}
    </div>
    </div>
  )
}
export default Consultar_Producto;