# Componente PokeImagen #
He creado un nuevo componente para agregar una imagen a cada miembro de la lista.
He tenido problemas por que a la hora de enviar la url al componente, no me la detectaba como un string.
He tenido que pasarlo a una variable de esta manera.
~~~~
unction PokeImagen (url) {
    console.log("Pokeimage,Esto es la url",url);
   let url1 = url.url;
   console.log("Pokeimage,Esto es url1",url1);

~~~~