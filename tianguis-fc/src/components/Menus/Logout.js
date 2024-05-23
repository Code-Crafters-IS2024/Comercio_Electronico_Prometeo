import { Navigate } from "react-router";

/**
 * Componente para terminar la sesion
 * @returns 
 */
const Logout = () =>
{
    fetch('/api/logout');

    return <Navigate to="/"/>
}
export default Logout;