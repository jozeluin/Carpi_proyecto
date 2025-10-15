# Firebase
Vamos a ver como se trabaja con Firebase, en particular con Firestore.

Primero tenemos que ir aqui Firebase: https://firebase.google.com. Dentro buscamos "empezar ahora". Y le damos a crear Proyecto, le damos un nombre.
 En este caso hemos puesto lo mismo que carpi, "CarpiShop", y quitamos por ahora las herramientas de "analitics". Le damos a crear proyecto.
 Una vez que haya terminado , en compilacion le damos a Firestore database, lo que vamos a utilizar. Creamos la base de datos, todo lo cojemos por defecto y lo unico que elegimos es que sea en modo de prueba. Una vez que se haya creado, lo primero que hacemos es en reglas cambiar la fecha de caducidad de la base de datos, y publicamos.
 Volvemos a datos y vamos a empezar a crear nuestra base de datos. Tenemos que pensar que tenemos que crear la base de datos que teniamos en formato .json.
 
 Ahora la haremos a mano, tendremos que crear  uno a uno los registros. Mas adelante veremos una manera mas automatica para cargar todo esto.

 Colecciones == Array    Documentos == cada objeto del Array

 La coleccion la llamaremos productos, una vez que lo indiquemos nos dira que vayamos introducciendo documentos (objetos del array, o registros).
 Pulsamos a id automatico, y vamos introduciendo los titulos de campo, con su tipo de dato y el dato.

 Una vez que hemos pasado nuestro documentos .json a firebase, vamos a ver como conectamos firebase con nuestra  App web.
 Pulsamos en la casita de inicio, y pulsamos a crear app, y despues a sitio web.
 Le damos un nombre a nuestra app, le damos CarpiShop Web, no pulsamos firebase hosting y si pulsamos a registrar app. Alli primero tenemos que instalar las dependencias de firebase en nuestro proyecto, lo podemos hacer mediante npm o sript y despues tenemos que poner un codigo en nuestro proyecto.
 Creamos una carpeta y un archivo: src/firebase/config.js.

 Una vez que hemos instalado firebase podemos utlizar unas serie de funciones que nos da.  Ahora tenemos que pegar el codigo que nos ofrece dentro de config.js.ESe archivo nos trae toda la configuracion de nuestro proyecto que creamos de firebase.

 Dentro de config.js, importamos "getFirestore", para poder rescatar nuestra base de datos de firestore. Creamos una constante para poder recuperar la info:
 config.js:
 ~~~~
    export const db = getFirestore(app);
 ~~~~

Apartir de ahora, esa constante es la que va a representar nuestra base de datos.

## Usar los datos de la base de datos

Nos vamos a "ItemListContainer", y el useEffetct borramos sus interior, dejando solo el par de cochetes con categoria, para que cambie si cambia el estado de categoria. Despues tenemos que importar unas cosas. 
- Primero importamos  "collection", ya que de la base de datos "db" nos interesa una coleccion en particular, si hubiera mas podriamos elegir cual. Aunque en nuestro caso solo hay una. Despues tambien importamos "db".

Para crear la referencia a la colecion:
ItemListContainer.jsx
~~~~
const productosRef = collection(db, "productos");//db es la base de datos, y "productos" es la coleccion que queremos
~~~~
Ahora hay que hacer un pedido asiscronico a firestore para que nos traiga la informacion de la base de datos de esta collecion  en particular. Para eso importamos tambien "getDocs" que lo que hacer es traernos los documentos de la coleccion que le pidamos.
ItemListContainer.jsx
~~~~
  useEffect(() => {
    const productosRef = collection(db, "productos"); //db es la base de datos, y "productos" es la coleccion que queremos
    getDocs(productosRef).then((res) => {//es una promesa
      console.log(res);
    });
  }, [categoria]);
~~~~
Comprobamos en consola que nos devuelve. Nos sale una respuesta pero lleva mucha informacion, le agregamos al console.log lo siguiente:
console.log(res.doc). Y lo que nos devuelve es una array de objetos pero que todavia no es lo que buscamos.

Como el id es una cosa que esta a parte de la informacion, sin colocamos  console.log(res.docs[0].id), nos saldra el primer id,
y si depues colocamos  console.log(res.docs[0].data()), ya nos saldra la informacion del primer registro.

Entonces el id y la data no estan juntos en cada registro. Para juntarlos haremos lo siguiente:
~~~~
  useEffect(() => {
    const productosRef = collection(db, "productos"); //db es la base de datos, y "productos" es la coleccion que queremos
    getDocs(productosRef).then((resp) => {//es una promesa

      console.log(

        resp.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } //id es el id del documento y data es el contenido del documento
        }) 

      )
      
    });
  }, [categoria]);
~~~~
Con este return "return { id: doc.id, ...doc.data() }", juntamos cada registro con su id. Cuando comprobamos por consola que ya funciona. Cambiamos el console.log por setProductos, para que cambie el estado. Y ya funcionaria, ya estamos recuperando informacion de firebase.

Ahora ya sale la lista de productos. Ahora vamos hacer algo parecido en itemDetailContainer.jsx, borraremos el interior primario del useEffect. Una diferencia es que esta vez solo queremos recuperar un producto, para ello vamos a importar cosas diferentes. Necesitaremos "doc y getDoc". Despues todo lo demas es parecido

ItemDetailContainer.jsx
~~~~
import React, { useEffect, useState } from "react";
// import { pedirItemPorId } from "../helpers/pedirDatos";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const id = useParams().id;
  console.log("ItemDetailContainer",id);

  useEffect(() => {
    // pedirItemPorId(Number(id))
    //   .then((res) => {
    //   setItem(res);
    // });
    const docRef = doc(db, "productos", id);
    getDoc(docRef).then((resp) => {
      setItem({ id: resp.id, ...resp.data() });
     });
    
  }, [id]);
~~~~

Ahora tenemos un problema, cuando pulsamos en la navbar, no fitra por categorias. Es decir yo doy a pantalones y me sale todo, no me filtra. Y no queremos filtrarlos en nuestra aplicacion. Queremos que lo filtre firebase ya que puede hacer eso.

Vamos a itemListContainer y vamos a importar unos nuevos comandos, query y where. Con esto haremos una consulta para filtrar en un campo concreto lo que estamos buscando que en este caso es la categoria que pulsamos:
ItemListContainer.jsx
~~~~
 const q=query(productosRef, where("categoria","==",categoria)) //trae los productos que tienen la categoria que le pasamos por parametro. Es un consulta
~~~~
Ahora en getDocs si en vez de productoRef colocamos nuestra constante "q", nos devolvera los documentos con esa categoria.

Pero nos producia un error, se ve que al principio categoria esta vacio, entonces la query busca con un undifined. Lo cambiamos y utilizamos una sentencia con ternario para comprobar si categoria esta vacio. Si es asi, colocamos todos los productos.

Ahora ya si damos a las categorias, nos salen lo que hay en cada categoria.