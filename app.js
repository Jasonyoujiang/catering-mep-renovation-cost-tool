(function attachApp(global) {
  const rules = global.MepRenovationRules;
  const catalog = global.MepCostCatalog;
  const batch = global.MepBatchPlanner;

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
    return `¥${Number(value).toLocaleString('zh-CN', { maximumFractionDigits: 2 })}`;
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

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
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
    const headerCells = headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('');
    const bodyRows = rows
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
      .join('');

    container.innerHTML = `
      <div class="table-scroll">
        <table class="${escapeHtml(className)}">
          <thead>
            <tr>${headerCells}</tr>
          </thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
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

  function requireSpreadsheetLibrary() {
    if (!global.XLSX) {
      throw new Error('Excel 处理组件未加载，请检查网络后刷新页面。');
    }

    return global.XLSX;
  }

  function requireStyledWorkbookLibrary() {
    if (!global.ExcelJS) {
      throw new Error('Excel 美化组件未加载，请检查网络后刷新页面。');
    }

    return global.ExcelJS;
  }

  function createTimestamp() {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    return [
      now.getFullYear(),
      pad(now.getMonth() + 1),
      pad(now.getDate()),
      '-',
      pad(now.getHours()),
      pad(now.getMinutes()),
    ].join('');
  }

  function writeExcelFile(rows, headers, sheetName, fileName) {
    const xlsx = requireSpreadsheetLibrary();
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(rows, { header: headers });
    worksheet['!cols'] = headers.map((header) => ({
      wch: header === '测算依据' ? 54 : Math.max(12, Math.min(24, String(header).length + 8)),
    }));
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    xlsx.writeFile(workbook, fileName);
  }

  function getTemplateColumnWidth(header) {
    const widthMap = {
      商铺编号: 14,
      楼层: 10,
      业态类型: 14,
      面积: 12,
      指定用电量: 14,
    };

    return widthMap[header] || 14;
  }

  function getResultColumnWidth(header) {
    const widthMap = {
      商铺编号: 14,
      楼层: 10,
      业态类型: 14,
      面积: 12,
      指定用电量: 14,
      估算用电负荷: 16,
      配套电缆规格: 24,
      供水管径: 14,
      排水管径: 14,
      排油烟风量: 16,
      占用隔油池容积: 18,
      处理状态: 12,
      错误说明: 36,
    };

    return widthMap[header] || getTemplateColumnWidth(header);
  }

  function applyTemplateCellStyle(cell, options = {}) {
    const fillColor = options.isHeader ? 'FF14513F' : options.fillColor;

    cell.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFD7DDD4' } },
      left: { style: 'thin', color: { argb: 'FFD7DDD4' } },
      bottom: { style: 'thin', color: { argb: 'FFD7DDD4' } },
      right: { style: 'thin', color: { argb: 'FFD7DDD4' } },
    };

    if (fillColor) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: fillColor },
      };
    }

    if (options.isHeader) {
      cell.font = {
        name: 'Microsoft YaHei',
        color: { argb: 'FFFFFFFF' },
        bold: true,
        size: 12,
      };
    } else {
      cell.font = {
        name: 'Microsoft YaHei',
        color: { argb: 'FF15201A' },
        size: 11,
      };
    }
  }

  function createStyledWorkbook(ExcelJS, rows, headers, sheetName, options = {}) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = '商铺机电改造方案与成本测算程序';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet(sheetName, {
      views: [{ state: 'frozen', ySplit: 1 }],
      properties: { tabColor: { argb: 'FF14513F' } },
    });
    worksheet.columns = headers.map((header) => ({
      header,
      key: header,
      width: options.getColumnWidth ? options.getColumnWidth(header) : getTemplateColumnWidth(header),
    }));
    worksheet.autoFilter = {
      from: 'A1',
      to: `${String.fromCharCode(64 + headers.length)}1`,
    };

    rows.forEach((row) => worksheet.addRow(row));

    const headerRow = worksheet.getRow(1);
    headerRow.height = 30;
    headerRow.eachCell((cell) => applyTemplateCellStyle(cell, { isHeader: true }));

    for (let rowNumber = 2; rowNumber <= rows.length + 1; rowNumber += 1) {
      const row = worksheet.getRow(rowNumber);
      row.height = 26;
      row.eachCell((cell) => {
        applyTemplateCellStyle(cell, {
          fillColor: rowNumber % 2 === 0 ? 'FFF8FAF7' : 'FFFFFFFF',
        });
      });
    }

    if (options.withTemplateValidations) {
      worksheet.dataValidations.add('C2:C500', {
        type: 'list',
        allowBlank: false,
        formulae: ['"轻餐,普通餐饮,重油烟餐饮,零售,生活服务,超市"'],
      });
    }

    return workbook;
  }

  function createStyledTemplateWorkbook(ExcelJS, rows, headers, sheetName) {
    return createStyledWorkbook(ExcelJS, rows, headers, sheetName, {
      getColumnWidth: getTemplateColumnWidth,
      withTemplateValidations: true,
    });
  }

  function createStyledResultWorkbook(ExcelJS, rows, headers, sheetName) {
    return createStyledWorkbook(ExcelJS, rows, headers, sheetName, {
      getColumnWidth: getResultColumnWidth,
    });
  }

  function downloadWorkbookBuffer(buffer, fileName) {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function writeStyledTemplateFile(rows, headers, sheetName, fileName) {
    const ExcelJS = requireStyledWorkbookLibrary();
    const workbook = createStyledTemplateWorkbook(ExcelJS, rows, headers, sheetName);

    const buffer = await workbook.xlsx.writeBuffer();
    downloadWorkbookBuffer(buffer, fileName);
  }

  async function writeStyledResultFile(rows, headers, sheetName, fileName) {
    const ExcelJS = requireStyledWorkbookLibrary();
    const workbook = createStyledResultWorkbook(ExcelJS, rows, headers, sheetName);

    const buffer = await workbook.xlsx.writeBuffer();
    downloadWorkbookBuffer(buffer, fileName);
  }

  function readExcelRows(file) {
    const xlsx = requireSpreadsheetLibrary();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const workbook = xlsx.read(event.target.result, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          resolve(xlsx.utils.sheet_to_json(worksheet, { defval: '', raw: false }));
        } catch (error) {
          reject(new Error(`Excel 读取失败：${error.message}`));
        }
      };
      reader.onerror = () => reject(new Error('Excel 文件读取失败，请重新选择文件。'));
      reader.readAsArrayBuffer(file);
    });
  }

  function buildBatchPreviewRows(rows) {
    return rows.slice(0, 5).map((row) => [
      row.商铺编号,
      row.楼层,
      row.业态类型,
      row.面积,
      row.估算用电负荷,
      row.配套电缆规格,
      row.处理状态,
    ]);
  }

  async function handleTemplateDownload() {
    const message = document.querySelector('[data-batch-message]');

    try {
      await writeStyledTemplateFile(
        batch.createTemplateRows(),
        batch.BATCH_TEMPLATE_HEADERS,
        '商铺基础信息',
        '商铺机电条件批量测算模板.xlsx'
      );
      setMessage(message, 'Excel 模板已生成，请按模板填写后上传。', 'success');
    } catch (error) {
      setMessage(message, error.message, 'error');
    }
  }

  async function handleBatchSubmit(event) {
    event.preventDefault();
    const fileInput = document.querySelector('[data-batch-file]');
    const output = document.querySelector('[data-batch-output]');
    const message = document.querySelector('[data-batch-message]');
    output.innerHTML = '';

    if (!fileInput.files || fileInput.files.length === 0) {
      setMessage(message, '请先选择要处理的 Excel 文件。', 'error');
      return;
    }

    try {
      const importedRows = await readExcelRows(fileInput.files[0]);
      if (importedRows.length === 0) {
        setMessage(message, 'Excel 中没有可处理的商铺数据。', 'error');
        return;
      }

      const resultRows = batch.buildBatchPlanRows(importedRows);
      const successCount = resultRows.filter((row) => row.处理状态 === '成功').length;
      const failedCount = resultRows.length - successCount;
      const fileName = `商铺机电条件批量测算结果-${createTimestamp()}.xlsx`;

      await writeStyledResultFile(resultRows, batch.BATCH_OUTPUT_HEADERS, '机电条件测算结果', fileName);
      renderTable(
        output,
        'batch-table',
        ['商铺编号', '楼层', '业态类型', '面积', '估算用电负荷', '配套电缆规格', '处理状态'],
        buildBatchPreviewRows(resultRows)
      );
      setMessage(
        message,
        `已处理 ${resultRows.length} 行，成功 ${successCount} 行，失败 ${failedCount} 行；结果 Excel 已下载。`,
        failedCount > 0 ? 'error' : 'success'
      );
    } catch (error) {
      setMessage(message, error.message, 'error');
    }
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
    document.querySelector('[data-template-download]').addEventListener('click', handleTemplateDownload);
    document.querySelector('[data-batch-form]').addEventListener('submit', handleBatchSubmit);
  }

  const api = {
    validateAreaInput,
    validateOptionalDemandInput,
    resolveSpecifiedDemand,
    formatCurrency,
    escapeHtml,
    getTemplateColumnWidth,
    getResultColumnWidth,
    applyTemplateCellStyle,
    createStyledWorkbook,
    createStyledTemplateWorkbook,
    createStyledResultWorkbook,
    buildPlanResultRows,
    buildCostResultRows,
    buildBatchPreviewRows,
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
