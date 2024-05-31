import "./ConsultarProductos.css"

const ComprarProd = ({data}) =>
{
    console.log(data)
    async function sendFormData(formData) {
        await fetch(`/api/comprar/agregar`, {
          method: 'POST',
          body: formData
        })
        .then((response) => response.json())
      }

    //Submit
    async function submitHandler(event){
        event.preventDefault();
        const form = event.target;

        const total = form.cantidad.value * data.costo;
        const unidades = form.cantidad.value;

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');

        const fecha = `${year}-${month}-${day}`;
        
        let formData = new FormData()
        formData.append('id_producto', data.id_producto)
        formData.append('id_vendedor', data.id_vendedor)
        formData.append("unidades", unidades)
        formData.append('total', total)
        formData.append('fecha', fecha)

        await sendFormData(formData);

        window.location.reload();
    }
    if(data.unidades <= 0)
    {
        return <h3>Agotado</h3>
    }
    return(
        <form onSubmit={submitHandler} className="prod-buy">
            <button type="submit">Comprar</button>
            <input type="number" min={1} max={data.unidades} name="cantidad" className="prod-cantidad" placeholder="1" required></input>
        </form>
    );
}

export default ComprarProd;