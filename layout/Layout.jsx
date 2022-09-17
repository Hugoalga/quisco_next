import Head from "next/head";
import Sidebar from "../components/Sidebar";
import {ToastContainer} from 'react-toastify'
import Modal from "react-modal";
import useQuiosco from "../hooks/useQuiosco";
import ModalProducto from "../components/ModalProducto";
import "react-toastify/dist/ReactToastify.css"
import Pasos from "../components/Pasos";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    },
};

Modal.setAppElement("#__next");

const Layout = ({children,pagina}) => {

    const {modal} = useQuiosco();

  return (
    <>
        <Head>
            <title>Café - {pagina}</title>
            <meta name="description" content="Quisco cafetería" />
        </Head>

        <div className="md:flex">
            {/* barra lateral */}
            <aside className="md:w-4/12 xl:w-1/4">
                <Sidebar/>
            </aside>
            {/* contenido de la app */}
            <main className="md:w-8/12 xl:w-3/4 h-screen overflow-y-scroll">
                <div className="p-10">
                    {/* BARRA DE PROGRESO */}
                    <Pasos/>
                    {/* productos */}
                    {children}
                </div>

            </main>
        </div>

        {modal && (
            <Modal isOpen={modal} style={customStyles}>
               <ModalProducto/>
            </Modal>
        )}

        <ToastContainer/>

    </>
  )
}

export default Layout