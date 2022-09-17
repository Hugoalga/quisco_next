import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import ResumenProductos from "../components/ResumenProductos";

const Resumen = () => {

  const {pedido} = useQuiosco();

  return (
   <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>

      {/* mostra información del pedido */}
      {pedido.length === 0 ?(
        <p> no tienes elementos</p>
      ): (
          pedido.map((producto) => (
              <ResumenProductos
                key={producto.id}
                producto={producto}
              />
          ))
      )}

   </Layout>
  )
}

export default Resumen


