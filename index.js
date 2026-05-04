```javascript
#!/usr/bin/env node

/**
 * Generador de Números Primos hasta N
 * Implementación usando el Algoritmo de Criba de Eratóstenes
 */

const readline = require('readline');

// Crear interfaz para entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Calcula todos los números primos hasta N usando Criba de Eratóstenes
 * @param {number} n - Límite superior (inclusive)
 * @returns {array} - Array de números primos
 */
function generarPrimos(n) {
  if (n < 2) return [];

  // Crear array booleano, inicialmente todos true
  const esPrimo = new Array(n + 1).fill(true);
  esPrimo[0] = false;
  esPrimo[1] = false;

  // Aplicar Criba de Eratóstenes
  for (let i = 2; i * i <= n; i++) {
    if (esPrimo[i]) {
      // Marcar múltiplos como no primos
      for (let j = i * i; j <= n; j += i) {
        esPrimo[j] = false;
      }
    }
  }

  // Recopilar primos en un array
  const primos = [];
  for (let i = 2; i <= n; i++) {
    if (esPrimo[i]) {
      primos.push(i);
    }
  }

  return primos;
}

/**
 * Verifica si un número es primo
 * @param {number} num - Número a verificar
 * @returns {boolean} - True si es primo
 */
function esPrimo(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Calcula estadísticas de los primos generados
 * @param {array} primos - Array de números primos
 * @returns {object} - Objeto con estadísticas
 */
function calcularEstadisticas(primos) {
  if (primos.length === 0) {
    return {
      cantidad: 0,
      suma: 0,
      promedio: 0,
      menor: null,
      mayor: null
    };
  }

  const suma = primos.reduce((acc, val) => acc + val, 0);
  const promedio = suma / primos.length;

  return {
    cantidad: primos.length,
    suma: suma,
    promedio: promedio.toFixed(2),
    menor: primos[0],
    mayor: primos[primos.length - 1]
  };
}

/**
 * Formatea números primos en grupos para mejor legibilidad
 * @param {array} primos - Array de números primos
 * @param {number} porFila - Cantidad de números por fila
 * @returns {string} - String formateado
 */
function formatearPrimos(primos, porFila = 10) {
  let resultado = '';
  for (let i = 0; i < primos.length; i++) {
    resultado += primos[i].toString().padStart(4);
    if ((i + 1) % porFila === 0) {
      resultado += '\n';
    } else if (i < primos.length - 1) {
      resultado += ' ';
    }
  }
  return resultado;
}

/**
 * Menú principal interactivo
 */
function mostrarMenu() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   GENERADOR DE NÚMEROS PRIMOS        ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('1. Generar primos hasta N');
  console.log('2. Verificar si un número es primo');
  console.log('3. Ver estadísticas de los últimos primos');
  console.log('4. Salir');
  console.log('─────────────────────────────────────────');
}

let ultimosPrimos = [];
let ultimoN = 0;

function procesarOpcion(opcion) {
  switch (opcion.trim()) {
    case '1':
      rl.question('\nIngresa el número N (límite superior): ', (input) => {
        const n = parseInt(input);
        if (isNaN(n) || n < 0) {
          console.log('\n❌ Error: Ingresa un número válido mayor o igual a 0');
          mostrarMenu();
          rl.question('Selecciona una opción (1-4): ', procesarOpcion);
          return;
        }

        console.log(`\n⏳ Generando primos hasta ${n}...`);
        const inicio = Date.now();
        ultimosPrimos = generarPrimos(n);
        const duracion = Date.now() - inicio;
        ultimoN = n;

        console.log(`\n✅ Se encontraron ${ultimosPrimos.length} números primos en ${duracion}ms\n`);
        console.log('Primeros 20 primos:');
        console.log(formatearPrimos(ultimosPrimos.slice(0, 20), 10));

        if (ultimosPrimos.length > 20) {
          console.log(`\n... y ${ultimosPrimos.length - 20} primos más`);
          console.log(`\nÚltimos 10 primos:`);