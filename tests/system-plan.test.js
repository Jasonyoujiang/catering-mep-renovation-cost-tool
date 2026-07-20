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
      餐饮排水系统配置: '已生成',
      排油烟系统配置: '已生成',
      处理状态: '已完成',
      备注: '供电系统、餐饮排水系统和排油烟系统方案已生成。',
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

test('selects high-power distribution box cables by the supplied tiers', () => {
  const cases = [
    [500, '2×(YJV 4×120+1×70mm²)'],
    [550, '2×(YJV 4×120+1×70mm²)'],
    [550.01, '2×(YJV 4×150+1×70mm²)'],
    [650, '2×(YJV 4×150+1×70mm²)'],
    [650.01, '2×(YJV 4×185+1×95mm²)'],
    [750, '2×(YJV 4×185+1×95mm²)'],
    [750.01, '2×(YJV 4×240+1×120mm²)'],
    [1000, '2×(YJV 4×240+1×120mm²)'],
    [1000.01, '需专项复核供电方案'],
  ];

  cases.forEach(([powerKw, expected]) => {
    assert.equal(systemPlan.selectSupplyCableByPowerKw(powerKw), expected);
  });
});

test('groups grease trap ids case-insensitively and sums occupied volume', () => {
  const workbookData = createWorkbookData();
  workbookData.rowsBySheet.餐饮排水系统 = [
    { 商铺编号: '1003', 隔油池编号: 'P2', 占用隔油池容积: '无需新增' },
    { 商铺编号: '1001', 隔油池编号: 'p1', 占用隔油池容积: '0.5 m3' },
    { 商铺编号: '1002', 隔油池编号: 'P1', 占用隔油池容积: '0.7 m3' },
  ];

  const result = systemPlan.buildDrainageSystemPlan(workbookData);

  assert.deepEqual(result.rows.map((row) => row.商铺编号), ['1001', '1002', '1003']);
  assert.deepEqual(result.rows.map((row) => row.隔油池编号), ['P1', 'P1', 'P2']);
  assert.equal(result.rows[0].隔油池容量, '1.2 m3');
  assert.equal(result.rows[1].隔油池容量, '1.2 m3');
  assert.equal(result.rows[2].隔油池容量, '0 m3');
  assert.equal(result.groups.length, 2);
});

test('groups exhaust equipment ids case-insensitively and sums air volume', () => {
  const workbookData = createWorkbookData();
  workbookData.rowsBySheet.排油烟系统 = [
    { 商铺编号: '1003', 风机及油烟处理设备编号: 'P3', 排油烟风量: '无需新增' },
    { 商铺编号: '1001', 风机及油烟处理设备编号: 'p2', 排油烟风量: '600 m3/h' },
    { 商铺编号: '1002', 风机及油烟处理设备编号: 'P2', 排油烟风量: '1400 m3/h' },
  ];

  const result = systemPlan.buildExhaustSystemPlan(workbookData);

  assert.deepEqual(result.rows.map((row) => row.商铺编号), ['1001', '1002', '1003']);
  assert.deepEqual(result.rows.map((row) => row.风机及油烟处理设备编号), ['P2', 'P2', 'P3']);
  assert.equal(result.rows[0].风机及油烟处理设备风量, '2000 m3/h');
  assert.equal(result.rows[1].风机及油烟处理设备风量, '2000 m3/h');
  assert.equal(result.rows[2].风机及油烟处理设备风量, '0 m3/h');
  assert.equal(result.groups.length, 2);
});
