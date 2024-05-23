import { Navigate } from "react-router";

import LoginStatus from "../Utils/FetchLogIn";

//Pagina principal del usuario cuando esta logeado
const Home = () =>
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

    return (
    <div>
        Estas logeado!!
        <a href="/logout">Cerrar sesión</a>
    </div>);

}

export default Home;