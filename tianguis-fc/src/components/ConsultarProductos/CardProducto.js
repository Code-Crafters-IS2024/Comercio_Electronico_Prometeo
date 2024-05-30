const CardProduct = ({data, id}, esVendedor = false) =>
{
    return (<div>
        <label>Nombre del producto</label>
        <div>
            <br></br><label>Vendedor: {data.vendedor}</label>
            <br></br><label>Calificacion: {data.calificacion.toFixed(1)}</label>
            <br></br><label>Disponibles: {data.unidades}</label>
          </div>
          <div>
            <a href={`/productos/producto/${id}`}>Ver Detalles</a>
            {esVendedor?
                <a href="">Modificar</a>
                :
                <a href="">Comprar</a>
            }
            {esVendedor?
                <a href="">Eliminar</a>
                :
                <a href="">Reseñar</a>
            }
          </div>
    </div>
    );

}
//<br></br><label>Calificación: {data.calificacion.toFixed(1)}</label>
export default CardProduct;