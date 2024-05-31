
import { Navigate } from "react-router";
import LoginStatus from "../Utils/FetchLogIn";

import { useParams} from 'react-router-dom';

const EliminarProducto = () =>
{
    let { id_producto } = useParams();

    let login = LoginStatus();

    if(login == null)
    {
        return null;
    }

    if(!login.logged)
    {
        return <Navigate to="/login"/>;
    }

    if(login.type == "comprador")
    {
        return <Navigate to="/productos"/>;
    }

    fetch(`/api/producto/eliminar?id_producto=${id_producto}`, {
            method: 'GET',
          })
          .then((response) => response.json())
    
    return <Navigate to="/productos"/>;
}

export default EliminarProducto;