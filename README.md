# Context y LocalStorage #

Vamos a crear el carrito con todas sus funcionalidades. Este carrito tendra que tener un estado global para que desde cada uno de los articulos se pueda acceder. Para ello utlizaremos "context", a traves de el le podremos pasar funcionalidades a cada elemento que lo necesite, envolvera a la aplicacion.

Creamos una nueva carpeta src/context y dentro el nuevo componente CartContext.jsx.
CartContext.jsx:
~~~~

export const CartContext = createContext();
~~~~

Despues en App.jsx, envolvemos la aplicacion con ese componente pero ademas hay que colocar ".Provider".
Ademas tenemos que crear un estado.
App.jsx
~~~~

function App() {

  const [carrito, setCarrito] = useState([]);

  return (
    <div>
      <CartContext.Provider>
     
      <BrowserRouter>
        <Nabvar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer/>} />
           <Route path="/productos/" element={<ItemListContainer />} />
          <Route path="/productos/:categoria" element={<ItemListContainer />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      
      </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}
~~~~

Ahora como hacemos para compartir toda la informacion, mediante una comando del Provider, "value":

~~~~
const user = "Carpi";
const edad = 27;
return (
‹div›
  ‹CartContext. Provider value={user}>
    < BrowserRouter>
~~~~
Ahora user ya se puede compartir, y como lo utlizo:


Por ejemplo en ItemDetail.jsx:
~~~~
const ItemDetail = ( {item) ) => {
const user = useContext (CartContext);
console. log(user) ;
~~~~
Se imprimiria en consola el nombre de user.

Provider Value, solo puede pasar una propiedad. Por eso se le pasara un objeto con muchas propiedades:

~~~~
App.jsx
<CartContext.Provider value={{user,edad}}>
.
.
.
ItemDetail.jsx
const {user,edad}=useContext(CartContext)//Tambien valdria const user = useContext (CartContext).user;
    console.log("ItemDetail context" , user,edad);
~~~~


Bueno todo esto a sido un ejemplo borramos todo esto. Volvemos a App.jsx, colocamos en el provider "carrito" y "setCarrito".Despues nos vamos a ItemDetail, ya que tenemos que darle funcionalidades al boton "Agregar Carrito". Y recibiran el carrito y el setCarrito.

ItemDetail.jsx
~~~~~~
 const handleAgregar=()=>{
        const itemAgregado={...item, cantidad}
        setCarrito([...carrito, itemAgregado])

    }
~~~~~~
Pero al hacer esto vamos agregando lo que ya esta agregado una y otra vez y eso no es lo que queremos, queremos que se sume la nueva cantidad.

ItemDetail.jsx
~~~~
 const handleAgregar = () => {
    const itemAgregado = { ...item, cantidad };
    const estaEnCarrito=carrito.find((producto) => producto.id === itemAgregado.id)

    if (estaEnCarrito) {
      console.log("El producto ya fue agregado");
    } else {
      console.log("No se encontro el producto");
    }
    setCarrito([...carrito, itemAgregado]);
  };
~~~~
Ahora hace una comprobacion para saber si ya se agrego.

Ahora vamos hacer que sume si ya se agrego:

~~~~
  const handleAgregar = () => {
    const itemAgregado = { ...item, cantidad };

    const nuevoCarrito = [...carrito];
    const estaEnCarrito=nuevoCarrito.find((producto) => producto.id === itemAgregado.id)

    if (estaEnCarrito) {
        estaEnCarrito.cantidad += cantidad;
        setCarrito(nuevoCarrito);
      console.log("El producto ya fue agregado");
    } else {
      console.log("No se encontro el producto");
      setCarrito([...carrito, itemAgregado]);
    }
    
  };
~~~~

Simplificando :
~~~~
.
.
  if (estaEnCarrito) {
      estaEnCarrito.cantidad += cantidad;
    } else {
      nuevoCarrito.push(itemAgregado);
    }
    setCarrito(nuevoCarrito);
  };
~~~~

Como la funcion agregar pertenece masval contexto. Vamos a cambiarla de sitio. La vamos a colocar en App.jsx.
Ahora la logica de agregarALCarrito(le hemos cambiado el nombre de "handleAgregar" por agregarAlCarrito) esta en App.jsx.
Ahy que decir que en ItemDetail, dentro del componente "ItemCount", donde llamamos a "agregarAlCarrito". Esta funcion tiene argumentos y no se puede llamar asi " handleAgregar={(agregarAlCarrito(item, cantidad)}", por que React no te lo permite, lo haremos con una funcion anonima:
ItemDetail.jsx
~~~~
.
.
 <ItemCount
            cantidad={cantidad}
            handleRestar={handleRestar}
            handleSumar={handleSumar}
            handleAgregar={() => agregarAlCarrito(item, cantidad)}
          />
.
.

~~~~

## Creacion de Componente Widget ##

Vamos a mostrar el carrito en un widget. Creamos el componente "CardWidget".
CartWidget.jsx:
~~~~
const CartWidget = () => {
  return (
    <div>
      <Link className="menu-link" to="/carrito">
       Carrito
       <span className="numerito"> 0</span>
      </Link>
    </div>
  );
};

export default CartWidget;
~~~~
Y lo agregamos a la "Navbar.jsx":
~~~~
.
.
<li><CartWidget/></li>
.
.
~~~~
Claro lo que queremos es que cada vez que aumentamos el carrito se vea reflejado.
En App.jsx, creamos una nueva funcion:
~~~~
const cantidadEnCarrito=()=>{
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);//reduce recorre el array y acumula. En este caso acumula la cantidad de productos en el carrito
  }
~~~~
Y  ahora esto lo llamaremos en Cartwidget:
~~~~
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {
  const { cantidadEnCarrito } = useContext(CartContext);
  return (
    <div>
      <Link className="menu-link" to="/carrito">
        Carrito
        <span className="numerito"> {cantidadEnCarrito()}</span>
      </Link>
    </div>
  );
};

export default CartWidget;
~~~~

Ahora lo que necesitamos es que cuando pulsemos carrito nos lleve a una ruta hasta el carrito...27:34.
Vamos a App.jsx y agregamos una nueva "Route" con Carrito, y creamos un nuevo componente llamado carrito. Ese componente mostrara los datos de las cosas que vamos adquiriendo.
Ahora mismo mientras vamos añadiendo cosas al carrito, vamos creando un array. Con ayuda del Cartcontext y useContext, podremos llegar en carrito a ese array.
Y con un .map lo recorreremos:
Carrito.jsx
~~~~
           <div className='container'>
        <h1 className='main-title'>Carrito</h1>
        {
            
            carrito.map((prod)=>(
              <div key={prod.id}>
                  <h2>{prod.titulo}</h2>
                  <p>Precio unit: ${prod.precio}</p>
                  <p>Precio total: ${prod.precio * prod.cantidad}</p>
                  <p>Cant:{prod.cantidad}</p>
              </div>
            ))
        }
        </div>
~~~~
Ahora queremos agregar el precio total de todo el carrito. Antes para ello crearemos una funcion en App.jsx para ese cometido:
App.jsx:
~~~~
 const precioTotal = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0); //acumula el precio total del carrito
  }

  return (
    <div>
      <CartContext.Provider
        value={{ carrito, agregarAlCarrito, cantidadEnCarrito, precioTotal }}
      >
~~~~
Y se lo agregamos a nuestro cartContext. Una vez en Carrito.jsx. Se lo agregamos a nuestra destructuracion de useContext y ya lo podemos utilizar en cualquier parte de Carrito.jsx.
Carrito.jsx:
~~~~
.
.

const Carrito = () => {
    const {carrito,precioTotal}=useContext(CartContext)
.
.
       </div>
            ))
        }
        <h2>Precio Totatl:${precioTotal()}</h2>
        </div>
  )

~~~~
Ten encuenta que si no colocas "${precioTotal()}" con parentesis, la funcion no se ejecutara.

Ahora vamos agregar un boton para vaciarCarrito, debajo del precio Total. La funcion estara en App.jsx y tambien se la pasaremos a traves del CartContext. El onclick del boton actuara una funcion que a su vez actuara a vaciarCarrito.
Ademas agregamos una pequeña logica para que solo se visualize el precio total, solo si hemos cogido algo.
Carrito.jsx:
~~~~
const Carrito = () => {
  const { carrito, precioTotal,vaciarCarrito } = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito();
  }
  return (
    <div className="container">
      <h1 className="main-title">Carrito</h1>
      {carrito.map((prod) => (
        <div key={prod.id}>
          <h2>{prod.titulo}</h2>
          <p>Precio unit: ${prod.precio}</p>
          <p>Precio total: ${prod.precio * prod.cantidad}</p>
          <p>Cant:{prod.cantidad}</p>
          <br />
        </div>
      ))}

        {
        carrito.length > 0 ?
        <>
        <h2>Precio Total: ${precioTotal()}</h2>
        <button onClick={handleVaciar}>Vaciar</button>
        </>:
        <h2>No hay productos en el carrito :( </h2>
        
      }
    </div>
  );
};

export default Carrito;

~~~~

## Centralizando todo el contexto ##

Nuestro CartContext.jsx esta vacio, tenemos que utilizarlo y todo nuestro CartContext lo tenemos que llevar alli. Todo lo que havia desde el principio hasta el return en la App.jsx, pasa a CartContext . 
Entonces con todo eso, creamos un componente CarProvider con un argumento "chidren".
Mas abajo en el return devolvemos ese componente con todos sus argumentos (como antes, cuando se llamaba CarContext), y en medio del principio y el final del componente, colocamos "{children}". Depues en App.jsx
envolvemos el resto de componentes con el compoente "CartProvider". 
Lo que conseguimos con "children" es que todo lo que ponemos dentro de "CartProvider" actue como su children.

De esta manera hemos centralizado todo el CartContext

## LocalStorage 
Para que al actualizar no se borre todo.
Creamos En CartContext.jsx, "carritoInicial", el cual busca un item de "carrito", si no hubiera colocaria una array vacio.
CartContext.jsx
~~~~
const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];
~~~~

Despues creamos un "useEffect", que cuando se monte o cambie el estado del carrito, se guarde un item denominado "carrito" que contenga el interior del array carrito
~~~~
 useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);    
~~~~
Si vamos a inspeccionar, en almacenamiento local, (dentro de aplicacion), podremos ver como se guarda y aunque se actualize, no se borra la info.