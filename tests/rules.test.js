const test = require('node:test');
const assert = require('node:assert/strict');

const {
  DINING_TYPES,
  calculateRenovationPlan,
  getDiningTypeOptions,
} = require('../data/rules.js');

test('returns the three first-version dining type options', () => {
  const options = getDiningTypeOptions();

  assert.deepEqual(
    options.map((item) => item.id),
    ['light', 'standard', 'heavy']
  );
  assert.equal(options[0].name, '轻餐');
  assert.equal(options[1].name, '普通餐饮');
  assert.equal(options[2].name, '重油烟餐饮');
});

test('calculates a standard catering MEP plan from area and dining type', () => {
  const plan = calculateRenovationPlan(120, 'standard');

  assert.equal(plan.area, 120);
  assert.equal(plan.diningType.name, '普通餐饮');
  assert.equal(plan.items.electricalLoad.value, '60 kW');
  assert.equal(plan.items.electricalLoad.numericValue, 60);
  assert.equal(plan.items.electricalCable.value, 'YJV-4x70+1x35');
  assert.equal(plan.items.water.value, 'DN40');
  assert.equal(plan.items.drainage.value, 'DN100');
  assert.equal(plan.items.exhaust.value, '5400 m3/h');
  assert.equal(plan.items.greaseTrap.value, '3.0 m3');
  assert.ok(plan.risks.some((item) => item.includes('原始供电容量')));
  assert.ok(plan.assumptions.some((item) => item.includes('初步测算')));
});

test('heavy-oil catering produces higher exhaust and grease trap demand than light catering', () => {
  const light = calculateRenovationPlan(100, 'light');
  const heavy = calculateRenovationPlan(100, 'heavy');

  assert.equal(light.items.exhaust.numericValue < heavy.items.exhaust.numericValue, true);
  assert.equal(light.items.greaseTrap.numericValue < heavy.items.greaseTrap.numericValue, true);
});

test('rejects unsupported area and dining type values', () => {
  assert.throws(() => calculateRenovationPlan(0, 'standard'), /商铺面积/);
  assert.throws(() => calculateRenovationPlan(-10, 'standard'), /商铺面积/);
  assert.throws(() => calculateRenovationPlan(100, 'unknown'), /餐饮类型/);
});

test('exposes dining type data for future extension', () => {
  assert.equal(DINING_TYPES.heavy.exhaustAirVolumePerSquareMeter, 60);
  assert.equal(DINING_TYPES.light.greaseTrapCubicMeterPerSquareMeter, 0.015);
});
