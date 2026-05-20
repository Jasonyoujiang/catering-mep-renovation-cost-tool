(function attachBatchPlanner(global) {
  const rules = typeof require === 'function'
    ? require('./rules.js')
    : global.MepRenovationRules;

  const BATCH_TEMPLATE_HEADERS = [
    '商铺编号',
    '楼层',
    '业态类型',
    '面积',
    '是否启用指定用电量',
    '指定用电量',
  ];

  const BATCH_OUTPUT_HEADERS = [
    ...BATCH_TEMPLATE_HEADERS,
    '估算用电负荷',
    '配套电缆规格',
    '供水管径',
    '排水管径',
    '排油烟风量',
    '占用隔油池容积',
    '测算依据',
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
  };

  const TRUTHY_VALUES = new Set(['是', '启用', '启用指定用电量', '指定', 'y', 'yes', 'true', '1']);

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

  function isSpecifiedDemandEnabled(value) {
    return TRUTHY_VALUES.has(normalizeText(value).toLowerCase());
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

  function createBasis(plan) {
    return Object.values(plan.items)
      .map((item) => `${item.label}：${item.note}`)
      .join('；');
  }

  function buildBatchPlanRow(row) {
    const errors = [];
    const area = parseArea(row.面积);
    const diningTypeId = resolveDiningTypeId(row.业态类型);
    const hasSpecifiedDemand = isSpecifiedDemandEnabled(row.是否启用指定用电量);
    const specifiedDemand = parseSpecifiedDemand(row.指定用电量);

    if (!normalizeText(row.商铺编号)) {
      errors.push('商铺编号为空');
    }

    if (!normalizeText(row.楼层)) {
      errors.push('楼层为空');
    }

    if (!area) {
      errors.push('面积必须为大于 0 的数字');
    }

    if (!diningTypeId) {
      errors.push('业态类型需填写轻餐、普通餐饮或重油烟餐饮');
    }

    if (hasSpecifiedDemand && !specifiedDemand) {
      errors.push('启用指定用电量时，指定用电量必须为大于 0 的数字');
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
      面积: area,
      是否启用指定用电量: hasSpecifiedDemand ? '是' : '否',
      指定用电量: hasSpecifiedDemand ? specifiedDemand : '',
      估算用电负荷: plan.items.electricalLoad.value,
      配套电缆规格: plan.items.electricalCable.value,
      供水管径: plan.items.water.value,
      排水管径: plan.items.drainage.value,
      排油烟风量: plan.items.exhaust.value,
      占用隔油池容积: plan.items.greaseTrap.value,
      测算依据: createBasis(plan),
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
    ];
  }

  const api = {
    BATCH_TEMPLATE_HEADERS,
    BATCH_OUTPUT_HEADERS,
    buildBatchPlanRows,
    createTemplateRows,
    resolveDiningTypeId,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepBatchPlanner = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
