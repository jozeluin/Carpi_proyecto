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

Ahora lo que necesitamos es que cuando pulsemos carrito nos lleve a una ruta hasta el carrito...27:34