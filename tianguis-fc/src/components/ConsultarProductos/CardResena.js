
/**
 * Componente de una reseña individual
 * @param {*} data Datos de la reseña 
 * @returns 
 */
const Resena = ({data}) =>
{
    let calificacion = ""

    //Genera la calificacion como estrellas usando caracteres ascii
    for(let i = 0; i < 5; i++)
    {
        if(i < data.calificacion - 0.5)
        {
            calificacion += "★"
        }
        else
        {
            calificacion += "☆"
        }
    }

    return(
        <div className="resena-card">
            <h1 className="resenar">{calificacion}</h1>
            <label className="product-description">{data.comentario}</label>
            <label>{data.nombres}</label>
        </div>
    )
}

export default Resena;