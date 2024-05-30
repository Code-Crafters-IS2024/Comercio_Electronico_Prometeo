const CardProdDetailed = ({data, id}, esVendedor = false) =>
{
    return(
        <div>
            <label>Vendedor: {data.vendedor.nombres} {data.vendedor.apPat} {data.vendedor.apMat}</label>
            <br></br>
            <label>Descripcion: {data.producto.descripcion}</label>
            <br></br>
            <label>Costo: {data.producto.costo}</label>
            <br></br>
            <label>Calificacion: {data.producto.calificacion.toFixed(1)}</label>
            <br></br>
            <label>Unidades: {data.producto.unidades}</label>
        </div>
    )
}

export default CardProdDetailed;