import Image from "next/image";
import { formatearDinero } from '../helpers/index';
import useKiosko from "../hooks/useKiosko";

const ResumenProducto = ({producto}) => {
    const {nombre, precio, cantidad, imagen, id } = producto

    let totalPagar = precio * cantidad;
  
    const {handleEditarCantidad, handleEliminarProducto} = useKiosko();

    return (
    <div className="shadow p-5 mb-3 flex gap-10 items-center">
        <div className="md:w-1/6">
            <Image 
                width={300}
                height={400}
                alt={`Ìmagen producto ${nombre}`}
                src={`/assets/img/${imagen}.jpg`}
            />
        </div>

        <div className="md:w-4/6">
            <h1 className="text-2xl font-bold sm:text-xl">{nombre}</h1>
            <p className="text-xl font-bold mt-2">{`Cantidad: ${cantidad} ${cantidad > 1 ? 'unidades' : 'unidad'}`}</p>
            <p className="text-xl font-bold mt-2 text-amber-500">{`Precio por Unidad: ${formatearDinero(precio)}`}</p>
            <p className="text-base text-gray-700 mt-2">{`Cantidad subtotal a pagar: ${formatearDinero(totalPagar)}`}</p>
        </div>

        <div>
            <button 
                className="bg-sky-700 flex px-5 py-2 gap-2 text-white rounded-md font-bold uppercase shadow-md w-full" 
                type="button"
                onClick={() => handleEditarCantidad(id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
            </button>

            <button 
                className="bg-red-700 gap-2 flex px-5 py-2 mt-3 text-white rounded-md font-bold uppercase shadow-md w-full" 
                type="button"
                onClick={() => handleEliminarProducto(id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
            </button>
        </div>

    </div>
  )
}

export default ResumenProducto