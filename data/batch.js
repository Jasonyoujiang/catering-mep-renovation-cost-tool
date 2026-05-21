(function attachBatchPlanner(global) {
  const rules = typeof require === 'function'
    ? require('./rules.js')
    : global.MepRenovationRules;

  const BATCH_TEMPLATE_HEADERS = [
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
  ];

  const EXISTING_CABLE_SPEC_OPTIONS = [
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
  ];

  const BATCH_OUTPUT_HEADERS = [
    ...BATCH_TEMPLATE_HEADERS,
    '估算用电负荷',
    '配套电缆规格',
    '供水管径',
    '排水管径',
    '排油烟风量',
    '占用隔油池容积',
    '处理状态',
    '错误说明',
  ];

  const DINING_TYPE_LABELS = {
    轻餐: 'light',
    轻餐饮: 'light',
    水吧: 'light',
    饮品: 'light',
    普通餐饮: 'standard',
    标准餐饮: 'standard',
    餐饮: 'standard',
    重油烟餐饮: 'heavy',
    重餐: 'heavy',
    重油烟: 'heavy',
    零售: 'retail',
    生活服务: 'service',
    服务: 'service',
    超市: 'supermarket',
  };

  function normalizeText(value) {
    return String(value ?? '').trim();
  }

  function resolveDiningTypeId(value) {
    const text = normalizeText(value);
    if (!text) {
      return null;
    }

    return DINING_TYPE_LABELS[text] || null;
  }

  function parseArea(value) {
    const area = Number(value);
    if (!Number.isFinite(area) || area <= 0) {
      return null;
    }

    return area;
  }

  function parseSpecifiedDemand(value) {
    if (value === undefined || value === null || normalizeText(value) === '') {
      return null;
    }

    const demand = Number(value);
    if (!Number.isFinite(demand) || demand <= 0) {
      return null;
    }

    return demand;
  }

  function createEmptyResult(row, errors) {
    const result = {};
    BATCH_OUTPUT_HEADERS.forEach((header) => {
      result[header] = '';
    });

    BATCH_TEMPLATE_HEADERS.forEach((header) => {
      result[header] = row[header] ?? '';
    });

    result.处理状态 = '失败';
    result.错误说明 = errors.join('；');
    return result;
  }

  function buildBatchPlanRow(row) {
    const errors = [];
    const areaText = normalizeText(row.面积);
    const area = parseArea(row.面积);
    const diningTypeId = resolveDiningTypeId(row.业态类型);
    const hasSpecifiedDemand = normalizeText(row.指定用电量) !== '';
    const specifiedDemand = parseSpecifiedDemand(row.指定用电量);
    const canSkipArea = hasSpecifiedDemand && (!areaText || Number(row.面积) === 0);

    if (!normalizeText(row.商铺编号)) {
      errors.push('商铺编号为空');
    }

    if (!normalizeText(row.楼层)) {
      errors.push('楼层为空');
    }

    if (!area && !canSkipArea) {
      errors.push('面积必须为大于 0 的数字');
    }

    if (!diningTypeId) {
      errors.push('业态类型需填写轻餐、普通餐饮、重油烟餐饮、零售、生活服务或超市');
    }

    if (hasSpecifiedDemand && !specifiedDemand) {
      errors.push('指定用电量必须为空，或填写大于 0 的数字');
    }

    if (errors.length > 0) {
      return createEmptyResult(row, errors);
    }

    const plan = rules.calculateRenovationPlan(area, diningTypeId, {
      specifiedDemandKw: hasSpecifiedDemand ? specifiedDemand : null,
    });

    return {
      商铺编号: normalizeText(row.商铺编号),
      楼层: normalizeText(row.楼层),
      业态类型: plan.diningType.name,
      面积: area || '',
      指定用电量: hasSpecifiedDemand ? specifiedDemand : '',
      现状电缆1: normalizeText(row.现状电缆1),
      现状电缆2: normalizeText(row.现状电缆2),
      现状给水管径: normalizeText(row.现状给水管径),
      现状排水管径: normalizeText(row.现状排水管径),
      现状油烟管尺寸: normalizeText(row.现状油烟管尺寸),
      估算用电负荷: plan.items.electricalLoad.value,
      配套电缆规格: plan.items.electricalCable.value,
      供水管径: plan.items.water?.value || '',
      排水管径: plan.items.drainage?.value || '',
      排油烟风量: plan.items.exhaust?.value || '',
      占用隔油池容积: plan.items.greaseTrap?.value || '',
      处理状态: '成功',
      错误说明: '',
    };
  }

  function buildBatchPlanRows(rows) {
    return rows.map(buildBatchPlanRow);
  }

  function createTemplateRows() {
    return [
      {
        商铺编号: 'L1-101',
        楼层: 'L1',
        业态类型: '普通餐饮',
        面积: 120,
        指定用电量: '',
        现状电缆1: null,
        现状电缆2: null,
        现状给水管径: null,
        现状排水管径: null,
        现状油烟管尺寸: null,
      },
      {
        商铺编号: 'L2-205',
        楼层: 'L2',
        业态类型: '轻餐',
        面积: 80,
        指定用电量: 90,
        现状电缆1: null,
        现状电缆2: null,
        现状给水管径: null,
        现状排水管径: null,
        现状油烟管尺寸: null,
      },
      {
        商铺编号: 'L3-301',
        楼层: 'L3',
        业态类型: '零售',
        面积: 200,
        指定用电量: '',
        现状电缆1: null,
        现状电缆2: null,
        现状给水管径: null,
        现状排水管径: null,
        现状油烟管尺寸: null,
      },
    ];
  }

  const api = {
    BATCH_TEMPLATE_HEADERS,
    BATCH_OUTPUT_HEADERS,
    EXISTING_CABLE_SPEC_OPTIONS,
    buildBatchPlanRows,
    createTemplateRows,
    resolveDiningTypeId,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepBatchPlanner = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
