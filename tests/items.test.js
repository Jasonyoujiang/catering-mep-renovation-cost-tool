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

  assert.equal(cableSpecs.length >= 3, true);
  assert.equal(cableSpecs[0].unit, 'm');
  assert.ok(cableSpecs.some((item) => item.name === 'YJV-4x70+1x35'));
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
