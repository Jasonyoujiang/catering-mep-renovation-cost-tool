const test = require('node:test');
const assert = require('node:assert/strict');

global.MepRenovationRules = require('../data/rules.js');
global.MepCostCatalog = require('../data/items.js');
global.MepBatchPlanner = require('../data/batch.js');

const {
  validateAreaInput,
  resolvePlanAreaInput,
  validateOptionalDemandInput,
  resolveSpecifiedDemand,
  formatCurrency,
  buildPlanResultRows,
  buildCostResultRows,
  buildBatchPreviewRows,
  getTemplateColumnWidth,
  getResultColumnWidth,
  getBatchResultCellFillColor,
  applyTemplateCellStyle,
  SUPPLY_SYSTEM_HEADERS,
  createStyledTemplateWorkbook,
  createStyledResultWorkbook,
} = require('../app.js');

test('validates a positive shop area input', () => {
  assert.deepEqual(validateAreaInput('88.5'), {
    valid: true,
    area: 88.5,
    message: '',
  });
});

test('rejects blank, zero, and non-number shop area input', () => {
  assert.equal(validateAreaInput('').valid, false);
  assert.equal(validateAreaInput('0').valid, false);
  assert.equal(validateAreaInput('abc').valid, false);
});

test('allows blank or zero area only when specified demand is enabled', () => {
  assert.deepEqual(resolvePlanAreaInput(true, ''), {
    valid: true,
    area: null,
    message: '',
  });
  assert.deepEqual(resolvePlanAreaInput(true, '0'), {
    valid: true,
    area: null,
    message: '',
  });
  assert.equal(resolvePlanAreaInput(false, '').valid, false);
  assert.equal(resolvePlanAreaInput(false, '0').valid, false);
  assert.equal(resolvePlanAreaInput(true, '120').area, 120);
});

test('validates optional specified electrical demand input', () => {
  assert.deepEqual(validateOptionalDemandInput(''), {
    valid: true,
    value: null,
    message: '',
  });
  assert.deepEqual(validateOptionalDemandInput('90'), {
    valid: true,
    value: 90,
    message: '',
  });
  assert.deepEqual(validateOptionalDemandInput('-1'), {
    valid: false,
    value: null,
    message: '指定用电量必须为空，或填写大于 0 的数字。',
  });
});

test('uses specified demand only when the checkbox is enabled', () => {
  assert.equal(resolveSpecifiedDemand(false, '90').valid, true);
  assert.equal(resolveSpecifiedDemand(false, '90').value, null);

  assert.deepEqual(resolveSpecifiedDemand(true, '90'), {
    valid: true,
    value: 90,
    message: '',
  });

  assert.deepEqual(resolveSpecifiedDemand(true, ''), {
    valid: false,
    value: null,
    message: '勾选指定用电量后，请填写大于 0 的用电量。',
  });
});

test('formats Chinese currency for cost lookup', () => {
  assert.equal(formatCurrency(18500), '¥18,500');
  assert.equal(formatCurrency(54.264), '¥54.26');
});

test('builds renovation plan rows for table output', () => {
  const plan = global.MepRenovationRules.calculateRenovationPlan(120, 'standard');
  const rows = buildPlanResultRows(plan);

  assert.deepEqual(rows, [
    ['估算用电负荷', '48 kW', '按 普通餐饮 0.4 kW/m2 经验系数估算，暂未考虑设备清单和同时使用系数。'],
    ['配套电缆规格', 'YJV 4×25+1×16mm²', '按 48 kW 估算负荷匹配，保守向上取表中 50 kW 档，Kx=0.9，计算电流约 80.4 A；需核实上级开关容量、计量方式和电缆敷设路径。'],
    ['供水管径', 'DN40', '需结合厨房用水点、热水系统和原管网压力复核。'],
    ['排水管径', 'DN160', '需复核排水坡度、隔油接入和检修条件。'],
    ['排油烟风量', '3840 m3/h', '按 32 m3/h/m2 指标计算。'],
    ['占用隔油池容积', '1.2 m3', '按 1 m3/100m2 指标计算，不足 100m2 部分按面积比例计算。'],
  ]);
});

test('builds cost result rows from a selected category and specification', () => {
  const rows = buildCostResultRows('cable', 'yjv-4x95-1x50');

  assert.deepEqual(rows, [
    ['子项名称', '电缆'],
    ['规格型号', 'YJV 4×95+1×50'],
    ['计量单位', 'm'],
    ['参考单价', '¥519.64'],
    ['价格说明', 'YJV 0.6/1kV 国标含税中价位每米成本×1.4综合系数，系数考虑人工和配件；不含复杂桥架、拆改、夜间施工及铜价波动。'],
  ]);
});

test('builds cost result rows for renovation unit price summary items', () => {
  const rows = buildCostResultRows('renovationUnitPriceSummary', 'renovation-unit-price-001');

  assert.deepEqual(rows, [
    ['子项名称', '改造项单方造价'],
    ['规格型号', '废水排水管/排水条件'],
    ['计量单位', '㎡'],
    ['参考单价', '¥46.15'],
    ['价格说明', '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本13条，样本单价区间约 ¥40-¥70/㎡；已过滤频次低于2次及倍差大于等于3的项目。'],
  ]);
});

test('sets readable Excel template column widths for long headers', () => {
  assert.equal(getTemplateColumnWidth('商铺编号'), 14);
  assert.equal(getTemplateColumnWidth('指定用电量'), 14);
  assert.equal(getTemplateColumnWidth('现状电缆1'), 18);
  assert.equal(getTemplateColumnWidth('现状电缆2'), 18);
  assert.equal(getTemplateColumnWidth('未知字段'), 14);
});

test('sets Excel result widths for key output fields', () => {
  assert.equal(getResultColumnWidth('错误说明'), 36);
  assert.equal(getResultColumnWidth('配套电缆规格'), 24);
  assert.equal(getResultColumnWidth('现状电缆1'), 18);
  assert.equal(getResultColumnWidth('现状油烟管尺寸'), 18);
  assert.equal(getResultColumnWidth('商铺编号'), 14);
});

test('highlights generated result cells when existing conditions need review', () => {
  const row = {
    现状电缆1: '',
    现状电缆2: '4×10+1×6',
    现状给水管径: 'DN20',
    现状排水管径: 'DN100',
    现状油烟管尺寸: '500×400',
    配套电缆规格: 'YJV 4×25+1×16mm²',
    供水管径: 'DN40',
    排水管径: 'DN160',
    排油烟风量: '3840 m3/h',
  };

  assert.equal(getBatchResultCellFillColor(row, '配套电缆规格'), 'FFFFF2CC');
  assert.equal(getBatchResultCellFillColor(row, '供水管径'), 'FFFFF2CC');
  assert.equal(getBatchResultCellFillColor(row, '排水管径'), 'FFFFF2CC');
  assert.equal(getBatchResultCellFillColor(row, '排油烟风量'), 'FFFFF2CC');
  assert.equal(getBatchResultCellFillColor(row, '估算用电负荷'), null);
  assert.equal(getBatchResultCellFillColor({ ...row, 现状电缆2: '' }, '配套电缆规格'), null);
  assert.equal(getBatchResultCellFillColor({ ...row, 供水管径: '' }, '供水管径'), null);
  assert.equal(getBatchResultCellFillColor({ ...row, 现状油烟管尺寸: '' }, '排油烟风量'), null);
});

test('uses pale blue for every no-addition result', () => {
  const row = {
    现状电缆1: '4×50+1×25',
    配套电缆规格: '无需新增',
    供水管径: '无需新增',
    排水管径: '无需新增',
    排油烟风量: '无需新增',
    占用隔油池容积: '无需新增',
  };

  assert.equal(getBatchResultCellFillColor(row, '配套电缆规格'), 'FFDDEBF7');
  assert.equal(getBatchResultCellFillColor(row, '供水管径'), 'FFDDEBF7');
  assert.equal(getBatchResultCellFillColor(row, '排水管径'), 'FFDDEBF7');
  assert.equal(getBatchResultCellFillColor(row, '排油烟风量'), 'FFDDEBF7');
  assert.equal(getBatchResultCellFillColor(row, '占用隔油池容积'), 'FFDDEBF7');
});

test('limits the batch preview table to five rows', () => {
  const rows = Array.from({ length: 6 }, (_, index) => ({
    商铺编号: `L1-${String(index + 1).padStart(3, '0')}`,
    楼层: 'L1',
    业态类型: '普通餐饮',
    面积: 100,
    估算用电负荷: '40 kW',
    配套电缆规格: 'YJV 4×25+1×16mm²',
    处理状态: '成功',
  }));

  const previewRows = buildBatchPreviewRows(rows);

  assert.equal(previewRows.length, 5);
  assert.deepEqual(previewRows.at(-1).slice(0, 2), ['L1', 'L1-005']);
});

test('applies centered and colored styles to Excel template cells', () => {
  const headerCell = {};
  const bodyCell = {};

  applyTemplateCellStyle(headerCell, { isHeader: true });
  applyTemplateCellStyle(bodyCell, { fillColor: 'FFF8FAF7' });

  assert.deepEqual(headerCell.alignment, {
    horizontal: 'center',
    vertical: 'middle',
    wrapText: true,
  });
  assert.equal(headerCell.font.bold, true);
  assert.equal(headerCell.font.color.argb, 'FFFFFFFF');
  assert.equal(headerCell.fill.fgColor.argb, 'FF14513F');
  assert.equal(bodyCell.fill.fgColor.argb, 'FFF8FAF7');
  assert.equal(bodyCell.font.name, 'Microsoft YaHei');
});

test('styles all template columns with alternating fills through row 500', () => {
  const ExcelJS = require('../vendor/exceljs.min.js');
  const workbook = createStyledTemplateWorkbook(
    ExcelJS,
    global.MepBatchPlanner.createTemplateRows(),
    global.MepBatchPlanner.BATCH_TEMPLATE_HEADERS,
    '商铺基础信息'
  );
  const worksheet = workbook.getWorksheet('商铺基础信息');

  assert.equal(worksheet.getCell('A1').value, '楼层');
  assert.equal(worksheet.getCell('B1').value, '商铺编号');
  assert.equal(worksheet.getCell('A2').fill.fgColor.argb, 'FFF8FAF7');
  assert.equal(worksheet.getCell('J2').fill.fgColor.argb, 'FFF8FAF7');
  assert.equal(worksheet.getCell('A3').fill.fgColor.argb, 'FFFFFFFF');
  assert.equal(worksheet.getCell('J3').fill.fgColor.argb, 'FFFFFFFF');
  assert.equal(worksheet.getCell('A500').fill.fgColor.argb, 'FFF8FAF7');
  assert.equal(worksheet.getCell('J500').fill.fgColor.argb, 'FFF8FAF7');
});

test('adds fill color reuse explanations below result rows', () => {
  const ExcelJS = require('../vendor/exceljs.min.js');
  const resultRows = global.MepBatchPlanner.buildBatchPlanRows([
    {
      楼层: 'L1',
      商铺编号: 'L1-101',
      业态类型: '零售',
      面积: 100,
      指定用电量: '',
    },
  ]);
  const workbook = createStyledResultWorkbook(
    ExcelJS,
    resultRows,
    global.MepBatchPlanner.BATCH_OUTPUT_HEADERS,
    '机电条件测算结果'
  );
  const worksheet = workbook.getWorksheet('机电条件测算结果');

  assert.equal(worksheet.getCell('A4').value, '填充颜色说明');
  assert.equal(worksheet.getCell('A5').value, '黄色');
  assert.equal(worksheet.getCell('A5').fill.fgColor.argb, 'FFFFF2CC');
  assert.equal(worksheet.getCell('B5').value, '可部分利旧；仍需新增或调整，黄色单元格内容为建议新增内容，需结合现场条件复核。');
  assert.equal(worksheet.getCell('A6').value, '淡蓝色');
  assert.equal(worksheet.getCell('A6').fill.fgColor.argb, 'FFDDEBF7');
  assert.equal(worksheet.getCell('B6').value, '可以完全利旧，现状条件可满足需求；计算结果为“无需新增”。');
  assert.equal(worksheet.getCell('A7').value, '普通底色');
  assert.equal(worksheet.getCell('A7').fill.fgColor.argb, 'FFF8FAF7');
  assert.equal(worksheet.getCell('B7').value, '无法利旧；按当前计算规则直接生成配置建议。');

  assert.equal(worksheet.getCell('L1').border.left.style, 'medium');
  assert.equal(worksheet.getCell('L1').border.left.color.argb, 'FF000000');
  assert.equal(worksheet.getCell('L2').border.left.style, 'medium');
  assert.equal(worksheet.getCell('P1').border.right.style, 'medium');
  assert.equal(worksheet.getCell('P1').border.right.color.argb, 'FF000000');
  assert.equal(worksheet.getCell('P2').border.right.style, 'medium');
  assert.equal(worksheet.getCell('L3').border?.left?.style, undefined);
  assert.equal(worksheet.getCell('P3').border?.right?.style, undefined);
});

test('adds a supply system worksheet with electrical result columns', () => {
  const ExcelJS = require('../vendor/exceljs.min.js');
  const resultRows = global.MepBatchPlanner.buildBatchPlanRows([
    {
      楼层: 'L1',
      商铺编号: 'L1-101',
      业态类型: '普通餐饮',
      面积: 120,
      指定用电量: '',
      现状电缆1: '4×25+1×16',
      现状电缆2: '',
    },
  ]);
  const workbook = createStyledResultWorkbook(
    ExcelJS,
    resultRows,
    global.MepBatchPlanner.BATCH_OUTPUT_HEADERS,
    '机电条件测算结果'
  );
  const worksheet = workbook.getWorksheet('供电系统');

  assert.ok(worksheet);
  assert.deepEqual(
    worksheet.getRow(1).values.slice(1),
    SUPPLY_SYSTEM_HEADERS
  );
  assert.equal(worksheet.getCell('A2').value, 'L1');
  assert.equal(worksheet.getCell('B2').value, 'L1-101');
  assert.equal(worksheet.getCell('F2').value, '4×25+1×16');
  assert.equal(worksheet.getCell('H2').value, '48 kW');
  assert.equal(worksheet.getCell('I2').value, 'YJV 4×10+1×6mm²');
  assert.equal(worksheet.getCell('I2').fill.fgColor.argb, 'FFFFF2CC');
  assert.equal(worksheet.getCell('J1').value, '配电箱编号');
  assert.equal(worksheet.getCell('K1').value, '变压器编号');
  assert.equal(worksheet.getCell('J2').value, null);
  assert.equal(worksheet.getCell('K2').value, null);
  assert.equal(worksheet.getCell('J2').fill.fgColor.argb, 'FFF8FAF7');
  assert.equal(worksheet.getCell('K2').fill.fgColor.argb, 'FFF8FAF7');
  assert.equal(worksheet.getColumn(10).width, 16);
  assert.equal(worksheet.getColumn(11).width, 16);
  assert.equal(worksheet.autoFilter.to, 'K1');
  assert.equal(worksheet.views[0].state, 'frozen');
});
