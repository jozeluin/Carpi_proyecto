import "./App.css";
import ItemListContainer from "./components/ItemListContainer";
import Nabvar from "./components/Nabvar";
import ItemDetailContainer from "./components/ItemDetailContainer";



function App() {
  return <div>
    <Nabvar/>
    <ItemListContainer/>
    <ItemDetailContainer itemId={2}/>

    </div>;
}

export default App;
