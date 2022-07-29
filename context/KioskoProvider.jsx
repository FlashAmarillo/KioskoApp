import {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useRouter} from 'next/router';

const KioskoContext = createContext();

const KioskoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter();

    const obtenerCategorias = async () => {
        
        const { data } = await axios('/api/categorias');
        setCategorias(data);
    }

    // Los useEffect se ejecutan en el orden en el que los defines
    useEffect(() => {
        obtenerCategorias();
    }, [])

    useEffect(() => {
        //señala la categoria por default
      setCategoriaActual(categorias[0]);
    }, [categorias])

    useEffect(() => {
      const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
      setTotal(nuevoTotal);
    }, [pedido])
    
    

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter( cat => cat.id === id)
        setCategoriaActual(categoria[0]);
        router.push('/');
    }

    // funcion para setear el producto
    const handleSetProducto = producto => {
        setProducto(producto);
    }

    // funcion para activar o desactivar el modal
    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        //comrprobar si el producto que agregamos esta en el state
        if(pedido.some(productoState => productoState.id === producto.id)) {
            // actualicar la cantidad del producto en el state
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado);
            toast.success('🦄 Guardado Correctamente!')
        } else {
            // Si el producto no existe se agrega al state
            setPedido([...pedido,producto]);
            toast.success('🦄 Agregado al pedido!')
        }

        //cerrar el modal una vez que se ha añadido/editado el pedido
        setModal(false);
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0]);
        setModal(!modal);
    }

    const handleEliminarProducto = id => {
        const productoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(productoActualizado);
    }

    const colocarOrden = async (e) => {
        e.preventDefault();
        
        try {
            
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()});

            // Resetear la App
            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre('');
            setTotal(0);

            toast.success('Pedido Realizado Correctamente');

            setInterval(() => {
                router.push('/');
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KioskoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidad,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </KioskoContext.Provider>
    )
}

export {
    KioskoProvider
}

export default KioskoContext;