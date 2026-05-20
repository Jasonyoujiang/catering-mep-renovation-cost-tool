(function attachCableTable(global) {
  const CABLE_SELECTION_TABLE = [
    { ratedPowerKw: 10, coefficientKx: 1, calculatedCurrentA: 17.9, recommendedCable: '5×6mm²' },
    { ratedPowerKw: 15, coefficientKx: 1, calculatedCurrentA: 26.8, recommendedCable: '5×6mm²' },
    { ratedPowerKw: 20, coefficientKx: 1, calculatedCurrentA: 35.8, recommendedCable: '3×10mm²' },
    { ratedPowerKw: 25, coefficientKx: 1, calculatedCurrentA: 44.7, recommendedCable: '3×10mm²' },
    { ratedPowerKw: 30, coefficientKx: 1, calculatedCurrentA: 53.6, recommendedCable: '3×10mm²' },
    { ratedPowerKw: 35, coefficientKx: 0.9, calculatedCurrentA: 56.3, recommendedCable: '3×16mm²' },
    { ratedPowerKw: 40, coefficientKx: 0.9, calculatedCurrentA: 64.4, recommendedCable: '3×16mm²' },
    { ratedPowerKw: 45, coefficientKx: 0.9, calculatedCurrentA: 72.4, recommendedCable: '3×16mm²' },
    { ratedPowerKw: 50, coefficientKx: 0.9, calculatedCurrentA: 80.4, recommendedCable: '3×25mm²' },
    { ratedPowerKw: 55, coefficientKx: 0.9, calculatedCurrentA: 88.5, recommendedCable: '3×25mm²' },
    { ratedPowerKw: 60, coefficientKx: 0.9, calculatedCurrentA: 96.5, recommendedCable: '3×25mm²' },
    { ratedPowerKw: 65, coefficientKx: 0.9, calculatedCurrentA: 104.6, recommendedCable: '3×35mm²' },
    { ratedPowerKw: 70, coefficientKx: 0.9, calculatedCurrentA: 112.6, recommendedCable: '3×35mm²' },
    { ratedPowerKw: 75, coefficientKx: 0.9, calculatedCurrentA: 120.7, recommendedCable: '3×35mm²' },
    { ratedPowerKw: 80, coefficientKx: 0.9, calculatedCurrentA: 128.7, recommendedCable: '3×50mm²' },
    { ratedPowerKw: 85, coefficientKx: 0.8, calculatedCurrentA: 121.6, recommendedCable: '3×50mm²' },
    { ratedPowerKw: 90, coefficientKx: 0.8, calculatedCurrentA: 128.7, recommendedCable: '3×50mm²' },
    { ratedPowerKw: 95, coefficientKx: 0.8, calculatedCurrentA: 135.9, recommendedCable: '3×50mm²' },
    { ratedPowerKw: 100, coefficientKx: 0.8, calculatedCurrentA: 143, recommendedCable: '3×70mm²' },
    { ratedPowerKw: 105, coefficientKx: 0.8, calculatedCurrentA: 150.2, recommendedCable: '3×70mm²' },
    { ratedPowerKw: 110, coefficientKx: 0.8, calculatedCurrentA: 157.3, recommendedCable: '3×70mm²' },
    { ratedPowerKw: 115, coefficientKx: 0.8, calculatedCurrentA: 164.5, recommendedCable: '3×70mm²' },
    { ratedPowerKw: 120, coefficientKx: 0.8, calculatedCurrentA: 171.6, recommendedCable: '3×95mm²' },
    { ratedPowerKw: 125, coefficientKx: 0.8, calculatedCurrentA: 178.8, recommendedCable: '3×95mm²' },
    { ratedPowerKw: 130, coefficientKx: 0.8, calculatedCurrentA: 185.9, recommendedCable: '3×95mm²' },
    { ratedPowerKw: 135, coefficientKx: 0.8, calculatedCurrentA: 193.1, recommendedCable: '3×95mm²' },
    { ratedPowerKw: 140, coefficientKx: 0.8, calculatedCurrentA: 200.2, recommendedCable: '3×95mm²' },
    { ratedPowerKw: 145, coefficientKx: 0.8, calculatedCurrentA: 207.4, recommendedCable: '3×120mm²' },
    { ratedPowerKw: 150, coefficientKx: 0.8, calculatedCurrentA: 214.5, recommendedCable: '3×120mm²' },
    { ratedPowerKw: 155, coefficientKx: 0.75, calculatedCurrentA: 207.8, recommendedCable: '3×120mm²' },
    { ratedPowerKw: 160, coefficientKx: 0.75, calculatedCurrentA: 214.5, recommendedCable: '3×120mm²' },
    { ratedPowerKw: 165, coefficientKx: 0.75, calculatedCurrentA: 221.2, recommendedCable: '3×120mm²' },
    { ratedPowerKw: 170, coefficientKx: 0.75, calculatedCurrentA: 227.9, recommendedCable: '2×(3×70mm²)' },
    { ratedPowerKw: 175, coefficientKx: 0.75, calculatedCurrentA: 234.6, recommendedCable: '2×(3×70mm²)' },
    { ratedPowerKw: 180, coefficientKx: 0.75, calculatedCurrentA: 241.3, recommendedCable: '2×(3×70mm²)' },
    { ratedPowerKw: 185, coefficientKx: 0.75, calculatedCurrentA: 248, recommendedCable: '2×(3×70mm²)' },
    { ratedPowerKw: 190, coefficientKx: 0.75, calculatedCurrentA: 254.7, recommendedCable: '2×(3×70mm²)' },
    { ratedPowerKw: 195, coefficientKx: 0.75, calculatedCurrentA: 261.4, recommendedCable: '2×(3×70mm²)' },
    { ratedPowerKw: 200, coefficientKx: 0.75, calculatedCurrentA: 268.1, recommendedCable: '2×(3×70mm²)' },
    { ratedPowerKw: 205, coefficientKx: 0.75, calculatedCurrentA: 274.8, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 210, coefficientKx: 0.75, calculatedCurrentA: 281.6, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 215, coefficientKx: 0.75, calculatedCurrentA: 288.3, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 220, coefficientKx: 0.75, calculatedCurrentA: 295, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 225, coefficientKx: 0.7, calculatedCurrentA: 281.6, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 230, coefficientKx: 0.7, calculatedCurrentA: 287.8, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 235, coefficientKx: 0.7, calculatedCurrentA: 294.1, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 240, coefficientKx: 0.7, calculatedCurrentA: 300.3, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 245, coefficientKx: 0.7, calculatedCurrentA: 306.6, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 250, coefficientKx: 0.7, calculatedCurrentA: 312.8, recommendedCable: '2×(3×95mm²)' },
    { ratedPowerKw: 260, coefficientKx: 0.7, calculatedCurrentA: 325.3, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 270, coefficientKx: 0.7, calculatedCurrentA: 337.9, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 275, coefficientKx: 0.65, calculatedCurrentA: 319.5, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 285, coefficientKx: 0.65, calculatedCurrentA: 331.2, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 295, coefficientKx: 0.65, calculatedCurrentA: 342.8, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 305, coefficientKx: 0.65, calculatedCurrentA: 354.4, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 315, coefficientKx: 0.65, calculatedCurrentA: 366, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 325, coefficientKx: 0.65, calculatedCurrentA: 377.6, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 335, coefficientKx: 0.65, calculatedCurrentA: 389.3, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 345, coefficientKx: 0.65, calculatedCurrentA: 400.9, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 350, coefficientKx: 0.65, calculatedCurrentA: 406.7, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 355, coefficientKx: 0.6, calculatedCurrentA: 380.8, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 365, coefficientKx: 0.6, calculatedCurrentA: 391.5, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 375, coefficientKx: 0.6, calculatedCurrentA: 402.2, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 385, coefficientKx: 0.6, calculatedCurrentA: 412.9, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 395, coefficientKx: 0.6, calculatedCurrentA: 423.7, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 405, coefficientKx: 0.6, calculatedCurrentA: 434.4, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 415, coefficientKx: 0.6, calculatedCurrentA: 445.1, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 425, coefficientKx: 0.6, calculatedCurrentA: 455.8, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 435, coefficientKx: 0.6, calculatedCurrentA: 466.6, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 445, coefficientKx: 0.6, calculatedCurrentA: 477.3, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 455, coefficientKx: 0.6, calculatedCurrentA: 488, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 465, coefficientKx: 0.6, calculatedCurrentA: 498.7, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 475, coefficientKx: 0.6, calculatedCurrentA: 509.5, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 485, coefficientKx: 0.6, calculatedCurrentA: 520.2, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 495, coefficientKx: 0.6, calculatedCurrentA: 530.9, recommendedCable: '2×(3×120mm²)' },
    { ratedPowerKw: 500, coefficientKx: 0.6, calculatedCurrentA: 536.3, recommendedCable: '2×(3×120mm²)' },
  ];

  const FOUR_PLUS_ONE_PE_SIZES = new Map([
    [10, 6],
    [16, 10],
    [25, 16],
    [35, 16],
    [50, 25],
    [70, 35],
    [95, 50],
    [120, 70],
  ]);

  function assertValidDemandKw(demandKw) {
    if (!Number.isFinite(demandKw) || demandKw <= 0) {
      throw new Error('计算负荷必须为大于 0 的数字');
    }
  }

  function selectCableByDemandKw(demandKw) {
    assertValidDemandKw(demandKw);
    const matched = CABLE_SELECTION_TABLE.find((item) => demandKw <= item.ratedPowerKw);
    if (!matched) {
      const last = CABLE_SELECTION_TABLE[CABLE_SELECTION_TABLE.length - 1];
      return {
        ...last,
        requestedDemandKw: demandKw,
        recommendedCable: '需专项复核供电方案',
        isRoundedUp: true,
        isOutOfRange: true,
      };
    }

    return {
      ...matched,
      requestedDemandKw: demandKw,
      isRoundedUp: demandKw < matched.ratedPowerKw,
      isOutOfRange: false,
    };
  }

  function formatFourPlusOneCableByPhaseSize(phaseCrossSection) {
    const peCrossSection = FOUR_PLUS_ONE_PE_SIZES.get(phaseCrossSection);

    if (!peCrossSection) {
      return null;
    }

    return `YJV 4×${phaseCrossSection}+1×${peCrossSection}mm²`;
  }

  function formatYjvCableSpecification(recommendedCable) {
    const singleCableMatch = recommendedCable.match(/^3×(\d+)mm²$/);
    if (singleCableMatch) {
      const phaseCrossSection = Number(singleCableMatch[1]);
      const formatted = formatFourPlusOneCableByPhaseSize(phaseCrossSection);
      return formatted || `YJV ${recommendedCable}`;
    }

    const parallelCableMatch = recommendedCable.match(/^(\d+)×\(3×(\d+)mm²\)$/);
    if (parallelCableMatch) {
      const parallelCount = Number(parallelCableMatch[1]);
      const phaseCrossSection = Number(parallelCableMatch[2]);
      const formatted = formatFourPlusOneCableByPhaseSize(phaseCrossSection);
      return formatted ? `${parallelCount}×(${formatted})` : `YJV ${recommendedCable}`;
    }

    return `YJV ${recommendedCable}`;
  }

  const api = {
    CABLE_SELECTION_TABLE,
    formatYjvCableSpecification,
    selectCableByDemandKw,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepCableTable = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
