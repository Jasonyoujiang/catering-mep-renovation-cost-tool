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

  function validateOptionalDemandInput(value) {
    if (!value) {
      return {
        valid: true,
        value: null,
        message: '',
      };
    }

    const demand = Number(value);
    if (!Number.isFinite(demand) || demand <= 0) {
      return {
        valid: false,
        value: null,
        message: '指定用电量必须为空，或填写大于 0 的数字。',
      };
    }

    return {
      valid: true,
      value: demand,
      message: '',
    };
  }

  function resolveSpecifiedDemand(isEnabled, value) {
    if (!isEnabled) {
      return {
        valid: true,
        value: null,
        message: '',
      };
    }

    if (!value) {
      return {
        valid: false,
        value: null,
        message: '勾选指定用电量后，请填写大于 0 的用电量。',
      };
    }

    return validateOptionalDemandInput(value);
  }

  function formatCurrency(value) {
    return `¥${Number(value).toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`;
  }

  function formatCostAmount(item) {
    if (Array.isArray(item.priceRange)) {
      return {
        label: '参考价格区间',
        value: `${formatCurrency(item.priceRange[0])}-${formatCurrency(item.priceRange[1])}`,
      };
    }

    return {
      label: '参考单价',
      value: formatCurrency(item.price),
    };
  }

  function buildPlanResultRows(plan) {
    return Object.values(plan.items).map((item) => [item.label, item.value, item.note]);
  }

  function buildCostResultRows(categoryId, specificationId) {
    const item = catalog.findCostItem(categoryId, specificationId);
    const priceRow = formatCostAmount(item);
    return [
      ['子项名称', item.categoryName],
      ['规格型号', item.name],
      ['计量单位', item.unit],
      [priceRow.label, priceRow.value],
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

  function renderTable(container, className, headers, rows) {
    const headerCells = headers.map((header) => `<th>${header}</th>`).join('');
    const bodyRows = rows
      .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
      .join('');

    container.innerHTML = `
      <table class="${className}">
        <thead>
          <tr>${headerCells}</tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
    `;
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
    const specifiedDemandToggle = document.querySelector('[data-specified-demand-toggle]');
    const specifiedDemandInput = document.querySelector('[data-specified-demand]');
    const diningTypeSelect = document.querySelector('[data-dining-type]');
    const output = document.querySelector('[data-plan-output]');
    const message = document.querySelector('[data-plan-message]');
    const validation = validateAreaInput(areaInput.value);
    const demandValidation = resolveSpecifiedDemand(
      specifiedDemandToggle.checked,
      specifiedDemandInput.value
    );

    output.innerHTML = '';

    if (!validation.valid) {
      setMessage(message, validation.message, 'error');
      return;
    }

    if (!demandValidation.valid) {
      setMessage(message, demandValidation.message, 'error');
      return;
    }

    const plan = rules.calculateRenovationPlan(validation.area, diningTypeSelect.value, {
      specifiedDemandKw: demandValidation.value,
    });
    const demandMessage = demandValidation.value
      ? `，电气按指定用电量 ${demandValidation.value} kW 复核`
      : '';
    setMessage(message, `${plan.diningType.name} ${plan.area} m2 初步改造参数已生成${demandMessage}。`, 'success');

    renderTable(output, 'plan-table', ['子项', '推荐参数', '测算依据 / 复核提示'], buildPlanResultRows(plan));
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

    setMessage(message, '造价资料已查询。', 'success');
    renderTable(output, 'cost-table', ['项目', '内容'], rows);
  }

  function initApp() {
    renderDiningTypes();
    renderCostCategories();
    renderSpecifications('');

    document.querySelector('[data-plan-form]').addEventListener('submit', handlePlanSubmit);
    document.querySelector('[data-specified-demand-toggle]').addEventListener('change', (event) => {
      const input = document.querySelector('[data-specified-demand]');
      input.disabled = !event.target.checked;
      if (!event.target.checked) {
        input.value = '';
      }
    });
    document.querySelector('[data-cost-form]').addEventListener('submit', handleCostLookup);
    document.querySelector('[data-cost-category]').addEventListener('change', (event) => {
      renderSpecifications(event.target.value);
      document.querySelector('[data-cost-output]').innerHTML = '';
      setMessage(document.querySelector('[data-cost-message]'), '', 'neutral');
    });
  }

  const api = {
    validateAreaInput,
    validateOptionalDemandInput,
    resolveSpecifiedDemand,
    formatCurrency,
    buildPlanResultRows,
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
