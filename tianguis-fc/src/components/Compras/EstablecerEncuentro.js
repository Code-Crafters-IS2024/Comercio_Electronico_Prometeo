import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EstablecerEncuentro = () => {
    const { id_compra } = useParams();
    const [compra, setCompra] = useState(null);
    const [formData, setFormData] = useState({
        id_comprador: '',
        id_vendedor: '',
	id_compra: '',
        lugar: '',
        fecha: '',
        hora: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
	console.log(`${id_compra}`);
        fetch(`/api/get_compra/${id_compra}`)
            .then(response => response.json())
            .then(data => {
                setCompra(data);
                setFormData({
                    ...formData,
                    id_comprador: data.id_comprador,
                    id_vendedor: data.id_vendedor,
		    id_compra: id_compra
                });
            })
            .catch(error => console.error('Error:', error));
    }, [id_compra]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/crear_encuentro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === "Encuentro creado con éxito") {
                navigate('/');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    if (!compra) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Establecer Encuentro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Lugar:</label>
                    <input
                        type="text"
                        name="lugar"
                        value={formData.lugar}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Hora:</label>
                    <input
                        type="time"
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Establecer Encuentro</button>
                </div>
            </form>
        </div>
    );
};

export default EstablecerEncuentro;
