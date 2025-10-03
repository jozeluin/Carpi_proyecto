# Routing y navegacion #

Primero instalamos lo siguiente "npm install react-router-dom". Si vamos al package.json veremos que esta instalada la dependencia.

Tendremos que importar en la App.jsx lo siguient,"import { BrowserRouter, Route, Routes } from "react-router-dom";.

Nosotros queremos que al pulsar el boton de "ver mas", nos lleve a la pantalla detalles, no como  ahora que se ven los dos componentes a la vez :

~~~~
    <ItemListContainer/>
    <ItemDetailContainer itemId={2}/>
~~~~
Ahora no tenemos configuradas las rutas y eso es lo que vamos a hacer. Tendremos una pagina con el "ItemListContainer" y otra con el "ItemDetailContainer".

Tendremos que encerrar toda nuestra app, nuestros componentes, con el "BrowerRouter" y colocando el elemento Routes y Route, quedando:

~~~~
    <BrowserRouter>
        <Nabvar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/item" element={<ItemDetailContainer itemId={2} />} />
        </Routes>
      </BrowserRouter>
~~~~
EL que tienen la barra "/" es la pagina inicial, a nosotro nos aparecera al colocar la direccion web del localhost sin nada asi "localhost:5173" o "http://localhost:5173/" y la de detalle al colocar "http://localhost:5173/item/" o "localhost:5173/item/".

Ahora vamos a crear otro componente llamado "Nosostros" y se lo vamos a agregar:

~~~~
import React from 'react'

const Nosotros = () => {
  return (
    <h1>Nosotros</h1>
  )
}

export default Nosotros
~~~~

App.jsx:
~~~~
    <Route path="/" element={<ItemListContainer />} />
    <Route path="/item" element={<ItemDetailContainer itemId={2} />} />
    <Route path="/nosotros" element={<Nosotros />} />
~~~~

AL haver colocado la navbar fuera pero dentro del BrowserRouter, el navbar aparecera en todas las paginas. Tambien podriamos colocar un footer. Aunque hay maneras que estos elementos no salgan si se quiere aunque no lo vamos a ver.

Ahora vamos a ver como podemos ir de pagina en pagina si tener que navegar mediante el navegador ni recargar la pagina cada vez.

Para empezar podriamos hacer que el navbar Funcione.

## Navbar Funcional ##

Hacemos los siguienes cambios en el comoponente navbar:

~~~~
 <nav className="navbar">
      <a href="#" className="logo"><h1>Carpichop</h1></a>
      <ul className="menu">
        <li><a className="menu-link" href="/"> Inicio</a></li>
        <li><a className="menu-link" href="nosotros">Nosotros</a></li>
        <li><a className="menu-link" href="#">Productos</a></li>
        <li><a className="menu-link" href="#">Contacto</a></li>
      </ul>
    </nav>
~~~~

Ya podemos navegar aunque sea a "inicio" y a "nosotros". Vemos que al pulsar se navega entre esas paginas recargando la pagina.
Aunque nosotro no queremos que se recargen de esa manera, ese va ser nuestro nuevo cambio. 
Para ello utilizaremos un nuevo componente llamado "Link" en vez de las "a", este comoponente lo proporciona react-router-dom:

~~~~
  <nav className="navbar">
      <Link to="/" className="logo"><h1>Carpichop</h1></to>
      <ul className="menu">
        <li><Link className="menu-link" to="/"> Inicio</Link></li>
        <li><Link className="menu-link" to="nosotros">Nosotros</Link></li>
        <li><Link className="menu-link" to="#">Productos</Link></li>
        <li><Link className="menu-link" to="#">Contacto</Link></li>
      </ul>
    </nav>
~~~~

Como vemos tambien tenemos que cambiar los "href" por los "to". Ahora ya no se recarga la pagina.

Tambien en el Item.jsx, lo modificamos:
~~~~
<div>
        <h4>{producto.titulo}</h4>
        <p>Precion:${producto.precio}</p>
        <p>Categoria:{producto.categoria}</p>
        <Link className="ver-mas" to={`/item/`}>Ver mas</Link> // Colocamos Link y to={`/item/`}
      </div>
~~~~
El "to" dejamos asi "/item/", ya que es ruta.