import { Navigate } from "react-router";
import { Link } from 'react-router-dom';
import LoginStatus from "../Utils/FetchLogIn";

//Pagina principal del usuario cuando esta logeado
const Home = () =>
      {
	  const idVendedor = 1;
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
		  <h1>Bienvenido a Comercio Electrónico Prometeo</h1>
		  </div>);

      }

export default Home;
