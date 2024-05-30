import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import CardProduct from "./CardProducto";
import "./ConsultarProductos.css";
import CardProdDetailed from "./CardProdDetailed";
import Resenas from "./Resenas";
import CrearResena from "./CrearResena";
/**
 * Componente para consultar todos los productos disponibles
 * @returns 
 */
const Producto_Individual = () =>
{
    let { id_producto } = useParams();

    const [data, setData] = useState({});

    //Determinar si el usuario es comprador o vendedor
    let esVendedor = false;

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
      <h3>Reseñas</h3>
      {!esVendedor &&
      <CrearResena id_producto={id_producto}/>}
      <Resenas id={id_producto}/>
    </div>
  )
}
export default Producto_Individual;