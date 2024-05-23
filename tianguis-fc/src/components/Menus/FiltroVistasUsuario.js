import React from "react";
import './FiltroVistasUsuario.css';

const FiltroVistasUsuario = (props) => {

    const buttonSelectionChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
        console.log(event.target.value);
    }

    return (
        <div className="filtro-vistas-usuario">
            <button onClick={(event) => buttonSelectionChangeHandler(event)} value="Vendedor">Vendedor</button>
            <button onClick={(event) => buttonSelectionChangeHandler(event)} value="Comprador">Comprador</button>
        </div>
    );

};

export default FiltroVistasUsuario;