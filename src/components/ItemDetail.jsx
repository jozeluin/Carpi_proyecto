import React, { useState } from 'react'
import ItemCount from './ItemCount'
import { CartContext } from '../context/CartContext';

const ItemDetail = ({item}) => {
    // const {user,edad}=useContext(CartContext)
    // console.log("ItemDetail context" , user,edad);

    const {carrito,setCarrito}=React.useContext(CartContext)
    console.log("ItemDetail context" , carrito,setCarrito);
    

    const[cantidad, setCantidad] = useState(1)

    const handleRestar=()=>{
        cantidad > 1 && setCantidad(cantidad-1)

    }
    const handleSumar=()=>{
        cantidad < item.stock && setCantidad(cantidad + 1)
    }

    const handleAgregar=()=>{
        console.log("ItemDetail handelAgregar",{...item,Pepito:cantidad});
        
    }
  return (
    <div className='container'>
        <div className='producto-detalle'>
            <img src={item.imagen} alt={item.titulo} />
            <div>
                <h3 className='titulo'>{item.titulo}</h3>
                <p className="descripcion">{item.descripcion}</p>
                <p className="categoria">Categoria: {item.categoria}</p>
                <p className="precio">${item.precio}</p>
                <ItemCount cantidad={cantidad} handleRestar={handleRestar} handleSumar={handleSumar} handleAgregar={handleAgregar}/>
            </div>

        </div>
    </div>
  )
}

export default ItemDetail