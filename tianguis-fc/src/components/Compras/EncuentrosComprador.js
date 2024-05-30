import React, { useEffect, useState } from 'react';

const EncuentrosPorComprador = ({ idComprador }) => {
    const [encuentros, setEncuentros] = useState([]);

    useEffect(() => {
        fetch(`/api/get_encuentros_comprador/${idComprador}`)
            .then(response => response.json())
            .then(data => setEncuentros(data))
            .catch(error => console.error('Error:', error));
    }, [idComprador]);

    return (
        <div>
            <h2>Encuentros del Comprador</h2>
            <ul>
                {encuentros.map(encuentro => (
                    <li key={encuentro.id_compra}>
                        ID Vendedor: {encuentro.id_vendedor} - Lugar: {encuentro.lugar} - Fecha: {encuentro.fecha} - Hora: {encuentro.hora}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EncuentrosPorComprador;
