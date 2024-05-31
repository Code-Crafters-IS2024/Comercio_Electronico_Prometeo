import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { NavLink, Route, Routes } from 'react-router-dom';

import LoginStatus from "../Utils/FetchLogIn";
import "./agregar_prod.css";

const AgregarProducto = () => {
    const [formData, setFormData] = useState({
        id_vendedor: '',
        descripcion: '',
        costo: '',
        categoria: '',
        foto: null,
        unidades: ''
    });

    let login = LoginStatus();

    if(login == null)
    {
        return null
    }

    if(!login.logged || login.type != "vendedor")
    {
        return <Navigate to="/"/>
    }

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
              alert(data.message);
              if (data.message == "Producto agregado con éxito"){
                window.location.href = "/"
              }
          }).catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <div className="add-product-section">
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="prod_form">
                <div className="prod_field">
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="10"
                        required
                    />
                </div>
                <div className="prod_field">
                    <label>Costo:</label>
                    <input
                        type="number"
                        name="costo"
                        value={formData.costo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="prod_field">
                    <label>Categoría:</label>
                    <input
                        type="text"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="prod_field">
                    <label>Foto:</label>
                    <input
                        type="file"
                        name="foto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="prod_field">
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
                </div>
            </form>
        </div>
    );
};

export default AgregarProducto;