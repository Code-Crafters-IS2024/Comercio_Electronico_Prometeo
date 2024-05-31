import { Navigate } from "react-router";
import { Link } from 'react-router-dom';
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
		  
		  </div>);

      }

export default Home;
