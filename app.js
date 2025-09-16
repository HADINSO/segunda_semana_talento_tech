/*

//Areglos 
let datosPersonales = [
  "HADINSO HINESTROA",
  "1131045489",
  "3146642251",
  26,
  "Piñal de medrano, tercera calle",
  1.73,
];

//Metodos para trabajar con listas
datosPersonales.push("Hombre") //Agrega un dato al final
datosPersonales.unshift(1) //Agrega un dato al principio
datosPersonales.pop(); //elimina el ultimo elemento
datosPersonales.shift(); //elimina al primer elemento
datosPersonales[2] = "3146642252" //Modificar un valor

console.log(datosPersonales);

//Tuplas

const tupla = ["manzana", "pera", "fresa"]
console.log(tupla[0])
console.log(tupla.includes("manzana"))


//Diccionarios

let datosPersonales = {
  Nombres: "LISETH DAHIANA",
  Apellidos: "PALACIO ANDRADE",
  Telefono: "312342243",
  Sexo: "Masculino",
};

console.log(Object.values(datosPersonales))


var nombre = prompt("Propocione su nombre: ")
console.log(nombre)

//Condicionales
let numero = prompt("Proporcione un numero: ");

if (numero > 0) {
  console.log("El numero es positivo.");
} else if (numero == 0) {
  console.log("El numero es cero.");
} else {
  console.log("El numero es negativo.");
}


let nota = prompt("Digite su nota: ");

if (nota < 60) {
  console.log("Reprobado.");
} else if (nota >= 60 && nota <= 79) {
  console.log("Aprobado.");
} else if (nota >= 80 && nota <= 89) {
  console.log("Muy bien.");
} else if (nota >= 90 && nota <= 100) {
  console.log("Excelente.");
} else {
  console.log("Dato erroneo.");
}
*/

for (let i = 1; i <= 10; i++) {
  console.log(`La tabla de numero:  ${i}`);
  for (let tabla = 1; tabla <= 10; tabla++) {
    console.log(`Numero: ${i} x ${tabla} = ${i * tabla}`);
  }
}
