//Matriz que va a contener todo (minas, pistas ...)
const matriz = [];
//Almacenamos los valores obtenidos de los inputs
let numFilas;
let numColumnas;
let contenedorTabla;
let numMinas;
//Coordenadas donde se encuentran las minas
const posicionMinas = [];


const tablero = (matriz, filas, columnas) => {
    //Recorremos el array y lo llenamos en cada vuelta con un nuevo array
    for (let i = 0; i < filas; i++) {
        matriz[i] = new Array(columnas);
    }

    //Recorremos las filas de la matriz  
    for (let x = 0; x < filas; x++) {
        //Recorremos las columnas 
        for (let y = 0; y < columnas; y++) {
            //Llenamos la matriz con 0
            matriz[x][y] = 0;
        }
    }
}


const numeroAleatorio = (min, max) => {
    //Genera números aleatorios entre dos rangos incluyendo los extremos
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Esta función sitúa aleatoriamente las minas sobre la matriz y guarda las posiciones de las mismas en otro array
const ponerMina = (matriz, posicionMinas, numMinas, numeroAleatorio) => {
    //Este bucle da tantas vueltas como minas se soliciten
    for (let i = 0; i < numMinas; i++) {
        //Generamos las coordenadas en el array donde vamos a poner las minas con el callback numeroAleatorio
        const fila = numeroAleatorio(0, numFilas - 1);
        const columna = numeroAleatorio(0, numColumnas - 1);

        //Comprobamos si en esta posición de fila columna hay ya una mina si la hay restamos una vuelta al bucle
        if (matriz[fila][columna] == "M") {
            i--;
        } else {
            //Si en esta posición no hay mina (M) ponemos una
            matriz[fila][columna] = "M";
            //Coordenadas donde están las minas
            posicionMinas[i] = [fila, columna];
        }
    }
    //Mostramos las coordenadas donde están las minas
    console.log(posicionMinas);
}

//Función que pone pistas (cuantas minas hay alrededor de esta casilla)
//posicionMinas es el array que contiene las posiciones de las minas
const ponerPistas = (posicionMinas, tablero) => {

    //Recorremos el array donde están guardadas las posiciones de las minas
    for (let f = 0; f < posicionMinas.length; f++) {
        //En cada vuelta extraemos de las columnas la posicion 0 y posicion 1
        //que contienen las coordenadas X y Y de la mina (fila y columna)
        const fil = posicionMinas[f][0];//Posición 0 del array de turno con las coordenadas de la mina (filas)
        const col = posicionMinas[f][1];//Posición 1 del array de turno con las coordenadas de la mina (columnas)

        //Ejecutamos las ordenes de poner pistas solo cuando los condicionales NO se cumplen
        //(si se cumplen no hacemos nada, porque o intentamos a acceder a una posicion fuera  
        // de la matriz o en esta celda hay otra mina)

        //Misma fila antes de la mina
        if (!((col - 1) < 0 || tablero[fil][(col - 1)] == 'M')) {
            tablero[fil][(col - 1)] = tablero[fil][(col - 1)] + 1;
        }

        //Misma fila después de la mina
        if (!((col + 1) > numColumnas || tablero[fil][(col + 1)] == 'M')) {
            tablero[fil][(col + 1)] = tablero[fil][(col + 1)] + 1;
        }

        //Misma columna fila de arriba (encima de la mina)
        if (!((fil - 1) < 0 || tablero[(fil - 1)][col] == 'M')) {
            tablero[(fil - 1)][col] = tablero[(fil - 1)][col] + 1;
        }

        //Misma columna fila de abajo (debajo de la mina)
        if (!((fil + 1) >= numFilas || tablero[(fil + 1)][col] == 'M')) {
            tablero[(fil + 1)][col] = tablero[(fil + 1)][col] + 1;
        }

        //Esquina arriba izquierda de la mina
        if (!((col - 1) < 0 || (fil - 1) < 0 || tablero[(fil - 1)][(col - 1)] == 'M')) {
            tablero[(fil - 1)][(col - 1)] = tablero[(fil - 1)][(col - 1)] + 1;
        }

        //Esquina arriba derecha de la mina
        if (!((col + 1) >= numColumnas || (fil - 1) < 0 || tablero[(fil - 1)][(col + 1)] == 'M')) {
            tablero[(fil - 1)][(col + 1)] = tablero[(fil - 1)][(col + 1)] + 1;
        }

        //Esquina abajo izquierda de la mina
        if (!((col - 1) < 0 || (fil + 1) >= numFilas || tablero[(fil + 1)][(col - 1)] == 'M')) {
            tablero[(fil + 1)][(col - 1)] = tablero[(fil + 1)][(col - 1)] + 1;
        }

        //Esquina abajo derecha de la mina
        if (!((col + 1) >= numColumnas || (fil + 1) >= numFilas || tablero[(fil + 1)][(col + 1)] == 'M')) {
            tablero[(fil + 1)][(col + 1)] = tablero[(fil + 1)][(col + 1)] + 1;
        }
    }

}

//Función flecha que crea una tabla y la rellena con los datos
const generarTabla = () => {
    contenedorTabla.innerHTML = ""; //Primero limpiamos el div que contiene la tabla (por si acaso) 
    let tabla = "<table>"; //Inicializamos la variable con la apertura de la etiqueta de una tabla
    for (let fila = 0; fila < numFilas; fila++) {
        tabla += "<tr>"; //En cada vuelta creamos una nueva fila
        for (let columna = 0; columna < numColumnas; columna++) {
            if (matriz[fila][columna] == 'M') {
                tabla += "<td>" + "&#x1F4A3;" + "</td>"; //Sustituye la 'M' por una bomba
            } else if (matriz[fila][columna] == 0) {
                tabla += "<td> </td>"; //Sustituimos los 0 por espacio en vació
            } else {
                tabla += "<td>" + matriz[fila][columna] + "</td>"; //Llenamos la tabla con las pistas
            }
        }
        tabla += "</tr>"; //Cerramos la etiqueta de la fila
    }
    tabla += "</table>"; //Cerramos la tabla ya cargada
    //Insertamos la tabla con los datos en el div 
    contenedorTabla.innerHTML = tabla;
}

const dirigente = function () {
    //Recogemos los datos de entrada
    numFilas = document.getElementById("numFilas").value;
    numColumnas = document.getElementById("numColumnas").value;
    contenedorTabla = document.getElementById("contenedorTabla");
    numMinas = document.getElementById("numMinas").value;
    //Comprobamos los valores de entrada
    if (numFilas < 3 || numFilas > 100) {
        contenedorTabla.innerHTML = "Por favor las filas algo mas realista. Estaría bien entre 3 y 100";
    } else if (numColumnas < 3 || numColumnas > 50) {
        contenedorTabla.innerHTML = "Por favor las columnas algo mas realista. Estaría bien entre 3 y 50";
    } else if (numMinas < 1) {
        contenedorTabla.innerHTML = "Por lo menos una mina por favor.";
    } else if (numMinas > (numFilas * numColumnas) - 1) {
        contenedorTabla.innerHTML = "Demasiadas minas. Por favor dejar por lo menos una casilla sin mina.";
    } else {
        //Si los valores están correctos ejecutamos las funciones
        tablero(matriz, numFilas, numColumnas); //Creamos un tablero con la cantidad de filas y columnas requeridas 
        ponerMina(matriz, posicionMinas, numMinas, numeroAleatorio); //Situamos aleatoriamente las minas especificadas sobre el tablero
        ponerPistas(posicionMinas, matriz); //Ubicamos las pistas alrededor de cada mina
        generarTabla(); //Generamos la tabla con los datos y la mostramos al usuario
    }
}