const { sumar } = require('../src/calculadora');

test('debe sumar 2 números correctamente', () => {
  expect(sumar(5, 3)).toBe(8);
});