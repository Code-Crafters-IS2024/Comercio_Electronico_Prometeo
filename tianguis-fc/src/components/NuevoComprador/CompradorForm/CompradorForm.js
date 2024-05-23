import React, { useState } from "react";

import "./CompradorForm.css";

const CompradorForm = (props) => {
  const [numCuentaIngresado, setNumCuentaIngresado] = useState("");
  const [nombresIngresados, setNombresIngresados] = useState("");
  const [apPatIngresado, setApPatIngresado] = useState("");
  const [apMatIngresado, setApMatIngresado] = useState("");
  const [numTelefonoIngresado, setNumTelefonoIngresado] = useState("");
  const [correoIngresado, setCorreoIngresado] = useState("");
  const [generoIngresado, setGeneroIngresado] = useState("");
  const [fotoIngresada, setFotoIngresada] = useState(null);
  const [contraseniaIngresada, setContraseniaIngresada] = useState("");

  const cambioNumCuentaHandler = (event) => {
    setNumCuentaIngresado(event.target.value);
  };

  const cambioContraseniaHandler = (event) => {
    setContraseniaIngresada(event.target.value);
  }

  const cambioNombresHandler = (event) => {
    setNombresIngresados(event.target.value);
  };

  const cambioApPatHandler = (event) => {
    setApPatIngresado(event.target.value);
  };

  const cambioApMatHandler = (event) => {
    setApMatIngresado(event.target.value);
  };

  const cambioNumTelefonoHandler = (event) => {
    setNumTelefonoIngresado(event.target.value)
  };

  const cambioCorreoHandler = (event) => {
    setCorreoIngresado(event.target.value)
  };

  const cambioGeneroHandler = (event) => {
    setGeneroIngresado(event.target.value);
  }

  const cambioFotoHandler = (event) => {
    setFotoIngresada(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const comprador = {
      numCuenta: numCuentaIngresado,
      contrasenia: contraseniaIngresada,
      nombres: nombresIngresados,
      apPat: apPatIngresado,
      apMat: apMatIngresado,
      numTelefono: numTelefonoIngresado,
      correo: correoIngresado,
      genero: generoIngresado,
      foto: fotoIngresada,
    };

    if(
      numCuentaIngresado === "" ||
      nombresIngresados === "" ||
      apMatIngresado === "" || 
      apPatIngresado === "" ||
      numTelefonoIngresado === "" ||
      correoIngresado === "" ||
      generoIngresado === "" || 
      contraseniaIngresada === ""
    ){
      alert("¡¡¡Hay Campos vacíos!!!");
      return;
    }

    props.onGuardarComprador(comprador);
    setNumCuentaIngresado("");
    setNombresIngresados("");
    setApPatIngresado("");
    setApMatIngresado("");
    setNumTelefonoIngresado("");
    setCorreoIngresado("");
    setGeneroIngresado("");
    setFotoIngresada(null);
    setContraseniaIngresada("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="nuevo-comprador__controls">
        <div className="nuevo-comprador__control">
          <label>Número de Cuenta: </label>
          <input
            type="text"
            value={numCuentaIngresado}
            onChange={cambioNumCuentaHandler}
            required
          />
        </div>
        <div className="nuevo-comprador__control">
          <label>Contraseña: </label>
          <input
            type="password"
            value={contraseniaIngresada}
            onChange={cambioContraseniaHandler}
            required
          />
        </div>
        <div className="nuevo-comprador__control">
          <label>Nombres: </label>
          <input
            type="text"
            value={nombresIngresados}
            onChange={cambioNombresHandler}
            required
          />
        </div>
        <div className="nuevo-comprador__control">
          <label>Apellido Paterno: </label>
          <input
            type="text"
            value={apPatIngresado}
            onChange={cambioApPatHandler}
            required
          />
        </div>
        <div className="nuevo-comprador__control">
          <label>Apellido Materno: </label>
          <input
            type="text"
            value={apMatIngresado}
            onChange={cambioApMatHandler}
            required
          />
        </div>
        <div className="nuevo-comprador__control">
          <label>Número de Télefono: </label>
          <input
            type="text"
            value={numTelefonoIngresado}
            onChange={cambioNumTelefonoHandler}
            required
          />
        </div>
        <div className="nuevo-comprador__control">
          <label>Correo: </label>
          <input
            type="email"
            value={correoIngresado}
            onChange={cambioCorreoHandler}
            required
          />
        </div>
        <div className="nuevo-comprador__control">
          <label>Género: </label>
          <input
            type="radio"
            value="Masculino"
            onChange={cambioGeneroHandler}
          />
          <label>Mascúlino</label>
          <input
            type="radio"
            value="Femenino"
            onChange={cambioGeneroHandler}
          />
          <label>Femenino</label>
          <input
            type="radio"
            value="No Binario"
            onChange={cambioGeneroHandler}
          />
          <label>No Binario</label>
        </div>
        <div className="nuevo-comprador__control">
          <label>Foto de Perfil: </label>
          <input
            type="file"
            accept="image/*"
            value={fotoIngresada}
            onChange={cambioFotoHandler}
          />
        </div>
        <div className="nuevo-comprador__actions">
          <button type="submit">Agregar Comprador</button>
        </div>
      </div>
    </form>
  );
};

export default CompradorForm;
