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
    categories.slice(0, 6).map((item) => item.id),
    [
      'cable',
      'stainlessDuct',
      'galvanizedDuct',
      'exhaustFan',
      'oilSmokePurifier',
      'renovationUnitPriceSummary',
    ]
  );
  assert.equal(categories[0].name, '电缆');
  assert.ok(categories.length > 6);
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

test('loads imported mechanical cost menu workbook items into cost lookup', () => {
  const categories = getCostCategories();
  const galvanizedPipe = categories.find((item) => item.name === '镀锌钢管');
  const waterMeter = categories.find((item) => item.name === '水表安装');
  const fireExtinguisherBox = categories.find((item) => item.name === '灭火器面具箱安装');

  assert.ok(galvanizedPipe);
  assert.ok(waterMeter);
  assert.ok(fireExtinguisherBox);
  assert.equal(categories.filter((item) => item.id.startsWith('imported-cost-')).length, 74);

  const galvanizedSpecs = getSpecificationsForCategory(galvanizedPipe.id);
  assert.equal(galvanizedSpecs.length, 7);
  assert.ok(galvanizedSpecs.some((item) => (
    item.name === 'DN80' && item.unit === 'm' && item.price === 107.32
  )));

  const waterMeterSpecs = getSpecificationsForCategory(waterMeter.id);
  assert.ok(waterMeterSpecs.some((item) => item.name === 'DN25(螺纹连接)（个）' && item.price === 145.19));
  assert.ok(waterMeterSpecs.some((item) => item.name === 'DN25(螺纹连接)（组）' && item.price === 158.21));

  const boxSpec = getSpecificationsForCategory(fireExtinguisherBox.id).find((item) => item.name === '4KG×2个+2装');
  assert.equal(boxSpec.unit, '套');
  assert.equal(boxSpec.price, 128.03);
});

test('loads renovation unit price summary after oil smoke purifier', () => {
  const categories = getCostCategories();
  const purifierIndex = categories.findIndex((item) => item.id === 'oilSmokePurifier');
  const category = categories[purifierIndex + 1];

  assert.equal(category.id, 'renovationUnitPriceSummary');
  assert.equal(category.name, '改造项单方造价');

  const specs = getSpecificationsForCategory(category.id);
  assert.equal(specs.length, 12);
  assert.deepEqual(
    specs.slice(0, 3).map((item) => item.name),
    ['废水排水管/排水条件', '消防水/喷淋消火栓调整', '消防防排烟系统调整']
  );

  const drainage = findCostItem(category.id, 'renovation-unit-price-001');
  assert.equal(drainage.unit, '㎡');
  assert.equal(drainage.price, 46.154);
  assert.equal(drainage.sampleCount, 13);
  assert.deepEqual(drainage.observedRange, [40, 70]);
  assert.ok(drainage.remark.includes('频次2次以上'));

  const dispatchCost = findCostItem(category.id, 'renovation-unit-price-005');
  assert.equal(dispatchCost.name, '调商/招调费用');
  assert.equal(dispatchCost.unit, '项');
  assert.equal(dispatchCost.price, 560000);
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
