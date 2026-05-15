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
  assert.equal(plan.items.electricalLoad.value, '48 kW');
  assert.equal(plan.items.electricalLoad.numericValue, 48);
  assert.equal(plan.items.electricalCable.value, 'YJV 4×25+1×16mm²');
  assert.equal(plan.items.electricalCable.note.includes('50 kW 档'), true);
  assert.equal(plan.items.electricalCable.note.includes('Kx=0.9'), true);
  assert.equal(plan.items.electricalCable.note.includes('80.4 A'), true);
  assert.equal(plan.items.water.value, 'DN40');
  assert.equal(plan.items.drainage.value, 'DN160');
  assert.equal(plan.items.exhaust.value, '5400 m3/h');
  assert.equal(plan.items.greaseTrap.value, '3.0 m3');
  assert.ok(plan.risks.some((item) => item.includes('原始供电容量')));
  assert.ok(plan.assumptions.some((item) => item.includes('初步测算')));
});

test('uses screenshot area tiers for water and drainage pipe reservations', () => {
  const small = calculateRenovationPlan(100, 'light');
  const medium = calculateRenovationPlan(300, 'standard');
  const beforeLarge = calculateRenovationPlan(399.9, 'heavy');
  const large = calculateRenovationPlan(400, 'standard');

  assert.equal(small.items.water.value, 'DN25');
  assert.equal(small.items.drainage.value, 'DN110');
  assert.equal(medium.items.water.value, 'DN40');
  assert.equal(medium.items.drainage.value, 'DN160');
  assert.equal(beforeLarge.items.water.value, 'DN40');
  assert.equal(beforeLarge.items.drainage.value, 'DN160');
  assert.equal(large.items.water.value, 'DN50');
  assert.equal(large.items.drainage.value, '2条DN160');
});

test('uses the user supplied electrical demand when it is specified', () => {
  const plan = calculateRenovationPlan(80, 'light', { specifiedDemandKw: 90 });

  assert.equal(plan.items.electricalLoad.value, '90 kW');
  assert.equal(plan.items.electricalLoad.numericValue, 90);
  assert.equal(plan.items.electricalLoad.note.includes('手动指定用电量'), true);
  assert.equal(plan.items.electricalCable.value, 'YJV 4×50+1×25mm²');
  assert.equal(plan.items.electricalCable.note.includes('90 kW 档'), true);
  assert.equal(plan.items.electricalCable.note.includes('主力店、水吧'), true);
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
  assert.throws(() => calculateRenovationPlan(100, 'standard', { specifiedDemandKw: 0 }), /指定用电量/);
});

test('exposes dining type data for future extension', () => {
  assert.equal(DINING_TYPES.light.demandKwPerSquareMeter, 0.25);
  assert.equal(DINING_TYPES.standard.demandKwPerSquareMeter, 0.4);
  assert.equal(DINING_TYPES.heavy.demandKwPerSquareMeter, 0.5);
  assert.equal(DINING_TYPES.heavy.exhaustAirVolumePerSquareMeter, 60);
  assert.equal(DINING_TYPES.light.greaseTrapCubicMeterPerSquareMeter, 0.015);
});
