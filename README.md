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

Tambien le hemos agregado el estado.....11:00
