(function attachCostCatalog(global) {
  const CABLE_COST_COEFFICIENT = 1.4;
  const CABLE_METER_COST_LIST = [
    { id: 'yjv-4x6-1x4', specification: '4×6+1×4', basePrice: 38.76 },
    { id: 'yjv-4x10-1x6', specification: '4×10+1×6', basePrice: 50.67 },
    { id: 'yjv-4x16-1x10', specification: '4×16+1×10', basePrice: 75.10 },
    { id: 'yjv-4x25-1x16', specification: '4×25+1×16', basePrice: 111.14 },
    { id: 'yjv-4x35-1x16', specification: '4×35+1×16', basePrice: 144.44 },
    { id: 'yjv-4x50-1x25', specification: '4×50+1×25', basePrice: 197.25 },
    { id: 'yjv-4x70-1x35', specification: '4×70+1×35', basePrice: 270.21 },
    { id: 'yjv-4x95-1x50', specification: '4×95+1×50', basePrice: 371.17 },
    { id: 'yjv-4x120-1x70', specification: '4×120+1×70', basePrice: 465.76 },
    { id: 'yjv-4x150-1x70', specification: '4×150+1×70', basePrice: 565.45 },
    { id: 'yjv-4x185-1x95', specification: '4×185+1×95', basePrice: 726.22 },
    { id: 'yjv-4x240-1x120', specification: '4×240+1×120', basePrice: 924.31 },
    { id: 'yjv-4x300-1x150', specification: '4×300+1×150', basePrice: 1167.59 },
  ];

  const AIR_VOLUME_PRICE_LIST = [
    { airVolume: 4000, purifierRange: [3200, 4000], fanRange: [7000, 9000] },
    { airVolume: 6000, purifierRange: [4800, 6000], fanRange: [8000, 11000] },
    { airVolume: 8000, purifierRange: [6400, 8000], fanRange: [10000, 14000] },
    { airVolume: 10000, purifierRange: [8000, 10000], fanRange: [12000, 18000] },
    { airVolume: 12000, purifierRange: [9600, 12000], fanRange: [14000, 20000] },
    { airVolume: 14000, purifierRange: [11200, 14000], fanRange: [16000, 22000] },
    { airVolume: 16000, purifierRange: [12800, 16000], fanRange: [18000, 24000] },
    { airVolume: 18000, purifierRange: [14400, 18000], fanRange: [20000, 26000] },
    { airVolume: 20000, purifierRange: [16000, 20000], fanRange: [22000, 28000] },
    { airVolume: 22000, purifierRange: [17600, 22000], fanRange: [24000, 30000] },
    { airVolume: 24000, purifierRange: [19200, 24000], fanRange: [26000, 32000] },
    { airVolume: 26000, purifierRange: [20800, 26000], fanRange: [28000, 34000] },
    { airVolume: 28000, purifierRange: [22400, 28000], fanRange: [30000, 36000] },
    { airVolume: 30000, purifierRange: [24000, 30000], fanRange: [32000, 38000] },
    { airVolume: 32000, purifierRange: [25600, 32000], fanRange: [33000, 39000] },
    { airVolume: 34000, purifierRange: [27200, 34000], fanRange: [34000, 40000] },
    { airVolume: 36000, purifierRange: [28800, 36000], fanRange: [35000, 41000] },
    { airVolume: 38000, purifierRange: [30400, 38000], fanRange: [36000, 42000] },
    { airVolume: 40000, purifierRange: [32000, 40000], fanRange: [35000, 45000] },
    { airVolume: 42000, purifierRange: [33600, 42000], fanRange: [36000, 46000] },
    { airVolume: 44000, purifierRange: [35200, 44000], fanRange: [37000, 47000] },
    { airVolume: 46000, purifierRange: [36800, 46000], fanRange: [38000, 48000] },
    { airVolume: 48000, purifierRange: [38400, 48000], fanRange: [39000, 49000] },
    { airVolume: 50000, purifierRange: [40000, 50000], fanRange: [40000, 50000] },
    { airVolume: 52000, purifierRange: [41600, 52000], fanRange: [41000, 51000] },
    { airVolume: 54000, purifierRange: [43200, 54000], fanRange: [42000, 52000] },
    { airVolume: 56000, purifierRange: [44800, 56000], fanRange: [43000, 53000] },
    { airVolume: 58000, purifierRange: [46400, 58000], fanRange: [44000, 54000] },
    { airVolume: 60000, purifierRange: [48000, 60000], fanRange: [45000, 55000] },
  ];

  function createAirVolumeSpecifications(prefix, namePrefix, rangeKey, remark) {
    return AIR_VOLUME_PRICE_LIST.map((item) => ({
      id: `${prefix}-${item.airVolume}`,
      name: `${namePrefix} ${item.airVolume} m3/h`,
      unit: '台',
      priceRange: item[rangeKey],
      remark,
    }));
  }

  function roundToCurrencyPrecision(value) {
    return Math.round(value * 100) / 100;
  }

  function createCableSpecifications() {
    return CABLE_METER_COST_LIST.map((item) => ({
      id: item.id,
      name: `YJV ${item.specification}`,
      unit: 'm',
      basePrice: item.basePrice,
      costCoefficient: CABLE_COST_COEFFICIENT,
      price: roundToCurrencyPrecision(item.basePrice * CABLE_COST_COEFFICIENT),
      remark: 'YJV 0.6/1kV 国标含税中价位每米成本×1.4综合系数，系数考虑人工和配件；不含复杂桥架、拆改、夜间施工及铜价波动。',
    }));
  }

  const COST_CATALOG = {
    cable: {
      id: 'cable',
      name: '电缆',
      description: 'YJV 电缆每米综合成本，含人工和配件系数',
      specifications: createCableSpecifications(),
    },
    stainlessDuct: {
      id: 'stainlessDuct',
      name: '不锈钢风管',
      description: '排油烟不锈钢风管参考单价',
      specifications: [
        {
          id: 'sus-duct-1-0',
          name: '不锈钢风管 1.0mm',
          unit: 'm2',
          price: 520,
          remark: '样例参考价，需结合板厚、法兰、保温、防火包覆和安装高度复核。',
        },
        {
          id: 'sus-duct-1-2',
          name: '不锈钢风管 1.2mm',
          unit: 'm2',
          price: 620,
          remark: '样例参考价，适用于较高耐腐蚀或管理标准场景。',
        },
      ],
    },
    galvanizedDuct: {
      id: 'galvanizedDuct',
      name: '镀锌风管',
      description: '通风及补风镀锌风管参考单价',
      specifications: [
        {
          id: 'gi-duct-0-75',
          name: '镀锌风管 0.75mm',
          unit: 'm2',
          price: 180,
          remark: '样例参考价，常用于补风或普通通风系统。',
        },
        {
          id: 'gi-duct-1-0',
          name: '镀锌风管 1.0mm',
          unit: 'm2',
          price: 235,
          remark: '样例参考价，需结合系统压力、安装高度和防火要求复核。',
        },
      ],
    },
    exhaustFan: {
      id: 'exhaustFan',
      name: '排油烟风机',
      description: '低噪音柜式离心油烟风机参考价格区间',
      specifications: createAirVolumeSpecifications(
        'fan',
        '排油烟风机',
        'fanRange',
        '低噪音柜式离心油烟风机参考区间，满足商场噪音标准≤65dB；不含安装、运输及税费。'
      ),
    },
    oilSmokePurifier: {
      id: 'oilSmokePurifier',
      name: '油烟净化器',
      description: '基础功能低空排放油烟净化器参考价格区间',
      specifications: createAirVolumeSpecifications(
        'purifier',
        '油烟净化器',
        'purifierRange',
        '基础功能低空排放油烟净化器参考区间，净化效率≥95%；不含安装、运输及税费。'
      ),
    },
  };

  function getCostCategories() {
    return Object.values(COST_CATALOG).map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
    }));
  }

  function getCategory(categoryId) {
    const category = COST_CATALOG[categoryId];
    if (!category) {
      throw new Error('造价子项不在当前资料库范围内');
    }
    return category;
  }

  function getSpecificationsForCategory(categoryId) {
    return getCategory(categoryId).specifications.map((item) => ({ ...item }));
  }

  function findCostItem(categoryId, specificationId) {
    const category = getCategory(categoryId);
    const item = category.specifications.find((specification) => specification.id === specificationId);
    if (!item) {
      throw new Error('规格型号不在当前资料库范围内');
    }

    return {
      categoryId: category.id,
      categoryName: category.name,
      ...item,
    };
  }

  const api = {
    COST_CATALOG,
    getCostCategories,
    getSpecificationsForCategory,
    findCostItem,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepCostCatalog = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
