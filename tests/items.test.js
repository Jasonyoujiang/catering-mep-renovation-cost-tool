const test = require('node:test');
const assert = require('node:assert/strict');

const {
  COST_CATALOG,
  getCostCategories,
  getSpecificationsForCategory,
  findCostItem,
} = require('../data/items.js');

test('returns first-version expandable cost categories', () => {
  const categories = getCostCategories();

  assert.deepEqual(
    categories.map((item) => item.id),
    ['cable', 'stainlessDuct', 'galvanizedDuct', 'exhaustFan', 'oilSmokePurifier']
  );
  assert.equal(categories[0].name, '电缆');
});

test('returns specifications for a selected category', () => {
  const cableSpecs = getSpecificationsForCategory('cable');

  assert.equal(cableSpecs.length, 15);
  assert.equal(cableSpecs[0].unit, 'm');
  assert.ok(cableSpecs.some((item) => item.name === 'YJV 4×70+1×35'));
  assert.ok(cableSpecs.some((item) => item.name === '双拼 YJV 4×70+1×35'));
  assert.ok(cableSpecs.some((item) => item.name === '双拼 YJV 4×95+1×50'));
  assert.ok(cableSpecs.some((item) => item.name === '双拼 YJV 4×120+1×70'));
  assert.equal(cableSpecs.some((item) => item.name === 'YJV 4×300+1×150'), false);
});

test('applies the 1.4 labor and accessory coefficient to cable meter costs', () => {
  const item = findCostItem('cable', 'yjv-4x95-1x50');

  assert.equal(item.categoryName, '电缆');
  assert.equal(item.name, 'YJV 4×95+1×50');
  assert.equal(item.unit, 'm');
  assert.equal(item.price, 519.64);
  assert.equal(item.basePrice, 371.17);
  assert.equal(item.costCoefficient, 1.4);
  assert.ok(item.remark.includes('人工和配件'));
});

test('adds double-run cable costs by doubling the single-run comprehensive price', () => {
  const single = findCostItem('cable', 'yjv-4x95-1x50');
  const doubleRun = findCostItem('cable', 'double-yjv-4x95-1x50');

  assert.equal(doubleRun.categoryName, '电缆');
  assert.equal(doubleRun.name, '双拼 YJV 4×95+1×50');
  assert.equal(doubleRun.unit, 'm');
  assert.equal(doubleRun.price, single.price * 2);
  assert.equal(doubleRun.parallelRuns, 2);
  assert.ok(doubleRun.remark.includes('双拼'));
});

test('finds a single cost item by category and specification id', () => {
  const item = findCostItem('exhaustFan', 'fan-10000');

  assert.equal(item.categoryName, '排油烟风机');
  assert.equal(item.name, '排油烟风机 10000 m3/h');
  assert.equal(item.unit, '台');
  assert.deepEqual(item.priceRange, [12000, 18000]);
  assert.ok(item.remark.includes('低噪音柜式离心'));
});

test('finds oil smoke purifier cost ranges from the supplied price list', () => {
  const item = findCostItem('oilSmokePurifier', 'purifier-10000');

  assert.equal(item.categoryName, '油烟净化器');
  assert.equal(item.name, '油烟净化器 10000 m3/h');
  assert.equal(item.unit, '台');
  assert.deepEqual(item.priceRange, [8000, 10000]);
  assert.ok(item.remark.includes('净化效率'));
});

test('uses supplied 304 stainless duct full-service cost ranges', () => {
  const specs = getSpecificationsForCategory('stainlessDuct');
  const item = findCostItem('stainlessDuct', 'sus-duct-1-0');

  assert.equal(specs.length, 7);
  assert.equal(item.categoryName, '不锈钢风管');
  assert.equal(item.name, '304不锈钢矩形风管 1.0mm');
  assert.equal(item.unit, 'm2');
  assert.deepEqual(item.priceRange, [350, 450]);
  assert.ok(item.remark.includes('裸管成品价约 ¥220-¥280/m2'));
  assert.ok(item.remark.includes('常规主风管'));
});

test('throws clear errors for unknown category or specification', () => {
  assert.throws(() => getSpecificationsForCategory('unknown'), /造价子项/);
  assert.throws(() => findCostItem('cable', 'missing'), /规格型号/);
});

test('exposes catalog data for future extension', () => {
  assert.equal(COST_CATALOG.cable.name, '电缆');
  assert.equal(Array.isArray(COST_CATALOG.stainlessDuct.specifications), true);
  assert.equal(COST_CATALOG.exhaustFan.specifications.length, 29);
  assert.equal(COST_CATALOG.oilSmokePurifier.specifications.length, 29);
});
