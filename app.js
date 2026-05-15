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
