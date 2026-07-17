(function attachSystemPlan(global) {
  const REQUIRED_INPUT_SHEETS = [
    '机电条件测算结果',
    '供电系统',
    '餐饮排水系统',
    '排油烟系统',
  ];

  const BASE_INPUT_HEADERS = ['楼层', '商铺编号', '业态类型', '面积'];

  const REQUIRED_SHEET_HEADERS = {
    机电条件测算结果: BASE_INPUT_HEADERS,
    供电系统: BASE_INPUT_HEADERS,
    餐饮排水系统: BASE_INPUT_HEADERS,
    排油烟系统: BASE_INPUT_HEADERS,
  };

  const SYSTEM_PLAN_OUTPUT_HEADERS = [
    '楼层',
    '商铺编号',
    '业态类型',
    '面积',
    '供电系统配置',
    '餐饮排水系统配置',
    '排油烟系统配置',
    '处理状态',
    '备注',
  ];

  function normalizeText(value) {
    return String(value ?? '').trim();
  }

  function validateSystemPlanWorkbook(workbookData) {
    const sheetNames = Array.isArray(workbookData?.sheetNames)
      ? workbookData.sheetNames
      : [];
    const headersBySheet = workbookData?.headersBySheet || {};
    const missingSheets = REQUIRED_INPUT_SHEETS.filter((sheetName) => !sheetNames.includes(sheetName));

    if (missingSheets.length > 0) {
      return {
        valid: false,
        message: `上传文件缺少工作表：${missingSheets.join('、')}。请使用模块3生成的 Excel 文件。`,
      };
    }

    for (const sheetName of REQUIRED_INPUT_SHEETS) {
      const headers = Array.isArray(headersBySheet[sheetName])
        ? headersBySheet[sheetName].map(normalizeText)
        : [];
      const missingHeaders = REQUIRED_SHEET_HEADERS[sheetName]
        .filter((header) => !headers.includes(header));

      if (missingHeaders.length > 0) {
        return {
          valid: false,
          message: `工作表“${sheetName}”缺少列：${missingHeaders.join('、')}。`,
        };
      }
    }

    return { valid: true, message: '' };
  }

  function buildSystemPlanRows(workbookData) {
    const sourceRows = workbookData?.rowsBySheet?.机电条件测算结果 || [];
    const validSourceStatuses = new Set(['成功', '失败']);

    return sourceRows
      .filter((row) => (
        normalizeText(row?.商铺编号) !== ''
        && validSourceStatuses.has(normalizeText(row?.处理状态))
      ))
      .map((row) => ({
        楼层: normalizeText(row.楼层),
        商铺编号: normalizeText(row.商铺编号),
        业态类型: normalizeText(row.业态类型),
        面积: row.面积 ?? '',
        供电系统配置: '待配置',
        餐饮排水系统配置: '待配置',
        排油烟系统配置: '待配置',
        处理状态: '待配置规则',
        备注: '模块4计算框架已建立，待补充机电配置系统计算逻辑。',
      }));
  }

  const api = {
    REQUIRED_INPUT_SHEETS,
    REQUIRED_SHEET_HEADERS,
    SYSTEM_PLAN_OUTPUT_HEADERS,
    validateSystemPlanWorkbook,
    buildSystemPlanRows,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepSystemPlan = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
