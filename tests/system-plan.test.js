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
      systemPlan.REQUIRED_INPUT_SHEETS.map((sheetName) => [sheetName, headers])
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
  workbookData.headersBySheet.供电系统 = ['楼层', '商铺编号', '面积'];
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
      供电系统配置: '待配置',
      餐饮排水系统配置: '待配置',
      排油烟系统配置: '待配置',
      处理状态: '待配置规则',
      备注: '模块4计算框架已建立，待补充机电配置系统计算逻辑。',
    },
  ]);
});
