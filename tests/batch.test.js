const test = require('node:test');
const assert = require('node:assert/strict');

const {
  BATCH_TEMPLATE_HEADERS,
  BATCH_OUTPUT_HEADERS,
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
    '是否启用指定用电量',
    '指定用电量',
  ]);

  assert.equal(BATCH_OUTPUT_HEADERS.includes('风险提示'), false);
  assert.equal(BATCH_OUTPUT_HEADERS.includes('测算依据'), true);
});

test('creates template example rows with the renamed shop and business type fields', () => {
  const rows = createTemplateRows();

  assert.equal(rows.length >= 2, true);
  assert.equal(Object.hasOwn(rows[0], '商铺编号'), true);
  assert.equal(Object.hasOwn(rows[0], '楼层'), true);
  assert.equal(Object.hasOwn(rows[0], '业态类型'), true);
  assert.equal(Object.hasOwn(rows[0], '餐饮类型'), false);
  assert.equal(Object.hasOwn(rows[0], '商铺名称'), false);
});

test('resolves supported business type names for batch import', () => {
  assert.equal(resolveDiningTypeId('轻餐'), 'light');
  assert.equal(resolveDiningTypeId('普通餐饮'), 'standard');
  assert.equal(resolveDiningTypeId('重油烟餐饮'), 'heavy');
  assert.equal(resolveDiningTypeId('重餐'), 'heavy');
});

test('builds batch MEP condition rows from uploaded shop records', () => {
  const rows = buildBatchPlanRows([
    {
      商铺编号: 'L1-101',
      楼层: 'L1',
      业态类型: '普通餐饮',
      面积: 120,
      是否启用指定用电量: '否',
      指定用电量: '',
    },
    {
      商铺编号: 'L2-205',
      楼层: 'L2',
      业态类型: '轻餐',
      面积: 80,
      是否启用指定用电量: '是',
      指定用电量: 90,
    },
  ]);

  assert.equal(rows.length, 2);
  assert.equal(rows[0].商铺编号, 'L1-101');
  assert.equal(rows[0].楼层, 'L1');
  assert.equal(rows[0].业态类型, '普通餐饮');
  assert.equal(rows[0].估算用电负荷, '48 kW');
  assert.equal(rows[0].配套电缆规格, 'YJV 4×25+1×16mm²');
  assert.equal(rows[0].供水管径, 'DN40');
  assert.equal(rows[0].排水管径, 'DN160');
  assert.equal(rows[0].排油烟风量, '3840 m3/h');
  assert.equal(rows[0].占用隔油池容积, '1.2 m3');
  assert.equal(rows[0].测算依据.includes('普通餐饮 0.4 kW/m2'), true);
  assert.equal(rows[0].处理状态, '成功');
  assert.equal(rows[0].错误说明, '');

  assert.equal(rows[1].估算用电负荷, '90 kW');
  assert.equal(rows[1].测算依据.includes('手动指定用电量'), true);
});

test('keeps invalid uploaded shop rows in the result with clear error text', () => {
  const rows = buildBatchPlanRows([
    {
      商铺编号: 'B1-001',
      楼层: 'B1',
      业态类型: '未知业态',
      面积: 0,
      是否启用指定用电量: '否',
      指定用电量: '',
    },
  ]);

  assert.equal(rows.length, 1);
  assert.equal(rows[0].商铺编号, 'B1-001');
  assert.equal(rows[0].处理状态, '失败');
  assert.match(rows[0].错误说明, /面积|业态类型/);
  assert.equal(rows[0].风险提示, undefined);
});
