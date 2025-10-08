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
 Ahora vuelve a pasar lo mismo que antes. Se imprimen en consola de una en una, y no se guarda. Para que esto no ocurra nos vamos a ayudar de un elemento de los inputs, el "name". Este name sera el mismo que utilizemos en el useState.
 
 ~~~~
      const handlValores = (e) => {
        console.log(e.target.name)
    }
    .
    .
    .
     <input
         type="text"
        placeholder="Ingresa tu nombre" 
        value={valores.nombre}
        onChange={handlValores}
        name="nombre"
        />

        <input 
        type="email" 
        placeholder="Ingresa tu email"
        value={valores.email}
        onChange={handlValores}
        name="email"
        />
 ~~~~

 Ahora cuando nosotros pulsemos letras dentro de los campos, en consola aparecera el nombre que hayamos puesto en "name".

 Partiendo de eso :
 ~~~~
    const handlValores = (e) => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value,
        });
    }
 ~~~~

 Cada vez que hay un cambio en los inputs, por el onChange, se setea Valores con todo lo que habia en valores (...valores), mas la modificacion de la propiedad (e.target.name), que es el "nombre" o el "email", de useState. Con el valor de e.target.value, en el correspondiente. Ahora si rellenamos y le damos a enviar, vemos que se envia correctamente. Ahora seria muy sencillo agregar un nuevo campo al formulario.

 ~~~~

    
    const[valores, setValores] = useState({ 
        nombre:"",
        email:"",
        telefono:""
    });
    .
    .
    .

     <input 
        type="email" 
        placeholder="Ingresa tu email"
        value={valores.email}
        onChange={handlValores}
        name="email"
        />
         <input 
        type="telefono" 
        placeholder="Ingresa tu telefono"
        value={valores.telefono}
        onChange={handlValores}
        name="telefono"
        />
 ~~~~

 ## Nivel 3, de formularios ##

 La mejor manera de manejar formularios es con una libreria. La libreria es la siguiente "npm install react-hook-form".
 No hace falta ni el value, ni el onChange, ni el name. Tambien borramos el onSubmit del formulario y todas la funciones y estados.

 ~~~~
import { useForm } from "react-hook-form";

const Contacto = () => {
   const { register, handleSubmit } = useForm();//necesitamos las dos funciones "register" y "handleSubmit"

    const enviar = (data) => {
      console.log("Formulario enviado",data);//en data esta lo que enviamos
    }

  return (
    <div className="container">
      <h1 className="main-title">Contacto</h1>
      <form className="formulario" onSubmit={handleSubmit(enviar)}>//Al darle a enviar llama a esta funcion

        <input type="text"placeholder="Ingresa tu nombre" {...register("nombre")}/>//con spread+register+nombre del campo, 
        //identificamos campo
        <input type="email" placeholder="Ingresa tu email"{...register("email")}/>
        <input type="telefono" placeholder="Ingresa tu telefono"{...register("telefono")}/>

        <button className="enviar" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
 ~~~~
