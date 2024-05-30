const CardProdDetailed = ({data, id}, esVendedor = false) =>
{
    return(
        <div>
            <div className="info">
                <label>Vendedor: {data.vendedor.nombres} {data.vendedor.apPat} {data.vendedor.apMat}</label>
                <br></br>
                <label>Descripcion: {data.producto.descripcion}</label>
                <br></br>
                <label>Categoria: {data.producto.categoria}</label>
                <br></br>
                <label>Costo: {data.producto.costo}</label>
                <br></br>
                <label>Calificacion: {data.producto.calificacion.toFixed(1)}</label>
                <br></br>
                <label>Unidades: {data.producto.unidades}</label>
                
            </div>
            <div>
            {esVendedor?
                <a href="" className="product-nav-button">Modificar</a>
                :
                <a href="" className="product-nav-button">Comprar</a>
            }
            {esVendedor?
                <a href="" className="product-nav-button">Eliminar</a>
                :
                <a href="" className="product-nav-button">Reseñar</a>
            }
            </div>
        </div>
    )
}

export default CardProdDetailed;