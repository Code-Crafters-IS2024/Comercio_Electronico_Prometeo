
import "./ConsultarProductos.css";

/**
 * Tarjeta que muestra informacion simplificada de un producto
 * @param {*} param0 datos del producto, id del producto e indicar si el usuario es un vendedor o no
 * @returns 
 */
const CardProduct = ({data, id, esVendedor}) =>
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

    return (
        <div className="product">
            <div className="product-image">
                {/* Aqui va la imagen del producto */}
            </div>
            <div className="product-info-panel">
                <div className="product-info">
                    <label className="product-name">Nombre del producto</label>
                    <label>Vendedor: {data.vendedor}</label>
                    <label><label className="producto-calificacion">{calificacion}</label> ({data.calificacion.toFixed(1)})</label>
                    <div className="producto-unidad-precio">
                        <label>{data.unidades} Unidades</label>
                        <label className="producto-precio">${data.precio} MXN</label>
                    </div>
                </div>
                <div className="product-buttons">
                    {/* Dependiendo del usuario, mostrar botones para modificar/eliminar el producto o comprar/reseñar */}
                    {esVendedor?
                        <a href={`/path/a/eliminar?id_producto=${id}`} className="product-nav-button eliminar">Eliminar</a>
                        :
                        <a href="" className="product-nav-button comprar"><b>Comprar</b></a>
                    }

                    {esVendedor &&
                    <a href={`/modificarproducto/${id}`} className="product-nav-button modificar">Modificar</a>
                    }

                    <a href={`/productos/producto/${id}`} className="product-nav-button detalles">Ver Detalles</a>
                </div>
            </div>
          </div>
    );

}
//<br></br><label>Calificación: {data.calificacion.toFixed(1)}</label>
export default CardProduct;