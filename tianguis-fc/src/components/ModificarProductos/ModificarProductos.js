import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModificarProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id_vendedor: '',
	nombre: '',
        descripcion: '',
        costo: '',
        categoria: '',
        foto: null,
        unidades: '',
        fotoURL: null
    });

    useEffect(() => {
        fetch(`/api/get_product/${id}`)
            .then(response => response.json())
            .then(data => setFormData({
                id_vendedor: data.id_vendedor,
		nombre: data.nombre,
                descripcion: data.descripcion,
                costo: data.costo,
                categoria: data.categoria,
                foto: null,
                unidades: data.unidades,
                fotoURL: data.foto ? `data:image/jpeg;base64,${btoa(data.foto)}` : null
            }))
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            foto: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (key !== 'fotoURL') {  
                data.append(key, formData[key]);
            }
        }
        await fetch(`/api/update_product/${id}`, {
            method: 'POST',
            body: data
        }).then((response) => response.json())
          .then((data) => {
              console.log(data);
              alert(data.message);
              if (data.message === "Producto actualizado con éxito"){
                navigate("/");
              }
          }).catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <div className="modify-product-section">
            <h2>Modificar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Id Vendedor:</label>
                    <input
                        type="number"
                        name="id_vendedor"
                        value={formData.id_vendedor}
                        onChange={handleChange}
                        required
                    />
                </div>
		<div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Costo:</label>
                    <input
                        type="number"
                        name="costo"
                        value={formData.costo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input
                        type="text"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Foto:</label>
                    <input
                        type="file"
                        name="foto"
                        onChange={handleFileChange}
                    />
                    {formData.fotoURL && <img src={formData.fotoURL} alt="Product" />}
                </div>
                <div>
                    <label>Unidades:</label>
                    <input
                        type="number"
                        name="unidades"
                        value={formData.unidades}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Actualizar Producto</button>
                </div>
            </form>
        </div>
    );
};

export default ModificarProducto;
