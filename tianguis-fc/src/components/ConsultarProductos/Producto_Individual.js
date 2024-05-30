import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import CardProduct from "./CardProducto";
import "./ConsultarProductos.css";
import CardProdDetailed from "./CardProdDetailed";
import Resenas from "./Resenas";
import CrearResena from "./CrearResena";
/**
 * Componente para consultar la informacion de un producto individual
 * @returns 
 */
const Producto_Individual = () =>
{
  //Determinar si el usuario es comprador o vendedor
  let esVendedor = false;

  let { id_producto } = useParams();

  const [data, setData] = useState({});

    

  useEffect(() => {
      fetch(`/api/get_prod?id_producto=${encodeURIComponent(id_producto)}`, 
      {
        method: "GET"
      })
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
  }, []);

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