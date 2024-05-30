import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import CardProduct from "./CardProducto";
import "./ConsultarProductos.css";
import CardProdDetailed from "./CardProdDetailed";
import Resenas from "./Resenas";
/**
 * Componente para consultar todos los productos disponibles
 * @returns 
 */
const Producto_Individual = () =>
{
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

  console.log(data)

  return(
    <div>
      <CardProdDetailed data={producto} id={id_producto}/>
      <h3>Reseñas</h3>
      <Resenas id={id_producto}/>
    </div>
  )
}
export default Producto_Individual;