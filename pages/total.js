import { useEffect, useCallback } from "react";
import Layout from "../layout/Layout"
import useKiosko from "../hooks/useKiosko";
import { formatearDinero } from "../helpers";

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useKiosko();

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3;  
    }, [pedido, nombre])

    useEffect(() => {
      comprobarPedido();
    }, [pedido, comprobarPedido])
    

    return (
        <Layout pagina='Total y Confirmar pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label 
                        className="block uppercase text-slate-800 font-bold text-xl"
                        htmlFor="nombre"
                    >
                        Nombre
                    </label>

                    <input 
                        id="nombre"
                        type='text'
                        placeholder="Nombre"
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a Pagar: {''} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>

                <div className="mt-5">
                    <input 
                        disabled={comprobarPedido()}
                        type='submit'
                        className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} text-center w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white hover:cursor-pointer`}
                        value="Confirmar Pedido"
                    />
                </div>
            </form>
        </Layout>
    )
}