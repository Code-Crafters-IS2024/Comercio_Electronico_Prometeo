const CardProduct = ({data}, esVendedor = false) =>
{
    return (<div>
        <label>Nombre del producto</label>
        <div>
            <br></br><label>Vendedor: {data.vendedor}</label>
            <br></br><label>Calificacion: {data.calificacion.toFixed(1)}</label>
            <br></br><label>Precio: ${data.precio} MXN</label>
            <br></br><label>Disponibles: {data.unidades}</label>
          </div>
    </div>
    );

}
//<br></br><label>Calificación: {data.calificacion.toFixed(1)}</label>
export default CardProduct;