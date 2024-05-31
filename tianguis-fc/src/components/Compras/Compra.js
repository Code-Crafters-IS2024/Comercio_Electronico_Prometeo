import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CompraInfo = () => {
    const { id } = useParams();
    const [compra, setCompra] = useState(null);

    useEffect(() => {
        fetch(`/api/get_compra/${id}`)
            .then(response => response.json())
            .then(data => setCompra(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    if (!compra) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Información de la Compra</h2>
            <p>ID Compra: {compra.id_compra}</p>
            <p>ID Vendedor: {compra.id_vendedor}</p>
            <p>ID Comprador: {compra.id_comprador}</p>
            <p>Total: {compra.total}</p>
            <p>Fecha: {compra.fecha}</p>
            <Link to={`/crear_encuentro/${compra.id_compra}`}>Crear Encuentro</Link>
        </div>
    );
};

export default CompraInfo;
