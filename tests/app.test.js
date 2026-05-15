const test = require('node:test');
const assert = require('node:assert/strict');

global.MepRenovationRules = require('../data/rules.js');
global.MepCostCatalog = require('../data/items.js');

const {
  validateAreaInput,
  formatCurrency,
  buildCostResultRows,
} = require('../app.js');

test('validates a positive shop area input', () => {
  assert.deepEqual(validateAreaInput('88.5'), {
    valid: true,
    area: 88.5,
    message: '',
  });
});

test('rejects blank, zero, and non-number shop area input', () => {
  assert.equal(validateAreaInput('').valid, false);
  assert.equal(validateAreaInput('0').valid, false);
  assert.equal(validateAreaInput('abc').valid, false);
});

test('formats Chinese currency for cost lookup', () => {
  assert.equal(formatCurrency(18500), '¥18,500');
});

test('builds cost result rows from a selected category and specification', () => {
  const rows = buildCostResultRows('exhaustFan', 'fan-15000');

  assert.deepEqual(rows, [
    ['子项名称', '排油烟风机'],
    ['规格型号', '排油烟风机 15000 m3/h'],
    ['计量单位', '台'],
    ['参考单价', '¥18,500'],
    ['价格说明', '样例参考价，需结合风压、噪声、安装位置和品牌复核。'],
  ]);
});
