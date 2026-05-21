const test = require('node:test');
const assert = require('node:assert/strict');

const {
  BATCH_TEMPLATE_HEADERS,
  BATCH_OUTPUT_HEADERS,
  EXISTING_CABLE_SPEC_OPTIONS,
  EXISTING_DRAINAGE_PIPE_OPTIONS,
  EXISTING_WATER_PIPE_OPTIONS,
  buildBatchPlanRows,
  createTemplateRows,
  resolveDiningTypeId,
} = require('../data/batch.js');

test('defines the first-version batch Excel template headers', () => {
  assert.deepEqual(BATCH_TEMPLATE_HEADERS, [
    '商铺编号',
    '楼层',
    '业态类型',
    '面积',
    '指定用电量',
    '现状电缆1',
    '现状电缆2',
    '现状给水管径',
    '现状排水管径',
    '现状油烟管尺寸',
  ]);

  assert.equal(BATCH_OUTPUT_HEADERS.includes('风险提示'), false);
  assert.equal(BATCH_OUTPUT_HEADERS.includes('测算依据'), false);
  assert.equal(BATCH_OUTPUT_HEADERS.includes('是否启用指定用电量'), false);
  assert.equal(BATCH_OUTPUT_HEADERS.includes('指定用电量'), true);
  assert.equal(BATCH_OUTPUT_HEADERS.includes('现状电缆规格'), false);
  assert.equal(BATCH_OUTPUT_HEADERS.includes('现状电缆1'), true);
  assert.equal(BATCH_OUTPUT_HEADERS.includes('现状电缆2'), true);
  assert.equal(BATCH_OUTPUT_HEADERS.includes('现状油烟管尺寸'), true);
});

test('defines selectable existing cable specifications for the Excel template', () => {
  assert.deepEqual(EXISTING_CABLE_SPEC_OPTIONS, [
    '5×6',
    '4×10+1×6',
    '4×16+1×10',
    '4×25+1×16',
    '4×35+1×16',
    '4×50+1×25',
    '4×70+1×35',
    '4×95+1×50',
    '4×120+1×70',
    '4×150+1×70',
    '4×185+1×95',
    '4×240+1×120',
  ]);
});

test('defines selectable existing pipe specifications for the Excel template', () => {
  assert.deepEqual(EXISTING_WATER_PIPE_OPTIONS, [
    'DN15',
    'DN20',
    'DN25',
    'DN32',
    'DN40',
    'DN50',
    'DN65',
  ]);

  assert.deepEqual(EXISTING_DRAINAGE_PIPE_OPTIONS, [
    'DN50',
    'DN75',
    'DN100',
    'DN110',
    'DN150',
    'DN200',
  ]);
});

test('creates template example rows with the renamed shop and business type fields', () => {
  const rows = createTemplateRows();

  assert.equal(rows.length >= 2, true);
  assert.equal(Object.hasOwn(rows[0], '商铺编号'), true);
  assert.equal(Object.hasOwn(rows[0], '楼层'), true);
  assert.equal(Object.hasOwn(rows[0], '业态类型'), true);
  assert.equal(Object.hasOwn(rows[0], '现状电缆1'), true);
  assert.equal(Object.hasOwn(rows[0], '现状电缆2'), true);
  assert.equal(Object.hasOwn(rows[0], '现状给水管径'), true);
  assert.equal(Object.hasOwn(rows[0], '现状排水管径'), true);
  assert.equal(Object.hasOwn(rows[0], '现状油烟管尺寸'), true);
  assert.equal(Object.hasOwn(rows[0], '餐饮类型'), false);
  assert.equal(Object.hasOwn(rows[0], '商铺名称'), false);
  assert.equal(rows[0].现状电缆1, null);
  assert.equal(rows[0].现状电缆2, null);
  assert.equal(rows[0].现状给水管径, null);
  assert.equal(rows[0].现状排水管径, null);
  assert.equal(rows[0].现状油烟管尺寸, null);
});

test('resolves supported business type names for batch import', () => {
  assert.equal(resolveDiningTypeId('轻餐'), 'light');
  assert.equal(resolveDiningTypeId('普通餐饮'), 'standard');
  assert.equal(resolveDiningTypeId('重油烟餐饮'), 'heavy');
  assert.equal(resolveDiningTypeId('重餐'), 'heavy');
  assert.equal(resolveDiningTypeId('零售'), 'retail');
  assert.equal(resolveDiningTypeId('生活服务'), 'service');
  assert.equal(resolveDiningTypeId('超市'), 'supermarket');
});

test('builds batch MEP condition rows from uploaded shop records', () => {
  const rows = buildBatchPlanRows([
    {
      商铺编号: 'L1-101',
      楼层: 'L1',
      业态类型: '普通餐饮',
      面积: 120,
      指定用电量: '',
      现状电缆1: '4×16+1×10',
      现状电缆2: '4×10+1×6',
      现状给水管径: 'DN25',
      现状排水管径: 'DN110',
      现状油烟管尺寸: '500×400',
    },
    {
      商铺编号: 'L2-205',
      楼层: 'L2',
      业态类型: '轻餐',
      面积: 80,
      指定用电量: 90,
    },
  ]);

  assert.equal(rows.length, 2);
  assert.equal(rows[0].商铺编号, 'L1-101');
  assert.equal(rows[0].楼层, 'L1');
  assert.equal(rows[0].业态类型, '普通餐饮');
  assert.equal(rows[0].现状电缆1, '4×16+1×10');
  assert.equal(rows[0].现状电缆2, '4×10+1×6');
  assert.equal(rows[0].现状给水管径, 'DN25');
  assert.equal(rows[0].现状排水管径, 'DN110');
  assert.equal(rows[0].现状油烟管尺寸, '500×400');
  assert.equal(rows[0].估算用电负荷, '48 kW');
  assert.equal(rows[0].配套电缆规格, 'YJV 4×25+1×16mm²');
  assert.equal(rows[0].供水管径, 'DN40');
  assert.equal(rows[0].排水管径, 'DN160');
  assert.equal(rows[0].排油烟风量, '3840 m3/h');
  assert.equal(rows[0].占用隔油池容积, '1.2 m3');
  assert.equal(rows[0].测算依据, undefined);
  assert.equal(rows[0].是否启用指定用电量, undefined);
  assert.equal(rows[0].处理状态, '成功');
  assert.equal(rows[0].错误说明, '');

  assert.equal(rows[1].估算用电负荷, '90 kW');
  assert.equal(rows[1].指定用电量, 90);
});

test('allows missing area for batch rows when specified demand is filled', () => {
  const rows = buildBatchPlanRows([
    {
      商铺编号: 'L2-205',
      楼层: 'L2',
      业态类型: '轻餐',
      面积: '',
      指定用电量: 20,
    },
  ]);

  assert.equal(rows[0].处理状态, '成功');
  assert.equal(rows[0].面积, '');
  assert.equal(rows[0].估算用电负荷, '20 kW');
  assert.equal(rows[0].配套电缆规格, 'YJV 4×10+1×6mm²');
  assert.equal(rows[0].供水管径, '');
  assert.equal(rows[0].排水管径, '');
  assert.equal(rows[0].排油烟风量, '');
  assert.equal(rows[0].占用隔油池容积, '');
});

test('still requires area for batch rows without specified demand', () => {
  const rows = buildBatchPlanRows([
    {
      商铺编号: 'L2-205',
      楼层: 'L2',
      业态类型: '轻餐',
      面积: '',
      指定用电量: '',
    },
  ]);

  assert.equal(rows[0].处理状态, '失败');
  assert.match(rows[0].错误说明, /面积/);
});

test('builds non-catering batch rows with only electrical conditions filled', () => {
  const rows = buildBatchPlanRows([
    {
      商铺编号: 'L3-301',
      楼层: 'L3',
      业态类型: '零售',
      面积: 200,
      指定用电量: '',
    },
    {
      商铺编号: 'B1-101',
      楼层: 'B1',
      业态类型: '超市',
      面积: 200,
      指定用电量: '',
    },
  ]);

  assert.equal(rows[0].估算用电负荷, '24 kW');
  assert.equal(rows[0].配套电缆规格, 'YJV 4×10+1×6mm²');
  assert.equal(rows[0].供水管径, '');
  assert.equal(rows[0].排水管径, '');
  assert.equal(rows[0].排油烟风量, '');
  assert.equal(rows[0].占用隔油池容积, '');
  assert.equal(rows[0].测算依据, undefined);
  assert.equal(rows[1].估算用电负荷, '30 kW');
  assert.equal(rows[1].测算依据, undefined);
});

test('keeps invalid uploaded shop rows in the result with clear error text', () => {
  const rows = buildBatchPlanRows([
    {
      商铺编号: 'B1-001',
      楼层: 'B1',
      业态类型: '未知业态',
      面积: 0,
      指定用电量: '',
    },
  ]);

  assert.equal(rows.length, 1);
  assert.equal(rows[0].商铺编号, 'B1-001');
  assert.equal(rows[0].处理状态, '失败');
  assert.match(rows[0].错误说明, /面积|业态类型/);
  assert.equal(rows[0].风险提示, undefined);
});

test('rejects non-empty invalid specified demand without a separate enable column', () => {
  const rows = buildBatchPlanRows([
    {
      商铺编号: 'L1-102',
      楼层: 'L1',
      业态类型: '轻餐',
      面积: 80,
      指定用电量: 'abc',
    },
  ]);

  assert.equal(rows[0].处理状态, '失败');
  assert.match(rows[0].错误说明, /指定用电量/);
});
