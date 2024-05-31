import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "../UI/Card";
import './AgregarUsuario.css';

const AgregarUsuario = () => {
    const [formData, setFormData] = useState({
        numero_cuenta: '',
        nombres: '',
        ap_pat: '',
        ap_mat: '',
        num_telefono: '',
        correo: '',
        genero: '',
        foto: null,
        password: '',
        tipo_usuario: 'comprador',  // Valor por defecto
    });

    const navigate = useNavigate();

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
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }
	console.log(`${form.nombre}`);
        await fetch('/api/agregar_usuario', {
            method: 'POST',
            body: form,
        }).then(response => response.json())
            .then(data => {
		console.log(data);
              if (data.success) {
                  navigate('/');
              } else {
                  alert('Error al agregar el usuario');
              }
          });
    };

    return (
        <div className="add-user-section">
            <h2>Agregar Usuario</h2>
            <Card>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Número de Cuenta:</label>
                        <input 
                            type="text"
                            name="numero_cuenta"
                            value={formData.numero_cuenta}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Nombres:</label>
                        <input 
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Apellido Paterno:</label>
                        <input 
                            type="text"
                            name="ap_pat"
                            value={formData.ap_pat}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Apellido Materno:</label>
                        <input 
                            type="text"
                            name="ap_mat"
                            value={formData.ap_mat}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input 
                            type="text"
                            name="num_telefono"
                            value={formData.num_telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Correo:</label>
                        <input 
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Género:</label>
                        <input 
                            type="text"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Foto:</label>
                        <input 
                            type="file"
                            name="foto"
                            onChange={handleChange}
                        
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Tipo de Usuario:</label>
                        <select 
                            name="tipo_usuario" 
                            value={formData.tipo_usuario} 
                            onChange={handleChange}>
                            <option value="comprador">Comprador</option>
                            <option value="vendedor">Vendedor</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Registrar</button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AgregarUsuario;
