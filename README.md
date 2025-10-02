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

## Item ##

Aqui diseñaremos que informacion indiviual mostramos de cada objeto del array. Tenemos que destacar que en el componente "a", colocamos un añadido para la direccion web, es decir a la direccion actual le agregamos lo de dentro del href.

## ItemDetailContainer ##

Aqui colocaremos los detalles de cada producto. Necesitaremos una funcion axiliar dentro de la carpeta "helpers", que nos proporcione una los datos de un producto en concreto,"PedirItemPorId"

> **PedirItemPorId**  
> Aqui utilizamos una promesa y el comando find, el pasamos por props el id y 
> lo comparamos con el data.json. Si consigue el item en el if se resulve la promesa

Volvemoa al ItemDetailContainer y con ya el item actualizado se lo damos a un nuevo componente, ItemDetail

## ItemDetail ##
Aqui y mostramos todos los conceptos del item

Vamos a dar un repaso del todo el programa

1. App.jsx -> ItemDetailContainer con props=itemId
2. ItemDetailContainer -> pedirItemPorId(itemId)->Buscamos el item y lo pasamos->ItemDetail props=item
3. ItemDetail -> Mostramos detalle item

Ahora lo que haremos en la siguiente clase es que dentro de la lista de productos que muestra ItemLisContainer, al darle click en ver mas, nos lleve a ItemDetailContainer. Ahora al final al descomentar los dos componentes dentro de App.jsx. En la pantalla se vera toda la lista y al final el detalle del producto con itemId=2.

En la siguiente rama veremos tambien el routeo, la forma de navegar entre paginas sin tener que recargar la pagina, usando routeDom.


