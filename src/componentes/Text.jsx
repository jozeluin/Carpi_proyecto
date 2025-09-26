import { useState } from "react";
import TextH2 from "./TextH2";

const Text = () => {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
    
  }
  return (
    <div>
      <button onClick={handleShow}>{show === true ? "Ocultar":"Mostrar"}</button>
      {/* {show === true ? <h2>Hola Mundo</h2>:null} */}
      {show && <TextH2/>}
      <hr />
    </div>
  );
};

export default Text;
