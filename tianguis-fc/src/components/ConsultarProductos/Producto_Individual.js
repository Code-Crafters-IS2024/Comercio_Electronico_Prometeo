import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import CardProduct from "./CardProducto";
import "./ConsultarProductos.css";
import CardProdDetailed from "./CardProdDetailed";
import Resenas from "./Resenas";
import CrearResena from "./CrearResena";
import { Navigate } from "react-router";
import LoginStatus from "../Utils/FetchLogIn";
/**
 * Componente para consultar la informacion de un producto individual
 * @returns 
 */
const Producto_Individual = () =>
{
  let { id_producto } = useParams();

  const [data, setData] = useState({});

  let login = LoginStatus();

  useEffect(() => {
      fetch(`/api/get_prod?id_producto=${encodeURIComponent(id_producto)}`, 
      {
        method: "GET"
      })
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
  }, []);

  if(login == null)
  {
    return null;
  }

  if(!login.logged)
  {
    return <Navigate to="/login"/>;
  }

  //Cambiar por chequeo para determinar tipo de usuario
  let esVendedor = login.type == "vendedor";

  if(data == null)
  {
    console.log("No hay datos")
    return null
  }

  let producto = data.data

  if(producto == null)
  {
    return null;
  }

  return(
    <div>
      <CardProdDetailed data={producto} id={id_producto} esVendedor={esVendedor}/>
      <div className="resena-box">

      <Resenas id={id_producto}/>
      {!esVendedor &&
      <CrearResena id_producto={id_producto}/>}
      </div>
    </div>
  )
}
export default Producto_Individual;