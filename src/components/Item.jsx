
import { Link } from "react-router-dom";

const Item = ({ producto }) => {
  return (
    <div className="producto">
      <img src={producto.imagen} />
      <div>
        <h4>{producto.titulo}</h4>
        <p>Precion:${producto.precio}</p>
        <p>Categoria:{producto.categoria}</p>
        <Link className="ver-mas" to={`/item/${producto.id}`}>Ver mas</Link>
      </div>
    </div>
  );
};

export default Item;
