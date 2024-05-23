import React, { useState} from "react";
import './RegistrarUsuario.css';
import Card from "../UI/Card";
import FiltroVistasUsuario from "./FiltroVistasUsuario";
import VendedorForm from "../NuevoVendedor/VendedorForm/VendedorForm";
import CompradorForm from "../NuevoComprador/CompradorForm/CompradorForm";


const RegistrarUsuario = (props) => {

    const [selectedRegister, setSelectedRegister] = useState('Comprador');

    const registerChangeHandler = (selectedRegister) => {
        setSelectedRegister(selectedRegister);
    };

    const guardaCompradorHandler = (compradorIngresado) => {
        console.log(compradorIngresado);
        // Guardar como comprador
    };

    const guardaVendedorHandler = (vendedorIngresado) => {
        console.log(vendedorIngresado);
        // Guardar como vendedor
    };

    return (
        <div className="register-section">
            <h2>Registrar Usuario</h2>
            ¿Aún no te registras?
            ¿Qué tipo de usuario eres?<br></br>
            <Card>
                <FiltroVistasUsuario
                    selected={selectedRegister}
                    onChangeFilter={registerChangeHandler}
                />
            </Card>
            <Card className="nuevo-comprador">
                {selectedRegister === "Comprador" && <CompradorForm onGuardarComprador={guardaCompradorHandler}/>}
            </Card>
            <Card className="nuevo-vendedor">
                {selectedRegister === "Vendedor" && <VendedorForm onGuardarVendedor={guardaVendedorHandler}/>}
            </Card>
        </div>
    );
};

export default RegistrarUsuario;