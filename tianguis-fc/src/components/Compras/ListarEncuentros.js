import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginStatus from "../Utils/FetchLogIn";

const ListarEncuentros = () => {
    const { id } = useParams();
    const [encuentros, setEncuentros] = useState([]);
    const logStatus = LoginStatus();
    
    useEffect(() => {
    if (logStatus) {
        const userType = logStatus.type;
        fetch(`/api/get_encuentros/${id}?user_type=${userType}`)
            .then(response => response.json())
            .then(data => setEncuentros(data))
            .catch(error => console.error('Error:', error));
    }
}, [id, logStatus]);
    return (
        <div>
            <h2>Encuentros establecidos</h2>
            <ul>
                {encuentros.map(encuentro => (
                    <li key={encuentro.id_compra}>
                        ID Comprador: {encuentro.id_comprador} - ID Vendedor: {encuentro.id_vendedor} - Lugar: {encuentro.lugar} - Fecha: {encuentro.fecha} - Hora: {encuentro.hora}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarEncuentros;

