const test = require('node:test');
const assert = require('node:assert/strict');

global.MepRenovationRules = require('../data/rules.js');
global.MepCostCatalog = require('../data/items.js');

const {
  validateAreaInput,
  validateOptionalDemandInput,
  resolveSpecifiedDemand,
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

test('validates optional specified electrical demand input', () => {
  assert.deepEqual(validateOptionalDemandInput(''), {
    valid: true,
    value: null,
    message: '',
  });
  assert.deepEqual(validateOptionalDemandInput('90'), {
    valid: true,
    value: 90,
    message: '',
  });
  assert.deepEqual(validateOptionalDemandInput('-1'), {
    valid: false,
    value: null,
    message: '指定用电量必须为空，或填写大于 0 的数字。',
  });
});

test('uses specified demand only when the checkbox is enabled', () => {
  assert.equal(resolveSpecifiedDemand(false, '90').valid, true);
  assert.equal(resolveSpecifiedDemand(false, '90').value, null);

  assert.deepEqual(resolveSpecifiedDemand(true, '90'), {
    valid: true,
    value: 90,
    message: '',
  });

  assert.deepEqual(resolveSpecifiedDemand(true, ''), {
    valid: false,
    value: null,
    message: '勾选指定用电量后，请填写大于 0 的用电量。',
  });
});

test('formats Chinese currency for cost lookup', () => {
  assert.equal(formatCurrency(18500), '¥18,500');
  assert.equal(formatCurrency(54.264), '¥54.26');
});

test('builds renovation plan rows for table output', () => {
  const plan = global.MepRenovationRules.calculateRenovationPlan(120, 'standard');
  const rows = buildPlanResultRows(plan);

  assert.deepEqual(rows, [
    ['估算用电负荷', '48 kW', '按 普通餐饮 0.4 kW/m2 经验系数估算，暂未考虑设备清单和同时使用系数。'],
    ['配套电缆规格', 'YJV 4×25+1×16mm²', '按 48 kW 估算负荷匹配，保守向上取表中 50 kW 档，Kx=0.9，计算电流约 80.4 A；需核实上级开关容量、计量方式和电缆敷设路径。'],
    ['供水管径', 'DN40', '需结合厨房用水点、热水系统和原管网压力复核。'],
    ['排水管径', 'DN160', '需复核排水坡度、隔油接入和检修条件。'],
    ['排油烟风量', '3840 m3/h', '按 32 m3/h/m2 指标计算。'],
    ['占用隔油池容积', '1.2 m3', '按 1 m3/100m2 指标计算，不足 100m2 部分按面积比例计算。'],
  ]);
});

test('builds cost result rows from a selected category and specification', () => {
  const rows = buildCostResultRows('cable', 'yjv-4x95-1x50');

  assert.deepEqual(rows, [
    ['子项名称', '电缆'],
    ['规格型号', 'YJV 4×95+1×50'],
    ['计量单位', 'm'],
    ['参考单价', '¥519.64'],
    ['价格说明', 'YJV 0.6/1kV 国标含税中价位每米成本×1.4综合系数，系数考虑人工和配件；不含复杂桥架、拆改、夜间施工及铜价波动。'],
  ]);
});
