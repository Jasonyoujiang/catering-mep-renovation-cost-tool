(function attachRenovationRules(global) {
  const cableTable = typeof require === 'function'
    ? require('./cable-table.js')
    : global.MepCableTable;

  const DINING_TYPES = {
    light: {
      id: 'light',
      name: '轻餐',
      description: '饮品、烘焙、简餐等低油烟业态',
      demandKwPerSquareMeter: 0.25,
      demandIndicatorLabel: '0.25 kW/m2',
      isCatering: true,
      exhaustAirVolumePerSquareMeter: 25,
      greaseTrapCubicMeterPerHundredSquareMeters: 0.5,
    },
    standard: {
      id: 'standard',
      name: '普通餐饮',
      description: '常规正餐、快餐、带基础烹饪的餐饮业态',
      demandKwPerSquareMeter: 0.4,
      demandIndicatorLabel: '0.4 kW/m2',
      isCatering: true,
      exhaustAirVolumePerSquareMeter: 32,
      greaseTrapCubicMeterPerHundredSquareMeters: 1,
    },
    heavy: {
      id: 'heavy',
      name: '重油烟餐饮',
      description: '火锅、烧烤、中餐重油烟等高排烟业态',
      demandKwPerSquareMeter: 0.5,
      demandIndicatorLabel: '0.5 kW/m2',
      isCatering: true,
      exhaustAirVolumePerSquareMeter: 37,
      greaseTrapCubicMeterPerHundredSquareMeters: 1.5,
    },
    retail: {
      id: 'retail',
      name: '零售',
      description: '零售类商铺，第一版仅测算电气条件',
      demandKwPerSquareMeter: 0.12,
      demandIndicatorLabel: '120 W/m2',
      isCatering: false,
    },
    service: {
      id: 'service',
      name: '生活服务',
      description: '生活服务类商铺，第一版仅测算电气条件',
      demandKwPerSquareMeter: 0.12,
      demandIndicatorLabel: '120 W/m2',
      isCatering: false,
    },
    supermarket: {
      id: 'supermarket',
      name: '超市',
      description: '超市类商铺，第一版仅测算电气条件',
      demandKwPerSquareMeter: 0.15,
      demandIndicatorLabel: '150 W/m2',
      isCatering: false,
    },
  };

  const WATER_DIAMETER_RULES = [
    { maxArea: 100, includeMaxArea: true, value: 'DN25' },
    { maxArea: 400, includeMaxArea: false, value: 'DN40' },
    { maxArea: Infinity, includeMaxArea: true, value: 'DN50' },
  ];

  const DRAINAGE_DIAMETER_RULES = [
    { maxArea: 100, includeMaxArea: true, value: 'DN110' },
    { maxArea: 400, includeMaxArea: false, value: 'DN160' },
    { maxArea: Infinity, includeMaxArea: true, value: '2条DN160' },
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

  function hasAreaValue(area) {
    return area !== undefined && area !== null && area !== '';
  }

  function getDiningType(diningTypeId) {
    const diningType = DINING_TYPES[diningTypeId];
    if (!diningType) {
      throw new Error('业态类型不在当前配置范围内');
    }
    return diningType;
  }

  function findAreaRuleValue(rules, area) {
    const matched = rules.find((item) => (
      item.includeMaxArea ? area <= item.maxArea : area < item.maxArea
    ));
    return matched ? matched.value : rules[rules.length - 1].value;
  }

  function assertValidSpecifiedDemand(specifiedDemandKw) {
    if (specifiedDemandKw === undefined || specifiedDemandKw === null) {
      return;
    }

    if (!Number.isFinite(specifiedDemandKw) || specifiedDemandKw <= 0) {
      throw new Error('指定用电量必须为空，或填写大于 0 的数字');
    }
  }

  function formatKw(value) {
    return Number.isInteger(value) ? `${value} kW` : `${value.toFixed(1)} kW`;
  }

  function formatAirVolume(value) {
    return Number.isInteger(value) ? `${value} m3/h` : `${value.toFixed(1)} m3/h`;
  }

  function formatCubicMeters(value) {
    return Number.isInteger(value * 10) ? value.toFixed(1) : value.toFixed(2);
  }

  function formatCableValue(selection) {
    if (selection.isOutOfRange) {
      return selection.recommendedCable;
    }

    return cableTable.formatYjvCableSpecification(selection.recommendedCable);
  }

  function buildElectricalLoadNote(diningType, hasSpecifiedDemand) {
    if (hasSpecifiedDemand) {
      return '按手动指定用电量录入，适用于主力店、水吧或已有明确设备需求的商户。';
    }

    return `按 ${diningType.name} ${diningType.demandIndicatorLabel} 经验系数估算，暂未考虑设备清单和同时使用系数。`;
  }

  function buildCableNote(demandKw, selection, hasSpecifiedDemand) {
    const source = hasSpecifiedDemand
      ? `按手动指定用电量 ${formatKw(demandKw)} 匹配，适用于主力店、水吧或已有明确设备需求的商户`
      : `按 ${formatKw(demandKw)} 估算负荷匹配`;

    if (selection.isOutOfRange) {
      return `${source}，已超过表中 ${selection.ratedPowerKw} kW 最大档，需专项复核供配电方案、变压器容量和低压出线条件。`;
    }

    return `${source}，保守向上取表中 ${selection.ratedPowerKw} kW 档，Kx=${selection.coefficientKx}，计算电流约 ${selection.calculatedCurrentA} A；需核实上级开关容量、计量方式和电缆敷设路径。`;
  }

  function calculateRenovationPlan(area, diningTypeId, options = {}) {
    const diningType = getDiningType(diningTypeId);
    assertValidSpecifiedDemand(options.specifiedDemandKw);

    const hasSpecifiedDemand = options.specifiedDemandKw !== undefined && options.specifiedDemandKw !== null;
    const hasArea = hasAreaValue(area);

    if (hasArea) {
      assertValidArea(area);
    } else if (!hasSpecifiedDemand) {
      throw new Error('商铺面积必须为大于 0 的数字');
    }

    const demandKw = hasSpecifiedDemand
      ? options.specifiedDemandKw
      : Math.ceil(area * diningType.demandKwPerSquareMeter);
    const cableSelection = cableTable.selectCableByDemandKw(demandKw);
    const items = {
      electricalLoad: {
        label: '估算用电负荷',
        value: formatKw(demandKw),
        numericValue: demandKw,
        unit: 'kW',
        note: buildElectricalLoadNote(diningType, hasSpecifiedDemand),
      },
      electricalCable: {
        label: '配套电缆规格',
        value: formatCableValue(cableSelection),
        numericValue: cableSelection.ratedPowerKw,
        unit: '规格',
        note: buildCableNote(demandKw, cableSelection, hasSpecifiedDemand),
      },
    };

    if (diningType.isCatering && hasArea) {
      const water = findAreaRuleValue(WATER_DIAMETER_RULES, area);
      const drainage = findAreaRuleValue(DRAINAGE_DIAMETER_RULES, area);
      const exhaustAirVolume = area * diningType.exhaustAirVolumePerSquareMeter;
      const greaseTrapVolume = (area / 100) * diningType.greaseTrapCubicMeterPerHundredSquareMeters;

      items.water = {
        label: '供水管径',
        value: water,
        numericValue: area,
        unit: '管径',
        note: '需结合厨房用水点、热水系统和原管网压力复核。',
      };
      items.drainage = {
        label: '排水管径',
        value: drainage,
        numericValue: area,
        unit: '管径',
        note: '需复核排水坡度、隔油接入和检修条件。',
      };
      items.exhaust = {
        label: '排油烟风量',
        value: formatAirVolume(exhaustAirVolume),
        numericValue: exhaustAirVolume,
        unit: 'm3/h',
        note: `按 ${diningType.exhaustAirVolumePerSquareMeter} m3/h/m2 指标计算。`,
      };
      items.greaseTrap = {
        label: '占用隔油池容积',
        value: `${formatCubicMeters(greaseTrapVolume)} m3`,
        numericValue: greaseTrapVolume,
        unit: 'm3',
        note: `按 ${diningType.greaseTrapCubicMeterPerHundredSquareMeters} m3/100m2 指标计算，不足 100m2 部分按面积比例计算。`,
      };
    }

    return {
      area: hasArea ? area : null,
      diningType: {
        id: diningType.id,
        name: diningType.name,
        description: diningType.description,
      },
      items,
      risks: diningType.isCatering
        ? [
          '需核实原始供电容量、电缆路径、计量条件和增容成本。',
          '需核实排油烟井道、补风、油烟净化、噪声和防火阀设置条件。',
          '需核实隔油池接入、排水坡度、检修口和后期运营维护条件。',
        ]
        : [
          '需核实原始供电容量、电缆路径、计量条件和增容成本。',
        ],
      assumptions: [
        '当前结果为初步测算，用于方案阶段管理判断。',
        '正式设计应结合原始条件、现行规范、设计院复核和施工报价修正。',
      ],
    };
  }

  const api = {
    DINING_TYPES,
    selectCableByDemandKw: cableTable.selectCableByDemandKw,
    calculateRenovationPlan,
    getDiningTypeOptions,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepRenovationRules = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
