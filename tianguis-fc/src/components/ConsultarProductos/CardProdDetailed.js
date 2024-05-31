
/**
 * 
 * @param {*} param0 
 * @param {*} esVendedor 
 * @returns 
 */
const CardProdDetailed = ({data, id, esVendedor}) =>
{
    let calificacion = ""

    //Genera la calificacion como estrellas usando caracteres ascii
    for(let i = 0; i < 5; i++)
    {
        if(i < data.producto.calificacion - 0.5)
        {
            calificacion += "★"
        }
        else
        {
            calificacion += "☆"
        }
    }

    return(
        <div className="product detailed">
            <div className="product-image">

            </div>
            <div className="product-info-panel">
                <div className="product-info">
                    <h1>Nombre del Producto</h1>

                    <label><label  className="producto-calificacion">{calificacion}</label> ({data.producto.calificacion.toFixed(1)})</label>
                    <label>{data.producto.categoria}</label>
                    <label>Ofrecido por {data.vendedor.nombres} {data.vendedor.apPat} {data.vendedor.apMat}</label>
                    <label className="product-description" >{data.producto.descripcion}</label>
                    
                    <div className="producto-unidad-precio">
                        <label>{data.producto.unidades} Unidades disponibles</label>
                        <label className="producto-precio">${data.producto.costo} MXN</label>
                    </div>
                </div>
                <div className="product-buttons">
                {esVendedor &&
                    <a href={`/path/a/eliminar?id_producto=${id}`} className="product-nav-button eliminar">Eliminar</a>
                }
                {esVendedor?
                    <a href={`/modificarproducto/${id}`} className="product-nav-button modificar">Modificar</a>
                    :
                    <a href="" className="product-nav-button comprar">Comprar</a>
                }
                </div>
            </div>
        </div>
    )
}

export default CardProdDetailed;