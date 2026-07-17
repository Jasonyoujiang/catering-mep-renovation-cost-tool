(function attachSystemPlan(global) {
  const cableTable = typeof require === 'function'
    ? require('./cable-table.js')
    : global.MepCableTable;

  const REQUIRED_INPUT_SHEETS = [
    '机电条件测算结果',
    '供电系统',
    '餐饮排水系统',
    '排油烟系统',
  ];

  const BASE_INPUT_HEADERS = ['楼层', '商铺编号', '业态类型', '面积'];

  const REQUIRED_SHEET_HEADERS = {
    机电条件测算结果: BASE_INPUT_HEADERS,
    供电系统: [
      ...BASE_INPUT_HEADERS,
      '指定用电量',
      '估算用电负荷',
      '配电箱编号',
      '变压器编号',
    ],
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

  const SUPPLY_SYSTEM_PLAN_HEADERS = [
    '楼层',
    '商铺编号',
    '业态类型',
    '面积',
    '指定用电量',
    '现状电缆1',
    '现状电缆2',
    '估算用电负荷',
    '配置功率',
    '配套电缆规格',
    '配电箱编号',
    '配电箱总功率',
    '配电箱电缆规格',
    '变压器编号',
  ];

  function normalizeText(value) {
    return String(value ?? '').trim();
  }

  function parsePowerKw(value) {
    const text = normalizeText(value).replace(/,/g, '');
    if (!text) {
      return null;
    }

    const match = text.match(/-?\d+(?:\.\d+)?/);
    if (!match) {
      return null;
    }

    const powerKw = Number(match[0]);
    return Number.isFinite(powerKw) && powerKw > 0 ? powerKw : null;
  }

  function roundPowerKw(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  function formatPowerKw(value) {
    return `${roundPowerKw(value)} kW`;
  }

  function resolveConfigurationPowerKw(row) {
    return parsePowerKw(row?.指定用电量) ?? parsePowerKw(row?.估算用电负荷);
  }

  function selectSupplyCableByPowerKw(powerKw) {
    const selection = cableTable.selectCableByDemandKw(powerKw);
    return selection.isOutOfRange
      ? selection.recommendedCable
      : cableTable.formatYjvCableSpecification(selection.recommendedCable);
  }

  function compareGroupIds(left, right) {
    const leftText = normalizeText(left);
    const rightText = normalizeText(right);

    if (!leftText && rightText) {
      return 1;
    }
    if (leftText && !rightText) {
      return -1;
    }

    return leftText.localeCompare(rightText, 'zh-CN', {
      numeric: true,
      sensitivity: 'base',
    });
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
        供电系统配置: '已生成',
        餐饮排水系统配置: '待配置',
        排油烟系统配置: '待配置',
        处理状态: '部分完成',
        备注: '供电系统方案已生成；餐饮排水系统和排油烟系统规则待补充。',
      }));
  }

  function buildSupplySystemPlan(workbookData) {
    const sourceRows = workbookData?.rowsBySheet?.供电系统 || [];
    const preparedRows = sourceRows
      .filter((row) => normalizeText(row?.商铺编号) !== '')
      .map((row, originalIndex) => {
        const configurationPowerKw = resolveConfigurationPowerKw(row);
        return {
          originalIndex,
          configurationPowerKw,
          row: {
            楼层: normalizeText(row.楼层),
            商铺编号: normalizeText(row.商铺编号),
            业态类型: normalizeText(row.业态类型),
            面积: row.面积 ?? '',
            指定用电量: row.指定用电量 ?? '',
            现状电缆1: normalizeText(row.现状电缆1),
            现状电缆2: normalizeText(row.现状电缆2),
            估算用电负荷: normalizeText(row.估算用电负荷),
            配置功率: configurationPowerKw ? formatPowerKw(configurationPowerKw) : '',
            配套电缆规格: normalizeText(row.配套电缆规格),
            配电箱编号: normalizeText(row.配电箱编号),
            配电箱总功率: '',
            配电箱电缆规格: '',
            变压器编号: normalizeText(row.变压器编号),
          },
        };
      })
      .sort((left, right) => (
        compareGroupIds(left.row.配电箱编号, right.row.配电箱编号)
        || left.originalIndex - right.originalIndex
      ));

    const boxGroups = [];
    let currentGroup = null;

    preparedRows.forEach((item, index) => {
      const distributionBoxId = item.row.配电箱编号;
      if (!distributionBoxId) {
        return;
      }

      if (!currentGroup || currentGroup.distributionBoxId !== distributionBoxId) {
        currentGroup = {
          distributionBoxId,
          startIndex: index,
          endIndex: index,
          totalPowerKw: 0,
          cableSpecification: '',
        };
        boxGroups.push(currentGroup);
      }

      currentGroup.endIndex = index;
      currentGroup.totalPowerKw += item.configurationPowerKw || 0;
    });

    boxGroups.forEach((group) => {
      group.totalPowerKw = roundPowerKw(group.totalPowerKw);
      group.cableSpecification = group.totalPowerKw > 0
        ? selectSupplyCableByPowerKw(group.totalPowerKw)
        : '';
      for (let index = group.startIndex; index <= group.endIndex; index += 1) {
        preparedRows[index].row.配电箱总功率 = formatPowerKw(group.totalPowerKw);
        preparedRows[index].row.配电箱电缆规格 = group.cableSpecification;
      }
    });

    const transformerTotals = new Map();
    preparedRows.forEach((item) => {
      const transformerId = item.row.变压器编号;
      if (!transformerId) {
        return;
      }

      transformerTotals.set(
        transformerId,
        (transformerTotals.get(transformerId) || 0) + (item.configurationPowerKw || 0)
      );
    });

    const transformerStats = [...transformerTotals.entries()]
      .sort(([leftId], [rightId]) => compareGroupIds(leftId, rightId))
      .map(([transformerId, totalPowerKw]) => ({
        变压器编号: transformerId,
        变压器服务商铺总功率: formatPowerKw(totalPowerKw),
      }));

    return {
      rows: preparedRows.map((item) => item.row),
      boxGroups,
      transformerStats,
    };
  }

  const api = {
    REQUIRED_INPUT_SHEETS,
    REQUIRED_SHEET_HEADERS,
    SYSTEM_PLAN_OUTPUT_HEADERS,
    SUPPLY_SYSTEM_PLAN_HEADERS,
    validateSystemPlanWorkbook,
    buildSystemPlanRows,
    buildSupplySystemPlan,
    parsePowerKw,
    resolveConfigurationPowerKw,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepSystemPlan = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
