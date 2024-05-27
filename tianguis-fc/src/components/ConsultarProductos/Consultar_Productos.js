import { useEffect, useState } from "react";

/**
 * Componente para consultar todos los productos disponibles
 * @returns 
 */
const Consultar_Producto = () =>
{
    const [data, setData] = useState(null);

  useEffect(() => {
      fetch('/api/view_prods')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
  }, []);

  
  return(
    <div>
      hi
    </div>
  )
}
export default Consultar_Producto;