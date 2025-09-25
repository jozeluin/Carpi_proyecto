import "./App.css";
import { Usuario } from "./components/Usuario";

function App() {
  return (
    <div>
      <Usuario nombre="Carpi" edad={34} nacionalidad="Argentina" />
      <Usuario nombre="Maria" edad={19} nacionalidad="Española" />
    </div>
  );
}

export default App;
