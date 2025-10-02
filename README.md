# Proyecto tienda

Empezamos creando carpetas de components, data y helpers. En data tenemos el .json con los productos y en helpers colocaremos funciones de ayuda, como por ejemoplo las funciones de lectura del json.

## NavBar

Vamos a crear un componente Navbar. Que es una nav, una barra como de herramientas en la parte superior de la pantalla. Hemos copiado su hoja de estilos, es la App.css.
Le hemos colocado unos direccionamientos a pag web que por ahora estan vacios.

## Conseguir datos del data .json

Ahora vamos a crear una funcion en helpers para porder coger la informacion del .json. Creamos la funcion pediDatos.js, su funcion base sera una promesa, que rescata los datos del .json. Utilizamos una delay, retrasa los milisengundos que digamos la ejecucion del "resolve(data)"

## Contenedor de listado de productos

Creamos "ItemListContainer", colocamos un useEffecta para que solo se llame una vez a "pedirdatos", que es una promesa y se resuelve correctamente, con el set cambiara el estado y llenara el array de productos.
Ahora queremos llevar esos datos a otro componente para que se muestren.

## Listado productos

Ahora crearemos ItemList, el cual le pasaremos como prop el array con los productos, esta funcion recorrera el array con un .map, y le pondra un titulo.
Entoncen entregara al siguiente componente cada objeto del array de manera indivual. El siguiente componente sera el item.

## Item

Aqui diseñaremos que informacion indiviual mostramos de cada objeto del array
