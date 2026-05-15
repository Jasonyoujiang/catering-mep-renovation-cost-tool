(function attachRenovationRules(global) {
  const DINING_TYPES = {
    light: {
      id: 'light',
      name: '轻餐',
      description: '饮品、烘焙、简餐等低油烟业态',
      demandKwPerSquareMeter: 0.35,
      waterDiameterThresholds: [
        { maxArea: 120, value: 'DN25' },
        { maxArea: 250, value: 'DN32' },
        { maxArea: Infinity, value: 'DN40' },
      ],
      drainageDiameterThresholds: [
        { maxArea: 120, value: 'DN75' },
        { maxArea: Infinity, value: 'DN100' },
      ],
      exhaustAirVolumePerSquareMeter: 25,
      greaseTrapCubicMeterPerSquareMeter: 0.015,
    },
    standard: {
      id: 'standard',
      name: '普通餐饮',
      description: '常规正餐、快餐、带基础烹饪的餐饮业态',
      demandKwPerSquareMeter: 0.5,
      waterDiameterThresholds: [
        { maxArea: 100, value: 'DN32' },
        { maxArea: 250, value: 'DN40' },
        { maxArea: Infinity, value: 'DN50' },
      ],
      drainageDiameterThresholds: [
        { maxArea: 80, value: 'DN75' },
        { maxArea: 250, value: 'DN100' },
        { maxArea: Infinity, value: 'DN150' },
      ],
      exhaustAirVolumePerSquareMeter: 45,
      greaseTrapCubicMeterPerSquareMeter: 0.025,
    },
    heavy: {
      id: 'heavy',
      name: '重油烟餐饮',
      description: '火锅、烧烤、中餐重油烟等高排烟业态',
      demandKwPerSquareMeter: 0.65,
      waterDiameterThresholds: [
        { maxArea: 80, value: 'DN40' },
        { maxArea: 220, value: 'DN50' },
        { maxArea: Infinity, value: 'DN65' },
      ],
      drainageDiameterThresholds: [
        { maxArea: 180, value: 'DN100' },
        { maxArea: Infinity, value: 'DN150' },
      ],
      exhaustAirVolumePerSquareMeter: 60,
      greaseTrapCubicMeterPerSquareMeter: 0.035,
    },
  };

  const CABLE_THRESHOLDS = [
    { maxDemandKw: 30, value: 'YJV-5x16' },
    { maxDemandKw: 50, value: 'YJV-4x35+1x16' },
    { maxDemandKw: 80, value: 'YJV-4x70+1x35' },
    { maxDemandKw: 120, value: 'YJV-4x95+1x50' },
    { maxDemandKw: 180, value: 'YJV-4x150+1x70' },
    { maxDemandKw: Infinity, value: '需专项复核供电方案' },
  ];

  function getDiningTypeOptions() {
    return Object.values(DINING_TYPES).map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));
  }

  function assertValidArea(area) {
    if (!Number.isFinite(area) || area <= 0) {
      throw new Error('商铺面积必须为大于 0 的数字');
    }
  }

  function getDiningType(diningTypeId) {
    const diningType = DINING_TYPES[diningTypeId];
    if (!diningType) {
      throw new Error('餐饮类型不在当前配置范围内');
    }
    return diningType;
  }

  function findThresholdValue(thresholds, comparableValue, key) {
    const matched = thresholds.find((item) => comparableValue <= item[key]);
    return matched ? matched.value : thresholds[thresholds.length - 1].value;
  }

  function roundToStep(value, step) {
    return Math.ceil(value / step) * step;
  }

  function calculateRenovationPlan(area, diningTypeId) {
    assertValidArea(area);
    const diningType = getDiningType(diningTypeId);
    const demandKw = Math.ceil(area * diningType.demandKwPerSquareMeter);
    const cable = findThresholdValue(CABLE_THRESHOLDS, demandKw, 'maxDemandKw');
    const water = findThresholdValue(diningType.waterDiameterThresholds, area, 'maxArea');
    const drainage = findThresholdValue(diningType.drainageDiameterThresholds, area, 'maxArea');
    const exhaustAirVolume = roundToStep(area * diningType.exhaustAirVolumePerSquareMeter, 100);
    const greaseTrapVolume = Math.max(
      1,
      Math.ceil(area * diningType.greaseTrapCubicMeterPerSquareMeter * 10) / 10
    );

    return {
      area,
      diningType: {
        id: diningType.id,
        name: diningType.name,
        description: diningType.description,
      },
      items: {
        electrical: {
          label: '配套电缆规格',
          value: cable,
          numericValue: demandKw,
          unit: 'kW 估算负荷',
          note: `按 ${diningType.name} ${diningType.demandKwPerSquareMeter} kW/m2 的示例系数估算。`,
        },
        water: {
          label: '供水管径',
          value: water,
          numericValue: area,
          unit: '管径',
          note: '需结合厨房用水点、热水系统和原管网压力复核。',
        },
        drainage: {
          label: '排水管径',
          value: drainage,
          numericValue: area,
          unit: '管径',
          note: '需复核排水坡度、隔油接入和检修条件。',
        },
        exhaust: {
          label: '排油烟风量',
          value: `${exhaustAirVolume} m3/h`,
          numericValue: exhaustAirVolume,
          unit: 'm3/h',
          note: `按 ${diningType.exhaustAirVolumePerSquareMeter} m3/h/m2 的示例系数估算。`,
        },
        greaseTrap: {
          label: '占用隔油池容积',
          value: `${greaseTrapVolume.toFixed(1)} m3`,
          numericValue: greaseTrapVolume,
          unit: 'm3',
          note: '需结合既有隔油池总容量、服务商户数量和清掏频次复核。',
        },
      },
      risks: [
        '需核实原始供电容量、电缆路径、计量条件和增容成本。',
        '需核实排油烟井道、补风、油烟净化、噪声和防火阀设置条件。',
        '需核实隔油池接入、排水坡度、检修口和后期运营维护条件。',
      ],
      assumptions: [
        '当前结果为初步测算，用于方案阶段管理判断。',
        '正式设计应结合原始条件、现行规范、设计院复核和施工报价修正。',
      ],
    };
  }

  const api = {
    DINING_TYPES,
    CABLE_THRESHOLDS,
    calculateRenovationPlan,
    getDiningTypeOptions,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepRenovationRules = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
