import { useEffect, useState } from "react";
/**
 * Consulta con el back end si el usuario esta logeado, y de estarlo, la informacion del mismo
 * @returns Diccionario con la informacion del usuario logeado de la forma {"logged": bool, "user":string}
 */
const LoginStatus = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
      fetch('/api/login')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return data;
  };

export default LoginStatus;