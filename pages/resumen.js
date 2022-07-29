import Layout from "../layout/Layout";
import useKiosko from "../hooks/useKiosko";
import ResumenProducto from "../components/ResumenProducto";
import { formatearDinero } from "../helpers";

export default function Resumen() {
    
    const {pedido, total} = useKiosko();
    
    return (
        <Layout pagina='resumen'>
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu pedido</p>

            {pedido.length === 0 ? (
                <p className="text-center text-2xl">No ha realizado un pedido aún</p>
            ) : (
                pedido.map( producto => (
                    
                    <ResumenProducto 
                        key={producto.id}
                        producto={producto}
                    />
                    
                ))
            )}

            <p className="text-2xl">Total a Pagar: {''} <span className="font-bold">{formatearDinero(total)}</span></p>
        </Layout>
    )
}