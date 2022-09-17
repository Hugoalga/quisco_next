import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import {formatearDinero} from '../helpers/index'
import { useEffect, useState } from "react";

const ModalProducto = () => {

    //estraer elementos de el estado global
    const {productoItem,handleCambioModal,handlePedido,pedido} = useQuiosco();

    // estado para almacenar la cantidad de productos
    const [cantidad,setCantidad] = useState(1);

    //estado para actulizar el producto
    const [edicion,setEdicion] = useState(false);

    useEffect(() => {
         //comprobar si el prodcuto en modal esta en el pedido
    if(pedido.some(item => item.id === productoItem.id)){
        //almacenamos el producto en una variable
        const productoActualizado = pedido.find( (product) => product.id === productoItem.id);
        // console.log(productoActualizado);
        setCantidad(productoActualizado.cantidad)
        setEdicion(true)
    }
    },[productoItem,pedido ])


  return (
    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <Image 
                    width={300}
                    height={350}
                    alt={`imagen producto ${productoItem.nombre}`}
                    src={`/assets/img/${productoItem.imagen}.jpg`}
            />
        </div>

        <div className="md:w-2/3">
            {/* icono para cerrar modal */}
            <div className="flex justify-end">
                <button
                    onClick={() => handleCambioModal()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                
            </div>

            <h1 className="mt-5 font-black text-3xl">{productoItem.nombre}</h1>
            <p className="mt-5 font-black text-5xl text-amber-500">
                {formatearDinero(productoItem.precio)}
            </p>


            {/* div de los botones para calcular la cantidad */}
            <div className="flex gap-4 mt-5">
                <button
                    type="button"
                    onClick={() => {
                        if(cantidad <= 1){
                            return
                        }
                        setCantidad( cantidad -1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

                  <p className="text-3xl">{cantidad}</p>  

                <button
                    type="button"
                    onClick={() => {
                        if(cantidad >= 5){
                            return
                        }
                        setCantidad( cantidad + 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>
            </div>

            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 text-white font-bold rounded mt-5"
                onClick={() => handlePedido({...productoItem,cantidad})}
            >
                {edicion ? "Guardar cambios" : " Añadir al pedido"}
               
            </button>
        </div>
        
    </div>
  )
}

export default ModalProducto