# Firebase II
Vamos hacer que el cliente pueda hacer un pedido y subirlo a la base de datos. En la otra rama utilizamos los metodos getDocs y getDoc. Para conseguir todos los documentos o un solo documento. En esta ocasion lo que vamos a hacer es subir un documento a la base de datos mediant el comando addDoc.

## Vamos a crear una pagina chekout para que el cliente pueda finalizar la compra.

1. Primero tenemos que crear la coleccion, llamada "pedidos", en firebase. Tendremos que rellenarla por lo menos con  un documento y despues lo borramos dejandola vacia.

2. Despues vamos a crear un nuevo componete "Chekout". Despues de crearlo nos vamos a App.jsx, y creamos su ruta al    componente.

3. Como queremos que salga en la pantalla de carrito, que es donde se van guardando las cosas que vamos comprando.
  En el componente carrito.jsx.Despues del boton vaciar colocamos el Link, de router-dom, que nos lleva a la pantalla Chekout(nos mostrara el componente Chekout).

4. Despues como en carrito, tambien aqui vamos a necesitar las variables carrito, precioTotal y vaciarCarrito de useContext(CartContext), lo copiamos.

5. Como necesitamos tambien un formulario vamos a copiar casi todo el componente de contacto.jsx, dentro tambien de chekout:
Chekout.jsx
~~~~
    <div className="container">
      <h1 className="main-title">Contacto</h1>
      <form className="formulario" onSubmit={handleSubmit(enviar)}>

        <input type="text"placeholder="Ingresa tu nombre" {...register("nombre")}/>
        <input type="email" placeholder="Ingresa tu email"{...register("email")}/>
        <input type="telefono" placeholder="Ingresa tu telefono"{...register("telefono")}/>

        <button className="enviar" type="submit">
          Enviar
        </button>
      </form>
    </div>
~~~~
Hemos cambiado un poco los nombres para que se ajusten a su cometido. Si  corremos el programa, elegimos algun producto y en carrito nos vamos a finalizar compra, y despues rellenamos el formulario y le damos a comprar.
Al revisa la consola vemos que generamos el objeto. Eso sera lo que enviemos.

## Enviando el objeto
Tendremos que importar en Chekout.jsx, collection,addDoc y la db que es la base de datos. Ahora generaremos la referencia a esa coleccion.
~~~~
const Chekout = () => {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
  const { register, handleSubmit } = useForm();

  const comprar = (data) => {
    const pedido = {
      cliente: data,
      productos: carrito,
      total: precioTotal(),
    };
    console.log(pedido);
    const pedidosRef = collection(db, "pedidos");// referencia a la coleccion
    addDoc(pedidosRef, pedido)//agrega un nuevo documento a la coleccion

}
~~~~
Ahora si comprobamos en Firebase podremos comprobar que hemos subido el pedido a su coleccion.
Cada vez que le de a comprar se volvera a colocar ese documento a la coleccion pero con diferente id.S
Se pude recuperar de una manera muy facil ese id.
~~~~
  const comprar = (data) => {
    const pedido = {
      cliente: data,
      productos: carrito,
      total: precioTotal(),
    };
    console.log(pedido);
    const pedidosRef = collection(db, "pedidos");// referencia a la coleccion
    addDoc(pedidosRef, pedido)//agrega un nuevo documento a la coleccion
    .then((doc) => {
        console.log(doc.id);//recuperamos id de ese pedido
    })

}
~~~~
Ahora lo que vamos hacer es que cuando se de a comprar se cambie la pantalla y te diga que muchas gracias por comprar y te enseñe el id. Para ese creamos un estado de id. Que se setea al pulsar comprar .
Simplemete quitamos el console.log y colocamos en su lugar en setPedidoId.
Tenemos que colocar despues de esto la llamada a vaciarCarrito
 Despues con un "if" hacemos una comprobacion si "pedidoId" existe nos saldra otra pantalla, la de agradecimiento con su numero de id.