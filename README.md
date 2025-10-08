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
~~~~~
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


Bueno todo esto a sido un ejemplo borramos todo esto. Volvemos a App.jsx, colocamos en el provider "carrito" y "setCarrito".
Despues nos vamos a ItemDetail, ya que tenemos que darle funcionalidades al boton "Agregar Carrito". Y recibiran el carrito y el setCarrito......11:49