import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import { useEffect, useCallback } from "react"; 
import {formatearDinero} from "../helpers/index"


const Total = () => {
  
  const {pedido,nombre, setNombre,colocarOrden,total} = useQuiosco();

  //confirmar si ya tenemos algo en el pedido
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === ""
  },[pedido,nombre]) 

  //disparar la funcion de revisar pedido al agregar el pedido
  useEffect(() => {
    comprobarPedido();
  },[pedido, comprobarPedido]);
 

  return (
    <Layout pagina="Total">
      <h1 className="text-4xl font-black">Total</h1>
      <p className="text-2xl my-10">Confirma tu pedido</p>

    <form onSubmit={colocarOrden}>
      <div>
          <label htmlFor="nombre"
                 className="block uppercase text-slate-800 text-xl font-bold"
          >
            Nombre
          </label>

          <input 
            type="text"
            id="nombre"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 rounded p-2" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-10">
            <p className="text-2xl">
              Total a pagar <span className="font-bold">{formatearDinero(total)}</span>
            </p>
        </div>

        <div className="mt-5">
          <input
            className={`${comprobarPedido() ? "bg-indigo-100" : "bg-indigo-600"}  
            w-full lg:w-auto px-5 py-2 rounded font-bold text-white text-center`}
            value="Confirmar Pedido"
            type="submit"
            disabled={comprobarPedido()}
          />
        </div>

    </form>



   </Layout>
  )
}

export default Total


