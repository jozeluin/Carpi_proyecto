import "./App.css";
import ItemListContainer from "./components/ItemListContainer";
import Nabvar from "./components/Nabvar";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import { useState } from "react";
import { CartContext } from "./context/CartContext";

function App() {

  const [carrito, setCarrito] = useState([]);


  return (

    
    <div>
      <CartContext.Provider value={{carrito,setCarrito}}>
     
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

export default App;
