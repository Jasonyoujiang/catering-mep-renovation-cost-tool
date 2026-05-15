(function attachCostCatalog(global) {
  const COST_CATALOG = {
    cable: {
      id: 'cable',
      name: '电缆',
      description: '餐饮商铺动力电缆参考单价',
      specifications: [
        {
          id: 'yjv-5x16',
          name: 'YJV-5x16',
          unit: 'm',
          price: 95,
          remark: '样例参考价，含主材，不含复杂桥架、拆改和夜间施工增加费。',
        },
        {
          id: 'yjv-4x35-1x16',
          name: 'YJV-4x35+1x16',
          unit: 'm',
          price: 165,
          remark: '样例参考价，需结合敷设路径和铜价波动复核。',
        },
        {
          id: 'yjv-4x70-1x35',
          name: 'YJV-4x70+1x35',
          unit: 'm',
          price: 310,
          remark: '样例参考价，适合方案阶段测算，不替代招标清单。',
        },
      ],
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
      description: '餐饮排油烟风机参考单价',
      specifications: [
        {
          id: 'fan-8000',
          name: '排油烟风机 8000 m3/h',
          unit: '台',
          price: 9800,
          remark: '样例参考价，不含油烟净化器、减振、消声和控制箱。',
        },
        {
          id: 'fan-15000',
          name: '排油烟风机 15000 m3/h',
          unit: '台',
          price: 18500,
          remark: '样例参考价，需结合风压、噪声、安装位置和品牌复核。',
        },
        {
          id: 'fan-25000',
          name: '排油烟风机 25000 m3/h',
          unit: '台',
          price: 32500,
          remark: '样例参考价，大风量系统需同步复核井道和补风条件。',
        },
      ],
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
