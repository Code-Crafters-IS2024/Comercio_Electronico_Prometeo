const CrearResena = ({id_producto}) =>
{
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
    };
    return(
        <div>
        <form onSubmit={submitHandler}>
            <input type="number" min={0} max={5} defaultValue={3} name="calificacion" required></input>
            <input type="textbox" placeholder="Escribe lo que piensas de este producto." name="comentario"></input>
            <button type="submit">Subir Resena</button>
        </form>
        </div>
    )
}

export default CrearResena;