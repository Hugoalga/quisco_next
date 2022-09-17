import Image from "next/image";
import {formatearDinero} from "../helpers/index"
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({producto}) => {

  const {handlesetProductoItem,handleCambioModal} = useQuiosco();

  const {nombre, precio, imagen} = producto;

  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen platillo ${nombre}`}
        width={300}
        height={300}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <button
          type="button" className="bg-indigo-600 hover:bg-indigo-900 text-white w-full mt-5 p-3 font-bold"
          onClick={() => {
            handlesetProductoItem(producto)
            handleCambioModal()
          }}
        >
          Agregar
        </button>
      </div>

    </div>
  )
} 

export default Producto

