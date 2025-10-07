# Formularios #
## Preparacion ##
 - Primero creamo un nuevo componente, "Contacto". 
 - Creamos en App.jsx, una nueva ruta en el componente navbar para contacto
 - Y dentro de NavBar.jsx, agregamos un nuevo link con contacto.

 Ahora creamos  un formulario dentro de contacto.

 ## 1º Nivel , un estado para cada input ##

 Al darle a enviar vemos que se recarga la pagina con una query en nuestra url de la pagina(?), no queremos eso. Al darle al boton, submit, del formulario se ejecuta el evento submit del formulario. Podemos en el componene form llamar a "Onsubmit" y que se ejecute cierta funcion.

 ~~~~
const Contacto = () => {

    const handleSubmit = (e) => {
        e.preventDefault();//prevenimos que se recargue la pagina
        console.log("Formulario Enviado");
    }
  return (
    <div className='container'>
        <h1 className='main-title'>Contacto</h1>
        <form className='formulario' onSubmit={handleSubmit}> 
            <input type="text" placeholder='Ingresa tu nombre' />
            <input type="email" placeholder='Ingresa tu email' />
            <button className='enviar' type='submit'>Enviar</button>
        </form>
    </div>
  )
}

export default Contacto
 ~~~~
 Aparece enviado pero no podemos capturar la informacion de estos campos. En JavaScript utilizariamos eventListeners y el value.

 Primero lo haremos con estados.

 Nosotros vamos a hacer que el estado sea el value de esos imputs:

 ~~~~
const Contacto = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

      const handleSubmit = (e) => {
    e.preventDefault(); //prevenimos que se recargue la pagina
    console.log("Enviado",{nombre,email});
  };

.
.
.
        <input
         type="text"
        placeholder="Ingresa tu nombre" 
        value={nombre}
        />

        <input 
        type="email" 
        placeholder="Ingresa tu email"
        value={email}
        />
 ~~~~
 Vemos que primero nos da un error por no utilizar en  "OnChange", y depues vemos que enviamos un objeto con nombre y email vacios.

 Colocamos el evento "onChange" y que actue una funcion, en esa funcion capturamos el valor del evento.

 ~~~~
  const handleNombre = (e) => {   
        console.log(e.target.value);
    }
    const handleEmail = (e) => {
        console.log(e.target.value);
    }
    .
    .
    .
       <input
         type="text"
        placeholder="Ingresa tu nombre" 
        value={nombre}
        onChange={handleNombre}
        />

        <input 
        type="email" 
        placeholder="Ingresa tu email"
        value={email}
        onChange={handleEmail}
        />
 ~~~~
 Ahora vamos pulsado letras al intentar rellenar los campos, y vemo que no sale nada, y ademas en la consola esas letras se van imprimiendo por separado.

 Para reparar esto utilizamos el set del useState.
 
 ~~~~
  const handleNombre = (e) => {   
        setNombre(e.target.value);
        console.log(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    }

 ~~~~
 Ahora ya se guarda. Si vemos la salida por consola, vemos que la primera letra se guarda y se imprime, en la segunda se vueve a imprimir la primera con la segunda y asi sucesivamente. Ahora al enviar se envia el objeto con el nombre y el email.

 ## Nivel 2, de formulario ##

 LA desventaja del modelo anterior, es que por cada campo tienes que poner un estado. Lo que vamos hacer es utilizar un objeto que guarde propiedades, y en un solo estado podremos guardar todo.
 ~~~~
 
const Contacto = () => {
   

    const[valores, setValores] = useState({ 
        nombre:"",
        email:""
    });

    const handlValores = (e) => {
        console.log(e.target.value)
    }



  const handleSubmit = (e) => {
    e.preventDefault(); //prevenimos que se recargue la pagina
    console.log("Enviado",valores);
  };
  
  return (
    <div className="container">
      <h1 className="main-title">Contacto</h1>
      <form className="formulario" onSubmit={handleSubmit}>

        <input
         type="text"
        placeholder="Ingresa tu nombre" 
        value={valores.nombre}
        onChange={handlValores}
        />

        <input 
        type="email" 
        placeholder="Ingresa tu email"
        value={valores.email}
        onChange={handlValores}
        />

        <button className="enviar" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
 ~~~~
 Ahora vuelve a pasar lo mismo que antes. Se imprimen en consola de una en una, y no se guarda....13:21