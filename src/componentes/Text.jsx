import { useState } from "react";

const Text = () => {
  const [show, setShow] = useState(true);

  function handleShow() {
    setShow(!show);
    
  }
  return (
    <div>
      <button onClick={handleShow}>{show === true ? "Ocultar":"Mostrar"}</button>
      {show === true ? <h2>Hola Mundo</h2>:null}
      {/* {show && <h2>Hola Mundo</h2>} */}
    </div>
  );
};

export default Text;
