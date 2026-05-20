const test = require('node:test');
const assert = require('node:assert/strict');

const {
  CABLE_SELECTION_TABLE,
  formatYjvCableSpecification,
  selectCableByDemandKw,
} = require('../data/cable-table.js');

test('selects the next higher cable table row conservatively', () => {
  const selection = selectCableByDemandKw(28);

  assert.equal(selection.ratedPowerKw, 30);
  assert.equal(selection.coefficientKx, 1);
  assert.equal(selection.calculatedCurrentA, 53.6);
  assert.equal(selection.recommendedCable, '3×10mm²');
  assert.equal(selection.isRoundedUp, true);
});

test('selects the exact cable table row when demand matches a rating', () => {
  const selection = selectCableByDemandKw(90);

  assert.equal(selection.ratedPowerKw, 90);
  assert.equal(selection.coefficientKx, 0.8);
  assert.equal(selection.calculatedCurrentA, 128.7);
  assert.equal(selection.recommendedCable, '3×50mm²');
  assert.equal(selection.isRoundedUp, false);
});

test('uses 5x6 cable for calculated demand within 15 kW', () => {
  const roundedSelection = selectCableByDemandKw(12);
  const exactSelection = selectCableByDemandKw(15);

  assert.equal(roundedSelection.ratedPowerKw, 15);
  assert.equal(roundedSelection.recommendedCable, '5×6mm²');
  assert.equal(exactSelection.ratedPowerKw, 15);
  assert.equal(exactSelection.recommendedCable, '5×6mm²');
});

test('uses double 3x120 cable from the 260 kW tier upward', () => {
  const boundarySelection = selectCableByDemandKw(260);
  const higherSelection = selectCableByDemandKw(275);
  const maximumSelection = selectCableByDemandKw(500);

  assert.equal(boundarySelection.recommendedCable, '2×(3×120mm²)');
  assert.equal(higherSelection.recommendedCable, '2×(3×120mm²)');
  assert.equal(maximumSelection.recommendedCable, '2×(3×120mm²)');
});

test('formats YJV cable specifications as four-plus-one five-core cables', () => {
  assert.equal(formatYjvCableSpecification('5×6mm²'), 'YJV 5×6mm²');
  assert.equal(formatYjvCableSpecification('3×95mm²'), 'YJV 4×95+1×50mm²');
  assert.equal(formatYjvCableSpecification('3×10mm²'), 'YJV 4×10+1×6mm²');
  assert.equal(formatYjvCableSpecification('2×(3×120mm²)'), '2×(YJV 4×120+1×70mm²)');
});

test('keeps the full source table available for extension', () => {
  assert.equal(CABLE_SELECTION_TABLE.length, 76);
  assert.equal(CABLE_SELECTION_TABLE[0].ratedPowerKw, 10);
  assert.equal(CABLE_SELECTION_TABLE.at(-1).ratedPowerKw, 500);
});
