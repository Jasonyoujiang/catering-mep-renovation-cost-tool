const test = require('node:test');
const assert = require('node:assert/strict');

const systemPlan = require('../data/system-plan.js');

function createWorkbookData(overrides = {}) {
  const rows = [
    {
      楼层: 'L1',
      商铺编号: '1001',
      业态类型: '普通餐饮',
      面积: '120',
      处理状态: '成功',
    },
  ];
  const headers = ['楼层', '商铺编号', '业态类型', '面积'];

  return {
    sheetNames: [...systemPlan.REQUIRED_INPUT_SHEETS],
    rowsBySheet: Object.fromEntries(
      systemPlan.REQUIRED_INPUT_SHEETS.map((sheetName) => [sheetName, rows])
    ),
    headersBySheet: Object.fromEntries(
      systemPlan.REQUIRED_INPUT_SHEETS.map((sheetName) => [
        sheetName,
        [...systemPlan.REQUIRED_SHEET_HEADERS[sheetName]],
      ])
    ),
    ...overrides,
  };
}

test('requires all module 3 worksheets for module 4 input', () => {
  const workbookData = createWorkbookData({
    sheetNames: ['机电条件测算结果', '供电系统'],
  });
  const result = systemPlan.validateSystemPlanWorkbook(workbookData);

  assert.equal(result.valid, false);
  assert.match(result.message, /餐饮排水系统/);
  assert.match(result.message, /排油烟系统/);
});

test('requires the identifying columns in every input worksheet', () => {
  const workbookData = createWorkbookData();
  workbookData.headersBySheet.供电系统 = systemPlan.REQUIRED_SHEET_HEADERS.供电系统
    .filter((header) => header !== '业态类型');
  const result = systemPlan.validateSystemPlanWorkbook(workbookData);

  assert.equal(result.valid, false);
  assert.equal(result.message, '工作表“供电系统”缺少列：业态类型。');
});

test('accepts a complete module 3 workbook structure', () => {
  assert.deepEqual(systemPlan.validateSystemPlanWorkbook(createWorkbookData()), {
    valid: true,
    message: '',
  });
});

test('builds placeholder system plan rows and ignores blank source rows', () => {
  const workbookData = createWorkbookData();
  workbookData.rowsBySheet.机电条件测算结果.push({
    楼层: '',
    商铺编号: '',
    业态类型: '',
    面积: '',
  });
  workbookData.rowsBySheet.机电条件测算结果.push({
    楼层: '填充颜色说明',
    商铺编号: '',
    业态类型: '',
    面积: '',
  });
  const rows = systemPlan.buildSystemPlanRows(workbookData);

  assert.deepEqual(rows, [
    {
      楼层: 'L1',
      商铺编号: '1001',
      业态类型: '普通餐饮',
      面积: '120',
      供电系统配置: '已生成',
      餐饮排水系统配置: '待配置',
      排油烟系统配置: '待配置',
      处理状态: '部分完成',
      备注: '供电系统方案已生成；餐饮排水系统和排油烟系统规则待补充。',
    },
  ]);
});

test('uses specified demand before estimated load for configuration power', () => {
  assert.equal(systemPlan.resolveConfigurationPowerKw({
    指定用电量: 90,
    估算用电负荷: '48 kW',
  }), 90);
  assert.equal(systemPlan.resolveConfigurationPowerKw({
    指定用电量: '',
    估算用电负荷: '48 kW',
  }), 48);
});

test('groups supply rows by distribution box and summarizes transformer power', () => {
  const workbookData = createWorkbookData();
  workbookData.rowsBySheet.供电系统 = [
    {
      楼层: 'L1', 商铺编号: '1003', 业态类型: '零售', 面积: 100,
      指定用电量: '', 估算用电负荷: '30 kW', 配套电缆规格: 'YJV 4×10+1×6mm²',
      配电箱编号: 'AL-2', 变压器编号: 'A1',
    },
    {
      楼层: 'L1', 商铺编号: '1001', 业态类型: '普通餐饮', 面积: 100,
      指定用电量: 20, 估算用电负荷: '40 kW', 配套电缆规格: 'YJV 4×10+1×6mm²',
      配电箱编号: 'AL-1', 变压器编号: 'A1',
    },
    {
      楼层: 'L1', 商铺编号: '1002', 业态类型: '普通餐饮', 面积: 100,
      指定用电量: '', 估算用电负荷: '25 kW', 配套电缆规格: 'YJV 4×10+1×6mm²',
      配电箱编号: 'AL-1', 变压器编号: 'A1',
    },
  ];

  const result = systemPlan.buildSupplySystemPlan(workbookData);

  assert.deepEqual(result.rows.map((row) => row.商铺编号), ['1001', '1002', '1003']);
  assert.deepEqual(result.rows.map((row) => row.配置功率), ['20 kW', '25 kW', '30 kW']);
  assert.equal(result.rows[0].配电箱总功率, '45 kW');
  assert.equal(result.rows[1].配电箱总功率, '45 kW');
  assert.equal(result.rows[0].配电箱电缆规格, 'YJV 4×16+1×10mm²');
  assert.equal(result.rows[2].配电箱总功率, '30 kW');
  assert.equal(result.boxGroups.length, 2);
  assert.deepEqual(result.transformerStats, [
    { 变压器编号: 'A1', 变压器服务商铺总功率: '75 kW' },
  ]);
});

test('uses module 1 special review result when a box total exceeds 500 kW', () => {
  const workbookData = createWorkbookData();
  workbookData.rowsBySheet.供电系统 = [
    { 商铺编号: '1001', 指定用电量: 350, 估算用电负荷: '350 kW', 配电箱编号: 'AL-1' },
    { 商铺编号: '1002', 指定用电量: 234, 估算用电负荷: '234 kW', 配电箱编号: 'AL-1' },
  ];

  const result = systemPlan.buildSupplySystemPlan(workbookData);

  assert.equal(result.rows[0].配电箱总功率, '584 kW');
  assert.equal(result.rows[0].配电箱电缆规格, '需专项复核供电方案');
});
