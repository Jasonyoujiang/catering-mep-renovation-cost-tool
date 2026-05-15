const test = require('node:test');
const assert = require('node:assert/strict');

global.MepRenovationRules = require('../data/rules.js');
global.MepCostCatalog = require('../data/items.js');

const {
  validateAreaInput,
  formatCurrency,
  buildPlanResultRows,
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

test('builds renovation plan rows for table output', () => {
  const plan = global.MepRenovationRules.calculateRenovationPlan(120, 'standard');
  const rows = buildPlanResultRows(plan);

  assert.deepEqual(rows, [
    ['配套电缆规格', 'YJV-4x70+1x35', '按 普通餐饮 0.5 kW/m2 的示例系数估算。'],
    ['供水管径', 'DN40', '需结合厨房用水点、热水系统和原管网压力复核。'],
    ['排水管径', 'DN100', '需复核排水坡度、隔油接入和检修条件。'],
    ['排油烟风量', '5400 m3/h', '按 45 m3/h/m2 的示例系数估算。'],
    ['占用隔油池容积', '3.0 m3', '需结合既有隔油池总容量、服务商户数量和清掏频次复核。'],
  ]);
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
