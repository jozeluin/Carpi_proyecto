# Eventos

Vamos a profundizar mas en los eventos.

Nosotros en javaScript veniamos trabajando con los adventlisteners, aqui en React trabajamos de otra manera aunque aun se pueden utlizar los adventlisteners

# AdventListeners

Si queremos hacer uno, del objeto windows ,no se pueden hacer directamente en los componentes, lo tendriamos que hacer dentro de una funcion para que afecte a la pantalla.

Vamos a hacer un evento Click que actue cada vez que cliqueamos en la pantalla:

Nosotros.jsx

```
const Nosotros = () => {

 window.addEventListener('click',()=>{
   console.log('Click en la pantalla')
 })
.
.
.

```

Si cuando clicamos en la consola aparecen los clikcs, pero si cambiamos de pantalla tambien cuentan los clics, y ademas si salimos y entramos en diferentes pantallas se van sumando en grupos de 2,3,4 y asi cada vez que entremos y salgamos de diferentes pantallas.
Primero vamos a colocarlo dentro de un "useEffect":

```
const Nosotros = () => {


 useEffect(()=>{
     window.addEventListener('click',()=>{
   console.log('Click en la pantalla')
 })

 },[])
.
.
.

```

Pero no se arregla ya que al entrar se vuelve a montar, previene si se actualiza pero no si se monta. Tenemos que hacer que cuando nos salgamos de la pantalla y se desmonte el componente, se borre el addventListener. PAra ello utilizaremos el "window.removeEventListener", pero para que esto funcione cuando el componente se desmota hay que hacerlo en el return:

```
useEffect(()=>{
      window.addEventListener('click',()=>{
    console.log('Click en la pantalla')
  })

  return () =>{
    window.removeEventListener('click',()=>{
      console.log('Click en la pantalla');
    })
  }

  },[])
```

Despues de esto nos sigue dando el fallo. Ahora mismo estamos trabajando con funciones anonimas ( no por referencia), y aunque se refieran a funciones que se llaman igual, para el sisitema es como si fueran dos funciones completamente diferentes, no se refienren a la misma cosa.

Para solocionar esto tenemos que crear un funcion que se ejecute cuando hacemos click, pero que este llamada como una referencia de este modo:

```
const Nosotros = () => {

  useEffect(()=>{


  const clickear = () =>{
    console.log('Click')
  }

      window.addEventListener('click',clickear)

  return () =>{
    window.removeEventListener('click',clickear)
  }

  },[])
.
.
.
```

## Eventos en componentes

Ahora vamos a colocar en nuestra pantalla "ItemDetail" unos botones para que quitar o agregar cantidad a comprar. Primero vamos a crear un nuevo componente llamado ItemCount. Y lo vamos a colcar al final del ItemDetail.

ItemCount.jsx

```

const ItemCount = () => {

    const[cantidad, setCantidad] = useState(1)

  return (
    <div>
        <div className='item-count'>
            <button>-</button>
            <p>{cantidad}</p>
            <button>+</button>
        </div>
        <button className='agregar-al-carrito'>Agregar al carrito</button>
    </div>
  )
}
```

Tambien le hemos agregado el estado, y ahora le vamos a agregar los onClick y las funciones necesarias.
Exiten dos maneras de hacerlo. Una con funciones anonimas:

Utilizando funciones Anonimas:
~~~~
const ItemCount = () => {

    const[cantidad, setCantidad] = useState(1)

  return (
    <div>
        <div className='item-count'>
           <button onClick={()=>{cantidad >1 && setCantidad(cantidad-1)}}>-</button>// Le colocamos comprobacion de cantidad para no restar menos que 1
            <p>{cantidad}</p>
             <button onClick={()=>{setCantidad(cantidad+1)}}>+</button>
        </div>
        <button className='agregar-al-carrito'>Agregar al carrito</button>
    </div>
  )
}
~~~~

O con funciones normales:

~~~~
const ItemCount = () => {

    const[cantidad, setCantidad] = useState(1)

    const handleRestar=()=>{
        cantidad > 1 && setCantidad(cantidad-1)

    }
    const handleSumar=()=>{
        setCantidad(cantidad + 1)
    }

  return (
    <div>
        <div className='item-count'>
            <button onClick={handleRestar}>-</button>
            <p>{cantidad}</p>
             <button onClick={handleSumar}>+</button>
        </div>
        <button className='agregar-al-carrito'>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount
~~~~

Ahora vamos a hacer que el sistema chekee el stock para saber las prendas que puede llegar a comprar.

Primero hacemos que en "ItemDetail" le pase por props, el item a "ItemCount", una vez alli agregaremos como condicion a la hora de sumar:

~~~~
    const handleSumar=()=>{
        cantidad < item.stock && setCantidad(cantidad + 1)
    }
~~~~

Ahora en vez de pasar el item a itemCount, vamos a hacer que ItemDetail haga toda la logica:
ItemDetail
~~~~
const ItemDetail = ({item}) => {
    const[cantidad, setCantidad] = useState(1)

    const handleRestar=()=>{
        cantidad > 1 && setCantidad(cantidad-1)

    }
    const handleSumar=()=>{
        cantidad < item.stock && setCantidad(cantidad + 1)
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
                <ItemCount cantidad={cantidad} handleRestar={handleRestar} handleSumar={handleSumar}/>
            </div>
            .
            .
            .
~~~~
Le pasamos a ItemCount la cantidad pero ademas le pasamos funciones. El componente hijo recibe funciones como props.

Vamos agregar otra funcion para pasarla a ItemCount, "Agregar". EL onClick estara tambien en ItemCount en el boton Agregar al carrito
, ademas con el "spread operator" vamos a poder agreagar al item la caracteristica de "cantidad".

ItemDetail.jsx
~~~~
.
.
 const handleAgregar=()=>{
        console.log("ItemDetail handelAgregar",{...item,cantidad})
    }
.
.
// Se le podria cambiar el nombre
console.log("ItemDetail handelAgregar",{...item,Pepito:cantidad});
~~~~


