(function attachRenovationUnitPriceSummary(global) {
  const RENOVATION_UNIT_PRICE_CATEGORY = {
    id: 'renovationUnitPriceSummary',
    name: '改造项单方造价',
    description: '按历史成本测算表整合后的改造项平均单方造价',
    specifications: [
      {
        id: 'renovation-unit-price-001',
        name: '废水排水管/排水条件',
        unit: '㎡',
        price: 46.154,
        sampleCount: 13,
        observedRange: [40, 70],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本13条，样本单价区间约 ¥40-¥70/㎡；已过滤频次低于2次及倍差大于等于3的项目。',
      },
      {
        id: 'renovation-unit-price-002',
        name: '消防水/喷淋消火栓调整',
        unit: '㎡',
        price: 26.667,
        sampleCount: 9,
        observedRange: [20, 30],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本9条，样本单价区间约 ¥20-¥30/㎡；需结合喷淋点位、消火栓调整范围和消防报审要求复核。',
      },
      {
        id: 'renovation-unit-price-003',
        name: '消防防排烟系统调整',
        unit: '㎡',
        price: 42.222,
        sampleCount: 9,
        observedRange: [40, 60],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本9条，样本单价区间约 ¥40-¥60/㎡；需结合防排烟分区、风管路径、阀件及联动调试范围复核。',
      },
      {
        id: 'renovation-unit-price-004',
        name: '停车场光厅',
        unit: '个',
        price: 64000,
        sampleCount: 5,
        observedRange: [60000, 70000],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本5条，样本单价区间约 ¥60,000-¥70,000/个；需结合光厅规格、装饰标准和配电接入条件复核。',
      },
      {
        id: 'renovation-unit-price-005',
        name: '调商/招调费用',
        unit: '项',
        price: 560000,
        sampleCount: 5,
        observedRange: [500000, 800000],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本5条，样本单价区间约 ¥500,000-¥800,000/项；属于综合性费用，需结合招商调改边界和项目审批口径复核。',
      },
      {
        id: 'renovation-unit-price-006',
        name: '车库入口/地下车库提升',
        unit: '个',
        price: 47000,
        sampleCount: 5,
        observedRange: [35000, 60000],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本5条，样本单价区间约 ¥35,000-¥60,000/个；需结合入口数量、导视照明、土建装饰和弱电接入范围复核。',
      },
      {
        id: 'renovation-unit-price-007',
        name: '消防系统调试',
        unit: '项（原表单位㎡）',
        price: 100000,
        sampleCount: 2,
        observedRange: [100000, 100000],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；原表单位为㎡但按项价单独列示，样本2条，样本单价约 ¥100,000/项；需结合消防系统联动范围、报验次数和第三方检测要求复核。',
      },
      {
        id: 'renovation-unit-price-008',
        name: '监控系统改造',
        unit: '㎡',
        price: 25,
        sampleCount: 2,
        observedRange: [20, 30],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本2条，样本单价区间约 ¥20-¥30/㎡；需结合摄像机点位、存储容量、线路敷设和平台接入要求复核。',
      },
      {
        id: 'renovation-unit-price-009',
        name: '防火卷帘工程',
        unit: '项',
        price: 50000,
        sampleCount: 2,
        observedRange: [50000, 50000],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本2条，样本单价约 ¥50,000/项；需结合卷帘面积、防火分区调整、控制联动和消防验收边界复核。',
      },
      {
        id: 'renovation-unit-price-010',
        name: '隔墙砌筑/商铺分隔',
        unit: '㎡（原表单位项）',
        price: 131,
        sampleCount: 2,
        observedRange: [131, 131],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；原表单位为项但按面积口径折算列示，样本2条，样本单价约 ¥131/㎡；需结合隔墙材质、高度、抹灰饰面和拆改界面复核。',
      },
      {
        id: 'renovation-unit-price-011',
        name: '地下车库照明',
        unit: '㎡',
        price: 25,
        sampleCount: 2,
        observedRange: [25, 25],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本2条，样本单价约 ¥25/㎡；需结合照度标准、灯具数量、线路改造和控制方式复核。',
      },
      {
        id: 'renovation-unit-price-012',
        name: '审图费',
        unit: '㎡',
        price: 7.5,
        sampleCount: 2,
        observedRange: [7.5, 7.5],
        remark: '来源：改造项单方造价整合汇总_频次2次以上_倍差小于3.xlsx；按整合改造项+计价单位统计平均单价，样本2条，样本单价约 ¥7.5/㎡；需结合报审范围、图纸深度和当地审查收费口径复核。',
      },
    ],
  };

  const api = {
    RENOVATION_UNIT_PRICE_CATEGORY,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepRenovationUnitPriceSummary = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
