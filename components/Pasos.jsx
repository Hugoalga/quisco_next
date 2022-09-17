import {useRouter} from 'next/router';
import useQuiosco from '../hooks/useQuiosco';


const pasos = [
    {paso: 1, nombre: "Menú", url: "/"},
    {paso: 2, nombre: "Resumen", url: "/Resumen"},
    {paso: 3, nombre: "Datos y Total", url: "/Total"},
]

const Pasos = () => {

  //instancia del componente router de next
  const router = useRouter();

  //extraer datos del estado global
  const {handleChangePaso} = useQuiosco();

  //funcion para calcular el progreso del pedido
  const calcularProgreso = () => {
     let valor;

     if(router.pathname === "/"){
      valor = 10;
     } else if(router.pathname === "/Resumen"){
        valor = 50;
     } else{
      valor = 100;
     }

     console.log(router.pathname);
     return valor;
  }



  return (
    <>
        <div className="flex justify-between mb-5">
           { pasos.map((paso) => (
                <button 
                  className = "text-2xl font-bold"
                  key = {paso.paso}
                  onClick = {() => {
                    router.push(paso.url)
                    handleChangePaso(paso.paso)
                  }}
                >
                    {paso.nombre}
                </button>
            ))}
        </div>

        <div className='bg-gray-100 mb-10'>
          <div 
            className=' rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-20'
            style={{width: `${calcularProgreso()}%`}}
          >
          </div>
        </div>
    </>
  )
}

export default Pasos
