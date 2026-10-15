/**
 * @file Módulo de operaciones matemáticas y estadísticas básicas.
 * @author Tu Nombre
 * @version 1.0.0
 */

/**
 * Suma dos números.
 * 
 * @param {number} a - El primer número.
 * @param {number} b - El segundo número.
 * @returns {number} Resultado de la suma.
 * @example
 * sumar(5, 3); // Retorna 8
 */
function sumar(a, b) {
    return a + b;
}

/**
 * Calcula el área de un círculo.
 * 
 * @param {number} radio - El radio del círculo.
 * @returns {number} El área calculada.
 * @throws {Error} Si el radio es negativo.
 */
function calcularAreaCirculo(radio) {
    if (radio < 0) {
        throw new Error("El radio no puede ser negativo");
    }
    return Math.PI * Math.pow(radio, 2);
}

/**
 * Obtiene el número mayor de un arreglo.
 * 
 * @param {number[]} numeros - Arreglo de números.
 * @returns {number} El valor máximo.
 */
function obtenerMaximo(numeros) {
    if (!numeros || numeros.length === 0) {
        throw new Error("El arreglo no puede estar vacío");
    }
    return Math.max(...numeros);
}

// Exportación del módulo
module.exports = {
    sumar,
    calcularAreaCirculo,
    obtenerMaximo
};