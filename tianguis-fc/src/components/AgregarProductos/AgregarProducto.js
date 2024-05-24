import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes } from 'react-router-dom';

const AgregarProducto = () => {
    const [formData, setFormData] = useState({
        id_vendedor: '',
        descripcion: '',
        costo: '',
        categoria: '',
        foto: null,
        unidades: ''
    });

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
            data.append(key, formData[key]);
        }

        await fetch('/api/add_product', {
            method: 'POST',
            body: data
        }).then((response) => response.json())
          .then((data) => {
              console.log(data);
              alert("Producto agregado con éxito");
          })
          .catch((error) => {
              console.error("Error:", error);
          });
    };

    return (
        <div className="add-product-section">
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Id Vendedor:</label>
                    <input
                        type="text"
                        name="id_vendedor"
                        value={formData.id_vendedor}
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
                    <button type="submit">Agregar Producto</button>
                </div>
            </form>
        </div>
    );
};

export default AgregarProducto;
                               