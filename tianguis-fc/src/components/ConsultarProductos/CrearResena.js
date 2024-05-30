import { useEffect, useState } from "react";

const CrearResena = ({id_producto}) =>
{

    //Determinar si el usuario ha escrito una reseña para este producto
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`/api/resena/obtener_comprador_prod?id_producto=${encodeURIComponent(id_producto)}`, 
        {
          method: "GET"
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(data)
    //FUnciones de form

    async function sendFormData(formData) {
        await fetch('/api/resena/agregar', {
          method: 'POST',
          body: formData
        })
        .then((response) => response.json())
      }

    //Submit
    async function submitHandler(event){
        event.preventDefault();
        const form = event.target;

        const calificacion = form.calificacion.value;
        const comentario = form.comentario.value;
        const id_prod = id_producto;
        
        let formData = new FormData()
        formData.append('id_producto', id_prod)
        formData.append('calificacion', calificacion)
        formData.append('comentario', comentario)

        await sendFormData(formData);

        window.location.reload();
    }

    const defaultComentario = data.data ? {value : data.data.comentario} : { placeholder : "Escribe aqui lo que piensas de este prducto"}
    const defaultCalificacion = data.data ? {value : data.data.calificacion} : { placeholder: 3}

        return(
            <form onSubmit={submitHandler} className="resena-form">

                <h3>Cuentanos lo que piensas de este producto</h3>
                <textarea 
                {...defaultComentario}
                name="comentario" className="resena-textbox" rows="7"></textarea>
                <div>
                <label for="calificacion">Calificación:</label> <input type="number" min={0} max={5} 
                {...defaultCalificacion}
                name="calificacion" required></input>
                </div>
                <button type="submit">{data.data ? "Actualizar reseña" : "Subir Reseña"}</button>
                {data.data && 
                <a href="" className="product-nav-button eliminar" >Eliminar Reseña</a>}
            </form>
        )
}

export default CrearResena;