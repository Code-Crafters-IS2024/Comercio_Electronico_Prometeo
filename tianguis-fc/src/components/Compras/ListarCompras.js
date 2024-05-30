import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListarCompras = ({ idVendedor }) => {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        fetch(`/api/get_compras/${idVendedor}`)
            .then(response => response.json())
            .then(data => setCompras(data))
            .catch(error => console.error('Error:', error));
    }, [idVendedor]);

    return (
        <div>
            <h2>Compras del Vendedor</h2>
            <ul>
                {compras.map(compra => (
                    <li key={compra.id_compra}>
                        <Link to={`/compra/${compra.id_compra}`}>Compra ID: {compra.id_compra} - Total: {compra.total}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarCompras;
