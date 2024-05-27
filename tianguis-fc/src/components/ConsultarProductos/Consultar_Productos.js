import { useEffect, useState } from "react";

/**
 * Componente para terminar la sesion
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

  
  console.log(data);
}
export default Consultar_Producto;