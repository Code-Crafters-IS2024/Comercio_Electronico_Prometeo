const Resena = ({data}) =>
{
    return(
        <div>
            <label>Usuario: {data.nombres}</label>
            <br></br>
            <label>Calificacion: {data.calificacion}</label>
            <br></br>
            <label>Contenido: {data.comentario}</label>
        </div>
    )
}

export default Resena;