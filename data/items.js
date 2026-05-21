(function attachCostCatalog(global) {
  const importedCostMenu = typeof require === 'function'
    ? require('./imported-cost-menu.js')
    : global.MepImportedCostMenu;
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
  ];
  const DOUBLE_RUN_CABLE_IDS = new Set([
    'yjv-4x70-1x35',
    'yjv-4x95-1x50',
    'yjv-4x120-1x70',
  ]);

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

  const STAINLESS_DUCT_PRICE_LIST = [
    { thickness: '0.5mm', bareRange: [160, 200], installedRange: [280, 350], scene: '小型低压通风支管，适配长边≤320mm 的小尺寸风管' },
    { thickness: '0.6mm', bareRange: [180, 220], installedRange: [300, 380], scene: '中小尺寸低压通风支管，普通新风系统支管' },
    { thickness: '0.8mm', bareRange: [200, 250], installedRange: [320, 400], scene: '中低压系统，适配长边≤630mm 的中等尺寸风管' },
    { thickness: '1.0mm', bareRange: [220, 280], installedRange: [350, 450], scene: '常规主风管，中压系统，大部分民用暖通项目的主流选择' },
    { thickness: '1.2mm', bareRange: [280, 330], installedRange: [400, 500], scene: '中高压系统，适配长边≤1000mm 的大尺寸风管' },
    { thickness: '1.5mm', bareRange: [330, 400], installedRange: [450, 580], scene: '高压系统、厨房排烟风管，适配长边≤2000mm 的大尺寸主风管' },
    { thickness: '2.0mm', bareRange: [420, 500], installedRange: [550, 700], scene: '高压/高温/高腐蚀工业场景，超大尺寸特殊风管' },
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
    const singleRunSpecifications = CABLE_METER_COST_LIST.map((item) => ({
      id: item.id,
      name: `YJV ${item.specification}`,
      unit: 'm',
      basePrice: item.basePrice,
      costCoefficient: CABLE_COST_COEFFICIENT,
      price: roundToCurrencyPrecision(item.basePrice * CABLE_COST_COEFFICIENT),
      remark: 'YJV 0.6/1kV 国标含税中价位每米成本×1.4综合系数，系数考虑人工和配件；不含复杂桥架、拆改、夜间施工及铜价波动。',
    }));

    const doubleRunSpecifications = singleRunSpecifications
      .filter((item) => DOUBLE_RUN_CABLE_IDS.has(item.id))
      .map((item) => ({
        ...item,
        id: `double-${item.id}`,
        name: `双拼 ${item.name}`,
        price: roundToCurrencyPrecision(item.price * 2),
        parallelRuns: 2,
        remark: '双拼电缆按对应单根电缆每米综合单价×2测算，已包含1.4人工和配件综合系数；需复核桥架容量、敷设空间和并联电缆施工条件。',
      }));

    return [...singleRunSpecifications, ...doubleRunSpecifications];
  }

  function createStainlessDuctSpecifications() {
    return STAINLESS_DUCT_PRICE_LIST.map((item) => ({
      id: `sus-duct-${item.thickness.replace('.', '-').replace('mm', '')}`,
      name: `304不锈钢矩形风管 ${item.thickness}`,
      unit: 'm2',
      priceRange: item.installedRange,
      remark: `制作安装全包价，含加工、运输、安装；裸管成品价约 ¥${item.bareRange[0]}-¥${item.bareRange[1]}/m2。适用场景：${item.scene}。`,
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
      description: '304 不锈钢矩形风管制作安装全包价参考区间',
      specifications: createStainlessDuctSpecifications(),
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

  (importedCostMenu?.IMPORTED_COST_MENU_CATEGORIES || []).forEach((category) => {
    COST_CATALOG[category.id] = category;
  });

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
