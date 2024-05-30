import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import CardProduct from "./CardProducto";
import "./ConsultarProductos.css";
/**
 * Componente para consultar todos los productos disponibles
 * @returns 
 */
const Producto_Individual = () =>
{
    let { id } = useParams();
        id = parseInt(id);

    const [data, setData] = useState({});

  useEffect(() => {
      fetch("/api/get_prod?id_producto="+"01")
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
    <div className="productos-grid">
      hello
    </div>
  )
}
export default Producto_Individual;