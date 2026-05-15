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
    ['cable', 'stainlessDuct', 'galvanizedDuct', 'exhaustFan']
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
  const item = findCostItem('exhaustFan', 'fan-15000');

  assert.equal(item.categoryName, '排油烟风机');
  assert.equal(item.name, '排油烟风机 15000 m3/h');
  assert.equal(item.unit, '台');
  assert.equal(item.price, 18500);
  assert.ok(item.remark.includes('参考'));
});

test('throws clear errors for unknown category or specification', () => {
  assert.throws(() => getSpecificationsForCategory('unknown'), /造价子项/);
  assert.throws(() => findCostItem('cable', 'missing'), /规格型号/);
});

test('exposes catalog data for future extension', () => {
  assert.equal(COST_CATALOG.cable.name, '电缆');
  assert.equal(Array.isArray(COST_CATALOG.stainlessDuct.specifications), true);
});
