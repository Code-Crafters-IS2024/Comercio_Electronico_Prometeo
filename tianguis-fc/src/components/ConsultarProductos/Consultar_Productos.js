import { useEffect, useState } from "react";
import CardProduct from "./CardProducto";
import "./ConsultarProductos.css";
/**
 * Componente para consultar todos los productos disponibles
 * @returns 
 */
const Consultar_Producto = () =>
{
    const [data, setData] = useState({});

  useEffect(() => {
      fetch("/api/view_prods")
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
  }, []);

  if(data == null)
  {
    console.log("No hay datos")
    return null
  }

  let productos = data.data

  if(productos == null)
  {
    return null;
  }

  return(
    <div className="productos-grid">
      {Object.keys(productos).map((key) => (
        <div key={key}>
          <CardProduct data={productos[key]} id={key}/>
          <br></br><br></br>
        </div>
      ))}
    </div>
  )
}
export default Consultar_Producto;