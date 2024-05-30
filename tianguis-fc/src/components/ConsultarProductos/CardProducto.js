
import "./ConsultarProductos.css";

const CardProduct = ({data, id, esVendedor}) =>
{
    let calificacion = ""

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
                <div></div>
            </div>
            <div className="product-info-panel">

                <div className="product-info">
                    <label className="product-name">Nombre del producto</label>
                    <label>Vendedor: {data.vendedor}</label>
                    <label><label className="producto-calificacion">{calificacion}</label> ({data.calificacion.toFixed(1)})</label>
                    <label>{data.unidades} Unidades</label>
                    <label>${data.precio} MXN</label>
                </div>
                <div className="product-buttons">
                    <a href={`/productos/producto/${id}`} className="product-nav-button detalles">Ver Detalles</a>
                    {esVendedor?
                        <a href="" className="product-nav-button modificar">Modificar</a>
                        :
                        <a href="" className="product-nav-button resenar">Reseñar</a>
                    }
                    {esVendedor?
                        <a href="" className="product-nav-button eliminar">Eliminar</a>
                        :
                        <a href="" className="product-nav-button comprar"><b>Comprar</b></a>
                    }
                </div>
            </div>
          </div>
    );

}
//<br></br><label>Calificación: {data.calificacion.toFixed(1)}</label>
export default CardProduct;