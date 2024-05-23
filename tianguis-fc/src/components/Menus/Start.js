import { Navigate } from "react-router-dom";
import LoginStatus from "../Utils/FetchLogIn";

//Pagina que redirecciona al usuario dependiendo de si est alogeado
const Start = () =>
{
    let logStatus = LoginStatus();

    if(logStatus == null)
    {
        return null
    }
    //Si el usuario esta logeado, redirigir al inicio
    if(!logStatus.logged)
    {
        return <Navigate to="/login"/>
    }

    return <Navigate to="/home"/>
};

export default Start;