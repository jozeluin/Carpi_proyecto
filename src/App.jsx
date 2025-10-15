import "./App.css";
import ItemListContainer from "./components/ItemListContainer";
import Nabvar from "./components/Nabvar";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import { CartProvider } from "./context/CartContext";
import Carrito from "./components/Carrito";
import Chekout from "./components/Chekout";

function App() {
  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <Nabvar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/productos/" element={<ItemListContainer />} />
            <Route
              path="/productos/:categoria"
              element={<ItemListContainer />}
            />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/chekout" element={<Chekout />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
