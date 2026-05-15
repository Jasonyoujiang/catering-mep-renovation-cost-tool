# Catering MEP Renovation Cost Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first local Web version of the catering shop MEP renovation plan generator and cost lookup tool.

**Architecture:** The app is a static single-page tool with three separated responsibilities: data catalogs, renovation calculation rules, and browser UI wiring. Cost items and renovation rules live in standalone files so future categories, specifications, and calculation conditions can be added without changing the page structure.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in test runner.

---

## File Structure

- Create: `package.json`  
  Defines local test command using Node's built-in test runner.
- Create: `index.html`  
  Main Chinese UI with two work areas: renovation plan generation and cost lookup.
- Create: `styles.css`  
  Quiet professional dashboard styling for commercial MEP management use.
- Create: `data/rules.js`  
  Dining type configuration and renovation plan calculation functions.
- Create: `data/items.js`  
  Expandable cost category, specification, unit, price, and remark data.
- Create: `app.js`  
  Browser interaction, validation, dropdown linkage, and result rendering.
- Create: `tests/rules.test.js`  
  Regression tests for renovation rules and input boundaries.
- Create: `tests/items.test.js`  
  Regression tests for the cost catalog API.
- Create: `tests/app.test.js`  
  Regression tests for pure UI helper functions.

## Task 1: Test Harness And Renovation Rule Module

**Files:**
- Create: `package.json`
- Create: `tests/rules.test.js`
- Create: `data/rules.js`

- [ ] **Step 1: Create the test command**

Create `package.json`:

```json
{
  "name": "catering-mep-renovation-cost-tool",
  "version": "0.1.0",
  "private": true,
  "description": "餐饮商铺机电改造方案与成本测算本地工具",
  "scripts": {
    "test": "node --test tests/*.test.js"
  }
}
```

- [ ] **Step 2: Write the failing renovation rule tests**

Create `tests/rules.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  DINING_TYPES,
  calculateRenovationPlan,
  getDiningTypeOptions,
} = require('../data/rules.js');

test('returns the three first-version dining type options', () => {
  const options = getDiningTypeOptions();

  assert.deepEqual(
    options.map((item) => item.id),
    ['light', 'standard', 'heavy']
  );
  assert.equal(options[0].name, '轻餐');
  assert.equal(options[1].name, '普通餐饮');
  assert.equal(options[2].name, '重油烟餐饮');
});

test('calculates a standard catering MEP plan from area and dining type', () => {
  const plan = calculateRenovationPlan(120, 'standard');

  assert.equal(plan.area, 120);
  assert.equal(plan.diningType.name, '普通餐饮');
  assert.equal(plan.items.electrical.value, 'YJV-4x70+1x35');
  assert.equal(plan.items.water.value, 'DN40');
  assert.equal(plan.items.drainage.value, 'DN100');
  assert.equal(plan.items.exhaust.value, '5400 m3/h');
  assert.equal(plan.items.greaseTrap.value, '3.0 m3');
  assert.ok(plan.risks.some((item) => item.includes('原始供电容量')));
  assert.ok(plan.assumptions.some((item) => item.includes('初步测算')));
});

test('heavy-oil catering produces higher exhaust and grease trap demand than light catering', () => {
  const light = calculateRenovationPlan(100, 'light');
  const heavy = calculateRenovationPlan(100, 'heavy');

  assert.equal(light.items.exhaust.numericValue < heavy.items.exhaust.numericValue, true);
  assert.equal(light.items.greaseTrap.numericValue < heavy.items.greaseTrap.numericValue, true);
});

test('rejects unsupported area and dining type values', () => {
  assert.throws(() => calculateRenovationPlan(0, 'standard'), /商铺面积/);
  assert.throws(() => calculateRenovationPlan(-10, 'standard'), /商铺面积/);
  assert.throws(() => calculateRenovationPlan(100, 'unknown'), /餐饮类型/);
});

test('exposes dining type data for future extension', () => {
  assert.equal(DINING_TYPES.heavy.exhaustAirVolumePerSquareMeter, 60);
  assert.equal(DINING_TYPES.light.greaseTrapCubicMeterPerSquareMeter, 0.015);
});
```

- [ ] **Step 3: Run the test and verify it fails**

Run:

```bash
npm test
```

Expected: `tests/rules.test.js` fails because `data/rules.js` does not exist.

- [ ] **Step 4: Implement the renovation rule module**

Create `data/rules.js`:

```javascript
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
```

- [ ] **Step 5: Run the rule tests and verify they pass**

Run:

```bash
npm test
```

Expected: all tests in `tests/rules.test.js` pass.

- [ ] **Step 6: Commit this task**

If the folder is not yet a Git repository, initialize it first:

```bash
git init
git add package.json tests/rules.test.js data/rules.js
git commit -m "feat: add renovation rule engine"
```

If Git already exists:

```bash
git add package.json tests/rules.test.js data/rules.js
git commit -m "feat: add renovation rule engine"
```

## Task 2: Cost Catalog Module

**Files:**
- Create: `tests/items.test.js`
- Create: `data/items.js`

- [ ] **Step 1: Write the failing cost catalog tests**

Create `tests/items.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  COST_CATALOG,
  getCostCategories,
  getSpecificationsForCategory,
  findCostItem,
} = require('../data/items.js');

test('returns first-version expandable cost categories', () => {
  const categories = getCostCategories();

  assert.deepEqual(
    categories.map((item) => item.id),
    ['cable', 'stainlessDuct', 'galvanizedDuct', 'exhaustFan']
  );
  assert.equal(categories[0].name, '电缆');
});

test('returns specifications for a selected category', () => {
  const cableSpecs = getSpecificationsForCategory('cable');

  assert.equal(cableSpecs.length >= 3, true);
  assert.equal(cableSpecs[0].unit, 'm');
  assert.ok(cableSpecs.some((item) => item.name === 'YJV-4x70+1x35'));
});

test('finds a single cost item by category and specification id', () => {
  const item = findCostItem('exhaustFan', 'fan-15000');

  assert.equal(item.categoryName, '排油烟风机');
  assert.equal(item.name, '排油烟风机 15000 m3/h');
  assert.equal(item.unit, '台');
  assert.equal(item.price, 18500);
  assert.ok(item.remark.includes('参考'));
});

test('throws clear errors for unknown category or specification', () => {
  assert.throws(() => getSpecificationsForCategory('unknown'), /造价子项/);
  assert.throws(() => findCostItem('cable', 'missing'), /规格型号/);
});

test('exposes catalog data for future extension', () => {
  assert.equal(COST_CATALOG.cable.name, '电缆');
  assert.equal(Array.isArray(COST_CATALOG.stainlessDuct.specifications), true);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm test
```

Expected: `tests/items.test.js` fails because `data/items.js` does not exist.

- [ ] **Step 3: Implement the cost catalog module**

Create `data/items.js`:

```javascript
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
```

- [ ] **Step 4: Run the catalog tests and verify they pass**

Run:

```bash
npm test
```

Expected: all tests in `tests/rules.test.js` and `tests/items.test.js` pass.

- [ ] **Step 5: Commit this task**

```bash
git add tests/items.test.js data/items.js
git commit -m "feat: add cost catalog data"
```

## Task 3: UI Helper Module

**Files:**
- Create: `tests/app.test.js`
- Create: `app.js`

- [ ] **Step 1: Write the failing UI helper tests**

Create `tests/app.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');

global.MepRenovationRules = require('../data/rules.js');
global.MepCostCatalog = require('../data/items.js');

const {
  validateAreaInput,
  formatCurrency,
  buildCostResultRows,
} = require('../app.js');

test('validates a positive shop area input', () => {
  assert.deepEqual(validateAreaInput('88.5'), {
    valid: true,
    area: 88.5,
    message: '',
  });
});

test('rejects blank, zero, and non-number shop area input', () => {
  assert.equal(validateAreaInput('').valid, false);
  assert.equal(validateAreaInput('0').valid, false);
  assert.equal(validateAreaInput('abc').valid, false);
});

test('formats Chinese currency for cost lookup', () => {
  assert.equal(formatCurrency(18500), '¥18,500');
});

test('builds cost result rows from a selected category and specification', () => {
  const rows = buildCostResultRows('exhaustFan', 'fan-15000');

  assert.deepEqual(rows, [
    ['子项名称', '排油烟风机'],
    ['规格型号', '排油烟风机 15000 m3/h'],
    ['计量单位', '台'],
    ['参考单价', '¥18,500'],
    ['价格说明', '样例参考价，需结合风压、噪声、安装位置和品牌复核。'],
  ]);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm test
```

Expected: `tests/app.test.js` fails because `app.js` does not exist.

- [ ] **Step 3: Implement pure UI helpers and browser wiring**

Create `app.js`:

```javascript
(function attachApp(global) {
  const rules = global.MepRenovationRules;
  const catalog = global.MepCostCatalog;

  function validateAreaInput(value) {
    const area = Number(value);
    if (!value || !Number.isFinite(area) || area <= 0) {
      return {
        valid: false,
        area: null,
        message: '请输入大于 0 的商铺面积。',
      };
    }

    return {
      valid: true,
      area,
      message: '',
    };
  }

  function formatCurrency(value) {
    return `¥${Number(value).toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`;
  }

  function buildCostResultRows(categoryId, specificationId) {
    const item = catalog.findCostItem(categoryId, specificationId);
    return [
      ['子项名称', item.categoryName],
      ['规格型号', item.name],
      ['计量单位', item.unit],
      ['参考单价', formatCurrency(item.price)],
      ['价格说明', item.remark],
    ];
  }

  function createOption(value, label) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    return option;
  }

  function setMessage(element, message, tone) {
    element.textContent = message;
    element.dataset.tone = tone;
  }

  function renderDiningTypes() {
    const select = document.querySelector('[data-dining-type]');
    rules.getDiningTypeOptions().forEach((item) => {
      select.appendChild(createOption(item.id, item.name));
    });
  }

  function renderCostCategories() {
    const select = document.querySelector('[data-cost-category]');
    catalog.getCostCategories().forEach((item) => {
      select.appendChild(createOption(item.id, item.name));
    });
  }

  function renderSpecifications(categoryId) {
    const select = document.querySelector('[data-cost-specification]');
    select.innerHTML = '';
    select.appendChild(createOption('', '请选择规格型号'));

    if (!categoryId) {
      select.disabled = true;
      return;
    }

    catalog.getSpecificationsForCategory(categoryId).forEach((item) => {
      select.appendChild(createOption(item.id, item.name));
    });
    select.disabled = false;
  }

  function renderPlanItem(container, item) {
    const card = document.createElement('article');
    card.className = 'result-card';
    card.innerHTML = `
      <span class="result-card__label">${item.label}</span>
      <strong>${item.value}</strong>
      <small>${item.note}</small>
    `;
    container.appendChild(card);
  }

  function renderList(container, title, items) {
    const section = document.createElement('section');
    section.className = 'notice-block';
    const list = items.map((item) => `<li>${item}</li>`).join('');
    section.innerHTML = `<h3>${title}</h3><ul>${list}</ul>`;
    container.appendChild(section);
  }

  function handlePlanSubmit(event) {
    event.preventDefault();
    const areaInput = document.querySelector('[data-area]');
    const diningTypeSelect = document.querySelector('[data-dining-type]');
    const output = document.querySelector('[data-plan-output]');
    const message = document.querySelector('[data-plan-message]');
    const validation = validateAreaInput(areaInput.value);

    output.innerHTML = '';

    if (!validation.valid) {
      setMessage(message, validation.message, 'error');
      return;
    }

    const plan = rules.calculateRenovationPlan(validation.area, diningTypeSelect.value);
    setMessage(message, `${plan.diningType.name} ${plan.area} m2 初步改造参数已生成。`, 'success');

    const grid = document.createElement('div');
    grid.className = 'result-grid';
    Object.values(plan.items).forEach((item) => renderPlanItem(grid, item));
    output.appendChild(grid);
    renderList(output, '风险提示', plan.risks);
    renderList(output, '后续复核前提', plan.assumptions);
  }

  function handleCostLookup(event) {
    event.preventDefault();
    const categoryId = document.querySelector('[data-cost-category]').value;
    const specificationId = document.querySelector('[data-cost-specification]').value;
    const output = document.querySelector('[data-cost-output]');
    const message = document.querySelector('[data-cost-message]');

    output.innerHTML = '';

    if (!categoryId || !specificationId) {
      setMessage(message, '请先选择造价子项和规格型号。', 'error');
      return;
    }

    const rows = buildCostResultRows(categoryId, specificationId);
    const tableRows = rows
      .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
      .join('');

    setMessage(message, '造价资料已查询。', 'success');
    output.innerHTML = `<table class="cost-table"><tbody>${tableRows}</tbody></table>`;
  }

  function initApp() {
    renderDiningTypes();
    renderCostCategories();
    renderSpecifications('');

    document.querySelector('[data-plan-form]').addEventListener('submit', handlePlanSubmit);
    document.querySelector('[data-cost-form]').addEventListener('submit', handleCostLookup);
    document.querySelector('[data-cost-category]').addEventListener('change', (event) => {
      renderSpecifications(event.target.value);
      document.querySelector('[data-cost-output]').innerHTML = '';
      setMessage(document.querySelector('[data-cost-message]'), '', 'neutral');
    });
  }

  const api = {
    validateAreaInput,
    formatCurrency,
    buildCostResultRows,
    initApp,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.CateringMepApp = api;

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initApp);
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);
```

- [ ] **Step 4: Run the helper tests and verify they pass**

Run:

```bash
npm test
```

Expected: all tests in `tests/rules.test.js`, `tests/items.test.js`, and `tests/app.test.js` pass.

- [ ] **Step 5: Commit this task**

```bash
git add tests/app.test.js app.js
git commit -m "feat: add browser app interaction logic"
```

## Task 4: Page Markup And Styling

**Files:**
- Create: `index.html`
- Create: `styles.css`

- [ ] **Step 1: Create the browser page**

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>餐饮商铺机电改造方案与成本测算</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main class="app-shell">
      <header class="app-header">
        <div>
          <p class="eyebrow">商业项目机电管理工具</p>
          <h1>餐饮商铺机电改造方案与成本测算</h1>
        </div>
        <p class="header-note">第一版为管理测算框架，计算逻辑和价格资料可逐步扩展。</p>
      </header>

      <section class="workspace" aria-label="餐饮商铺机电改造工具">
        <article class="panel">
          <div class="panel__header">
            <span>01</span>
            <div>
              <h2>改造方案生成</h2>
              <p>输入面积和餐饮类型，生成第一批机电配置参数。</p>
            </div>
          </div>

          <form class="form-grid" data-plan-form>
            <label>
              <span>商铺面积</span>
              <input data-area type="number" min="1" step="0.1" placeholder="例如 120">
            </label>
            <label>
              <span>餐饮类型</span>
              <select data-dining-type></select>
            </label>
            <button type="submit">生成方案</button>
          </form>

          <p class="form-message" data-plan-message data-tone="neutral"></p>
          <div class="output-stack" data-plan-output></div>
        </article>

        <article class="panel">
          <div class="panel__header">
            <span>02</span>
            <div>
              <h2>机电改造成本查询</h2>
              <p>通过两级菜单查询子项规格和参考造价。</p>
            </div>
          </div>

          <form class="form-grid" data-cost-form>
            <label>
              <span>造价子项</span>
              <select data-cost-category>
                <option value="">请选择子项</option>
              </select>
            </label>
            <label>
              <span>规格型号</span>
              <select data-cost-specification disabled>
                <option value="">请选择规格型号</option>
              </select>
            </label>
            <button type="submit">查询造价</button>
          </form>

          <p class="form-message" data-cost-message data-tone="neutral"></p>
          <div class="output-stack" data-cost-output></div>
        </article>
      </section>
    </main>

    <script src="data/rules.js"></script>
    <script src="data/items.js"></script>
    <script src="app.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Create the page styling**

Create `styles.css`:

```css
:root {
  color-scheme: light;
  --page: #f5f6f3;
  --panel: #ffffff;
  --ink: #17211b;
  --muted: #627067;
  --line: #d9ded7;
  --accent: #1f7a5c;
  --accent-strong: #14543f;
  --warn: #9f4f16;
  --error: #a83232;
  --success: #176942;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.app-shell {
  width: min(1180px, calc(100vw - 32px));
  margin: 0 auto;
  padding: 32px 0;
}

.app-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: end;
  padding: 0 0 22px;
  border-bottom: 1px solid var(--line);
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--accent-strong);
  font-size: 14px;
  font-weight: 700;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.12;
  letter-spacing: 0;
}

.header-note {
  max-width: 320px;
  margin-bottom: 4px;
  color: var(--muted);
  line-height: 1.6;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 18px;
  margin-top: 24px;
}

.panel {
  min-width: 0;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 22px;
  box-shadow: 0 12px 28px rgba(32, 42, 36, 0.08);
}

.panel__header {
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 14px;
  align-items: start;
  margin-bottom: 20px;
}

.panel__header > span {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: #e4efe9;
  color: var(--accent-strong);
  font-weight: 800;
}

.panel__header h2 {
  margin-bottom: 6px;
  font-size: 22px;
  letter-spacing: 0;
}

.panel__header p {
  margin-bottom: 0;
  color: var(--muted);
  line-height: 1.55;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: end;
}

label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 700;
}

input,
select,
button {
  width: 100%;
  min-height: 44px;
  border-radius: 6px;
  font: inherit;
}

input,
select {
  border: 1px solid var(--line);
  background: #fbfcfa;
  color: var(--ink);
  padding: 0 12px;
}

button {
  border: 0;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
  font-weight: 800;
}

button:hover {
  background: var(--accent-strong);
}

.form-message {
  min-height: 24px;
  margin: 14px 0 0;
  font-weight: 700;
  line-height: 1.5;
}

.form-message[data-tone="error"] {
  color: var(--error);
}

.form-message[data-tone="success"] {
  color: var(--success);
}

.output-stack {
  display: grid;
  gap: 14px;
  margin-top: 16px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.result-card {
  display: grid;
  gap: 8px;
  min-height: 132px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 14px;
  background: #fbfcfa;
}

.result-card__label {
  color: var(--muted);
  font-size: 13px;
  font-weight: 800;
}

.result-card strong {
  font-size: 24px;
  line-height: 1.15;
}

.result-card small {
  color: var(--muted);
  line-height: 1.5;
}

.notice-block {
  border-left: 4px solid var(--warn);
  background: #fff8ef;
  padding: 14px 16px;
}

.notice-block h3 {
  margin-bottom: 8px;
  font-size: 16px;
}

.notice-block ul {
  margin: 0;
  padding-left: 20px;
  color: #563415;
  line-height: 1.7;
}

.cost-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
}

.cost-table th,
.cost-table td {
  border-bottom: 1px solid var(--line);
  padding: 13px 14px;
  text-align: left;
  vertical-align: top;
  line-height: 1.6;
}

.cost-table th {
  width: 110px;
  background: #eef3ef;
  color: var(--accent-strong);
}

.cost-table tr:last-child th,
.cost-table tr:last-child td {
  border-bottom: 0;
}

@media (max-width: 860px) {
  .app-header,
  .workspace,
  .form-grid,
  .result-grid {
    grid-template-columns: 1fr;
  }

  .app-header {
    display: grid;
    align-items: start;
  }
}
```

- [ ] **Step 3: Run tests after adding markup and styles**

Run:

```bash
npm test
```

Expected: all existing JavaScript tests pass.

- [ ] **Step 4: Commit this task**

```bash
git add index.html styles.css
git commit -m "feat: add local web interface"
```

## Task 5: Integration Verification

**Files:**
- Modify only if verification reveals a specific defect:
  - `index.html`
  - `styles.css`
  - `app.js`
  - `data/rules.js`
  - `data/items.js`

- [ ] **Step 1: Run the full automated test suite**

Run:

```bash
npm test
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Open the app locally**

Run:

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173/index.html
```

Expected: page loads with two panels, Chinese labels, and no missing script errors in the browser console.

- [ ] **Step 3: Verify renovation plan behavior**

In the page:

1. Enter area `120`.
2. Select `普通餐饮`.
3. Click `生成方案`.

Expected visible results:

- `配套电缆规格` shows `YJV-4x70+1x35`.
- `供水管径` shows `DN40`.
- `排水管径` shows `DN100`.
- `排油烟风量` shows `5400 m3/h`.
- `占用隔油池容积` shows `3.0 m3`.
- Risk and follow-up review notes are visible.

- [ ] **Step 4: Verify cost lookup behavior**

In the page:

1. Select `排油烟风机`.
2. Select `排油烟风机 15000 m3/h`.
3. Click `查询造价`.

Expected visible results:

- `子项名称` shows `排油烟风机`.
- `规格型号` shows `排油烟风机 15000 m3/h`.
- `计量单位` shows `台`.
- `参考单价` shows `¥18,500`.
- `价格说明` shows the fan remark.

- [ ] **Step 5: Verify validation behavior**

In the page:

1. Leave area blank.
2. Click `生成方案`.

Expected visible result:

- Message shows `请输入大于 0 的商铺面积。`

Then:

1. Leave the cost specification unselected.
2. Click `查询造价`.

Expected visible result:

- Message shows `请先选择造价子项和规格型号。`

- [ ] **Step 6: Stop the local server and commit verification fixes**

If files changed during verification:

```bash
git add index.html styles.css app.js data/rules.js data/items.js tests
git commit -m "fix: polish first-version app verification"
```

If no files changed:

```bash
git status --short
```

Expected: no uncommitted application changes.

## Self-Review

- Spec coverage: Task 1 covers renovation plan rules and future dining type extension. Task 2 covers expandable cost categories and two-level specifications. Task 3 covers validation and browser interaction helpers. Task 4 covers the local Chinese Web page. Task 5 covers automated and browser verification.
- Placeholder scan: no task uses open-ended placeholders; all code-bearing steps include exact file content.
- Type consistency: `calculateRenovationPlan`, `getDiningTypeOptions`, `getCostCategories`, `getSpecificationsForCategory`, `findCostItem`, `validateAreaInput`, `formatCurrency`, and `buildCostResultRows` are consistently named across tests, app code, and browser wiring.
