import { useEffect, useState } from "react";

/**
 * Renderiza un form para crear o modificar una reseña, tomando en cuenta si el usuario ya ha 
 * escrito una o no
 * @param {*} id_producto : id del producto de la reseña
 * @returns 
 */
const CrearResena = ({id_producto}) =>
{

    //Determinar si el usuario ha escrito una reseña para este producto
    const [data, setData] = useState({});
    
    //Obtener reseña del usuario para este producto
    useEffect(() => {
        fetch(`/api/resena/obtener_comprador_prod?id_producto=${encodeURIComponent(id_producto)}`, 
        {
          method: "GET"
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //FUnciones de form

    async function sendFormData(formData) {
        let direction = data.data ? `/api/resena/modificar` : 'api/resena/agregar'
        await fetch(direction, {
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

        if(data.data)
        {
            formData.append('id_resena', data.data.id_resena)
        }

        await sendFormData(formData);

        window.location.reload();
    }

    //Eliminar reseña
    async function delete_resena()
    {
        await fetch(`/api/resena/eliminar?id_resena=${data.data.id_resena}`, {
            method: 'GET',
          })
          .then((response) => response.json())
          window.location.reload();
    }

    //Si hay una reseña escrita por el usuario, usar sus valores en el forms. de otro modo usar placeholders
    const defaultComentario = data.data ? {defaultValue : data.data.comentario} : { placeholder : "Escribe aqui lo que piensas de este prducto"}
    const defaultCalificacion = data.data ? {defaultValue : data.data.calificacion} : { placeholder: 3}

        return(
            <form onSubmit={submitHandler} className="resena-form">
                <h3>{data.data?
                "Esto es lo que piensas de este producto":
                "Cuentanos lo que piensas de este producto"
                }</h3>
                <textarea 
                {...defaultComentario}
                name="comentario" className="resena-textbox" rows="7"></textarea>
                <div>
                <label htmlFor="calificacion">Calificación:</label> <input type="number" min={0} max={5} 
                {...defaultCalificacion}
                name="calificacion" required></input>
                </div>
                <button type="submit">{data.data ? "Actualizar reseña" : "Subir Reseña"}</button>
                {data.data && 
                <a onClick={delete_resena} className="product-nav-button eliminar" >Eliminar Reseña</a>}
            </form>
        )
}

export default CrearResena;