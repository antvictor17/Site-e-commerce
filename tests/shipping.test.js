const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeCep, calculateFreight } = require('../shipping.js');

test('normaliza CEP removendo caracteres especiais', () => {
  assert.equal(normalizeCep('01000-000'), '01000000');
});

test('calcula frete conforme a região do CEP', () => {
  assert.equal(calculateFreight('01000-000'), 15);
  assert.equal(calculateFreight('40000-000'), 20);
  assert.equal(calculateFreight('60000-000'), 25);
  assert.equal(calculateFreight('80000-000'), 30);
});
