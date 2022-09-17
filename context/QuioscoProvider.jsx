import axios from 'axios';
import {createContext,useState,useEffect} from 'react';
import { isTemplateExpression } from 'typescript';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';



const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const router = useRouter();

    //estado para las categoria que btenemos de la api
    const [categorias,SetCategorias] = useState([]);

    //estado para almacenar la categoria seleccionada
    const [categoriaActual,setCategoriaActual] = useState({});

    //estado para el producto seleccionado
    const [productoItem, setProductoItem] = useState({});

    //estado para mostrar el modal
    const [modal,setModal] = useState(false);

    //estado para almacenar los datos del pedido
    const [pedido,setPedido] = useState([]);

    //estado para almacenar el progreso del pedido por pasos
    const [paso,setPaso] = useState(1);

    //estado para almacenar el nombre 
    const [nombre,setNombre] = useState('');

    //estado para almacenr el total a pagar
    const [total,setTotal] = useState(0);

    //funcion para actulizar el progrso por los pasos
    const handleChangePaso = (paso) => {
        setPaso(paso);
    }

    //funcion para modificar el estado del pedido
    const handlePedido = ({categoriaId,...producto}) => {
        if(pedido.some((item) => item.id === producto.id)){
            //si el producto ya existe lo actualizamos
            const pedidoActualizado = pedido.map(item => item.id === producto.id ? producto : item)
            setPedido(pedidoActualizado)
            toast.success('Pedido actualizado')
        }else{
            // si el producto no existe se agrega al state
            setPedido([...pedido, producto])
            toast.success('Agregando al pedido');
        }     
        
        setModal(false);
    }


    //funcion para modificar el estado del modal
    const handleCambioModal = () => {
        setModal(!modal);
    }

    //funcion para setear el producto seleccionado
    const handlesetProductoItem = (producto) => {
        setProductoItem(producto);
    }

    //funcion para obtener la categoria
    const handleClickCategoria = (id) => {
        const categoria = categorias.filter((cat) => cat.id === id)
        setCategoriaActual(categoria[0]);
        router.push("/");
    }

    //conexion a la api para extraer categorias
    const obtenerCategorias = async () => {
        try {
            const {data} = await axios('/api/categorias');
            SetCategorias(data);
            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    }
   
    //se ejecuta una vez para cargar las categorias
    useEffect(() => {
        obtenerCategorias();
    }, [])

    //se ejecuta una vez para cargar una categoria por default
    useEffect(() => {
        setCategoriaActual(categorias[2])
        // obtenerProductos()
    },[categorias])

    //actulización el total de la cuenta
    useEffect(() => {
        const nuevoTotal = pedido.reduce((total,producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    },[pedido])

    //funcion para editar las catidades de un produto en el pedido
    const handleEditarCantidades = (id) => {
        // console.log(id);
        setModal(!modal);
        const productoActualizar  = pedido.filter( producto => producto.id === id)
        setProductoItem(productoActualizar[0])
    }

    // funcion para eliminar productos del pedido
    const handleEliminarProducto = (id) => {
        const pedidoActualizado  = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado);
        
    }

    //funcion para enviar pedido a la bd
    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            //mandar info a la api
            const {data} = await axios.post('/api/ordenes',{pedido, nombre, total, fecha: Date.now().toString()})
            
            //resetear campos de la app despues del pedido

            //mostramos categoria por default
            setCategoriaActual(categorias[0]);
            //borramos los datos del pedido
            setPedido([]);
            //borramos el nombre del cliente
            setNombre('');
            //borramos la cuenta a pagar
            setTotal(0)

            //mensaje de pedido exitoso
            toast.success('Pedido realizado Correctamente')

            //temporizador
            setTimeout(() => {
                //enviar al usuario a la pagina principal
                router.push('/')
            }, 3000)

            
        } catch (error) {
            console.log(error);
        }
      }



    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                productoItem,
                handlesetProductoItem,
                handleCambioModal,
                modal,
                handlePedido,
                pedido,
                handleChangePaso,
                paso,
                handleEditarCantidades,
                handleEliminarProducto,
                setNombre,
                nombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export{
    QuioscoProvider
}

export default QuioscoContext


