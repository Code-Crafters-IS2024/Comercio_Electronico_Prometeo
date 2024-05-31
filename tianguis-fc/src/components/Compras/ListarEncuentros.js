import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ListarEncuentros = () => {
    const { id } = useParams();
    const [encuentros, setEncuentros] = useState([]);

    useEffect(() => {
	console.log(`ID: ${id}`);
        fetch(`/api/get_encuentros/${id}`)
            .then(response => response.json())
            .then(data => setEncuentros(data))
            .catch(error => console.error('Error:', error));
    }, []);

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
