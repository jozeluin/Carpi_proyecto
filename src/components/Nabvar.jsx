import React from "react";
import { Link } from "react-router-dom";

const Nabvar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo"><h1>Carpichop</h1></Link>
      <ul className="menu">
        <li><Link className="menu-link" to="/"> Inicio</Link></li>
        <li><Link className="menu-link" to="/productos">Productos</Link></li>
        <li><Link className="menu-link" to="/productos/medias">Medias</Link></li>
        <li><Link className="menu-link" to="/productos/pantalones">Pantalones</Link></li>
        <li><Link className="menu-link" to="/productos/remeras">Remeras</Link></li>
        <li><Link className="menu-link" to="/productos/buzos">Buzo</Link></li>
        <li><Link className="menu-link" to="/nosotros">Nosotros</Link></li>
      </ul>
    </nav>
  );
};

export default Nabvar;
