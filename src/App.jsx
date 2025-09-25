import "./App.css";
import { Card } from "./components/Card/Card";
import { Usuario } from "./components/Usuario/Usuario";

function App() {
  return (
    <div>
      <Usuario nombre="Carpi" edad={34} nacionalidad="Argentina" />
      <Usuario nombre="Maria" edad={19} nacionalidad="Española" />
      <Card />
    </div>
  );
}

export default App;
