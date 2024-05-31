import { useEffect, useState } from "react";
import Resena from "./CardResena";

/**
 * Componente que muestra una lista de todas las reseñas disponibles para un producto dado
 * @param {*} id id del producto cuyas reseñas se quieren obtener
 * @returns 
 */
const Resenas = ({id}) =>
{
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`/api/view_resenas_prod?id_producto=${encodeURIComponent(id)}`, 
        {
          method: "GET"
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    if(data == null)
    {
      return null;
    }

    let resenas = data.data

  if(resenas == null)
  {
    return <h1>No hay reseñas para este producto</h1>;
  }

  console.log(resenas)

  return(
    <div className="resenas-list">
      <h1>Reseñas</h1>
      {Object.keys(resenas).map((key) => (
        <div key={key}>
          <Resena data={resenas[key]} id={key}/>
          <br></br><br></br>
        </div>
      ))}
    </div>
  )
}

export default Resenas;