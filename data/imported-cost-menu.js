(function attachImportedCostMenu(global) {
  const IMPORTED_COST_MENU_CATEGORIES = [
  {
    "id": "imported-cost-001",
    "name": "镀锌钢管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-001-001",
        "name": "DN80",
        "unit": "m",
        "price": 107.32,
        "sourceRow": 2,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌钢管。"
      },
      {
        "id": "imported-cost-001-002",
        "name": "DN100",
        "unit": "m",
        "price": 127.46,
        "sourceRow": 3,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌钢管。"
      },
      {
        "id": "imported-cost-001-003",
        "name": "DN125",
        "unit": "m",
        "price": 149.83,
        "sourceRow": 4,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌钢管。"
      },
      {
        "id": "imported-cost-001-004",
        "name": "DN150",
        "unit": "m",
        "price": 174.91,
        "sourceRow": 5,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌钢管。"
      },
      {
        "id": "imported-cost-001-005",
        "name": "DN65 (螺纹连接)",
        "unit": "m",
        "price": 101.36,
        "sourceRow": 6,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌钢管。"
      },
      {
        "id": "imported-cost-001-006",
        "name": "DN80 (螺纹连接)",
        "unit": "m",
        "price": 112.97,
        "sourceRow": 7,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌钢管。"
      },
      {
        "id": "imported-cost-001-007",
        "name": "DN100 (螺纹连接)",
        "unit": "m",
        "price": 141.55,
        "sourceRow": 8,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌钢管。"
      }
    ]
  },
  {
    "id": "imported-cost-002",
    "name": "全铜螺纹截止阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-002-001",
        "name": "DN40",
        "unit": "个",
        "price": 121.14,
        "sourceRow": 9,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：全铜螺纹截止阀。"
      },
      {
        "id": "imported-cost-002-002",
        "name": "DN50",
        "unit": "个",
        "price": 159.72,
        "sourceRow": 10,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：全铜螺纹截止阀。"
      }
    ]
  },
  {
    "id": "imported-cost-003",
    "name": "法兰闸阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-003-001",
        "name": "DN65",
        "unit": "个",
        "price": 309.68,
        "sourceRow": 11,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-002",
        "name": "DN80",
        "unit": "个",
        "price": 352.84,
        "sourceRow": 12,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-003",
        "name": "DN100",
        "unit": "个",
        "price": 420.87,
        "sourceRow": 13,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-004",
        "name": "DN125",
        "unit": "个",
        "price": 625.77,
        "sourceRow": 14,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-005",
        "name": "DN150",
        "unit": "个",
        "price": 694.21,
        "sourceRow": 15,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-006",
        "name": "DN200",
        "unit": "个",
        "price": 1189.71,
        "sourceRow": 16,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-007",
        "name": "DN250",
        "unit": "个",
        "price": 2041.78,
        "sourceRow": 17,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-008",
        "name": "DN300",
        "unit": "个",
        "price": 2472.46,
        "sourceRow": 18,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-009",
        "name": "DN350",
        "unit": "个",
        "price": 4600.26,
        "sourceRow": 19,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-010",
        "name": "DN400",
        "unit": "个",
        "price": 6257.49,
        "sourceRow": 20,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-011",
        "name": "DN450",
        "unit": "个",
        "price": 6839.48,
        "sourceRow": 21,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-012",
        "name": "DN500",
        "unit": "个",
        "price": 10149.25,
        "sourceRow": 22,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      },
      {
        "id": "imported-cost-003-013",
        "name": "DN50",
        "unit": "个",
        "price": 231.39,
        "sourceRow": 23,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰闸阀。"
      }
    ]
  },
  {
    "id": "imported-cost-004",
    "name": "蝶阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-004-001",
        "name": "DN65 (法兰连接)",
        "unit": "个",
        "price": 261.34,
        "sourceRow": 24,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-002",
        "name": "DN80 (法兰连接)",
        "unit": "个",
        "price": 294.8,
        "sourceRow": 25,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-003",
        "name": "DN65(法兰连接)",
        "unit": "个",
        "price": 236.75,
        "sourceRow": 26,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-004",
        "name": "DN80(法兰连接)",
        "unit": "个",
        "price": 270.06,
        "sourceRow": 27,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-005",
        "name": "DN100(法兰连接)",
        "unit": "个",
        "price": 369.52,
        "sourceRow": 28,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-006",
        "name": "DN125(法兰连接)",
        "unit": "个",
        "price": 484.52,
        "sourceRow": 29,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-007",
        "name": "DN150(法兰连接)",
        "unit": "个",
        "price": 568.35,
        "sourceRow": 30,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-008",
        "name": "DN200(法兰连接)",
        "unit": "个",
        "price": 879.7,
        "sourceRow": 31,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-009",
        "name": "DN250(法兰连接)",
        "unit": "个",
        "price": 1275.78,
        "sourceRow": 32,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-010",
        "name": "DN300(法兰连接)",
        "unit": "个",
        "price": 1565.13,
        "sourceRow": 33,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-011",
        "name": "DN350(法兰连接)",
        "unit": "个",
        "price": 1924.29,
        "sourceRow": 34,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-012",
        "name": "DN400(法兰连接)",
        "unit": "个",
        "price": 3103.52,
        "sourceRow": 35,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-013",
        "name": "DN450(法兰连接)",
        "unit": "个",
        "price": 3957.03,
        "sourceRow": 36,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-014",
        "name": "DN500(法兰连接)",
        "unit": "个",
        "price": 4576.96,
        "sourceRow": 37,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-015",
        "name": "DN65",
        "unit": "个",
        "price": 159.47,
        "sourceRow": 38,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-016",
        "name": "DN80",
        "unit": "个",
        "price": 186.49,
        "sourceRow": 39,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-017",
        "name": "DN100",
        "unit": "个",
        "price": 270.87,
        "sourceRow": 40,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-018",
        "name": "DN125",
        "unit": "个",
        "price": 327.94,
        "sourceRow": 41,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-019",
        "name": "DN150",
        "unit": "个",
        "price": 376.04,
        "sourceRow": 42,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-020",
        "name": "DN200",
        "unit": "个",
        "price": 629.38,
        "sourceRow": 43,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-021",
        "name": "DN100 (法兰连接)",
        "unit": "个",
        "price": 382.31,
        "sourceRow": 44,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-022",
        "name": "DN125 (法兰连接)",
        "unit": "个",
        "price": 499.54,
        "sourceRow": 45,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-023",
        "name": "DN150 (法兰连接)",
        "unit": "个",
        "price": 587.91,
        "sourceRow": 46,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      },
      {
        "id": "imported-cost-004-024",
        "name": "DN200 (法兰连接)",
        "unit": "个",
        "price": 912.6,
        "sourceRow": 47,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：蝶阀。"
      }
    ]
  },
  {
    "id": "imported-cost-005",
    "name": "法兰止回阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-005-001",
        "name": "DN65",
        "unit": "个",
        "price": 274.27,
        "sourceRow": 48,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-002",
        "name": "DN80",
        "unit": "个",
        "price": 320.54,
        "sourceRow": 49,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-003",
        "name": "DN100",
        "unit": "个",
        "price": 402.08,
        "sourceRow": 50,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-004",
        "name": "DN125",
        "unit": "个",
        "price": 561.8,
        "sourceRow": 51,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-005",
        "name": "DN150",
        "unit": "个",
        "price": 679.66,
        "sourceRow": 52,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-006",
        "name": "DN200",
        "unit": "个",
        "price": 1111.11,
        "sourceRow": 53,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-007",
        "name": "DN250",
        "unit": "个",
        "price": 1884.18,
        "sourceRow": 54,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-008",
        "name": "DN300",
        "unit": "个",
        "price": 2686.44,
        "sourceRow": 55,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-009",
        "name": "DN350",
        "unit": "个",
        "price": 3364.0,
        "sourceRow": 56,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-010",
        "name": "DN400",
        "unit": "个",
        "price": 4213.21,
        "sourceRow": 57,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-011",
        "name": "DN450",
        "unit": "个",
        "price": 5614.55,
        "sourceRow": 58,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      },
      {
        "id": "imported-cost-005-012",
        "name": "DN500",
        "unit": "个",
        "price": 6143.79,
        "sourceRow": 59,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰止回阀。"
      }
    ]
  },
  {
    "id": "imported-cost-006",
    "name": "可曲挠橡胶接头",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-006-001",
        "name": "DN40(法兰连接)",
        "unit": "个",
        "price": 132.21,
        "sourceRow": 60,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-002",
        "name": "DN50(法兰连接)",
        "unit": "个",
        "price": 152.31,
        "sourceRow": 61,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-003",
        "name": "DN65(法兰连接)",
        "unit": "个",
        "price": 193.0,
        "sourceRow": 62,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-004",
        "name": "DN80(法兰连接)",
        "unit": "个",
        "price": 254.7,
        "sourceRow": 63,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-005",
        "name": "DN100(法兰连接)",
        "unit": "个",
        "price": 324.61,
        "sourceRow": 64,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-006",
        "name": "DN125(法兰连接)",
        "unit": "个",
        "price": 438.2,
        "sourceRow": 65,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-007",
        "name": "DN150(法兰连接)",
        "unit": "个",
        "price": 615.72,
        "sourceRow": 66,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-008",
        "name": "DN200(法兰连接)",
        "unit": "个",
        "price": 874.47,
        "sourceRow": 67,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-009",
        "name": "DN250(法兰连接)",
        "unit": "个",
        "price": 1095.46,
        "sourceRow": 68,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-010",
        "name": "DN300(法兰连接)",
        "unit": "个",
        "price": 1308.63,
        "sourceRow": 69,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-011",
        "name": "DN350(法兰连接)",
        "unit": "个",
        "price": 1670.14,
        "sourceRow": 70,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-012",
        "name": "DN400(法兰连接)",
        "unit": "个",
        "price": 1899.78,
        "sourceRow": 71,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-013",
        "name": "DN450(法兰连接)",
        "unit": "个",
        "price": 2107.73,
        "sourceRow": 72,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-014",
        "name": "DN500(法兰连接)",
        "unit": "个",
        "price": 2414.49,
        "sourceRow": 73,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-015",
        "name": "DN50",
        "unit": "个",
        "price": 111.07,
        "sourceRow": 74,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-016",
        "name": "DN65",
        "unit": "个",
        "price": 151.47,
        "sourceRow": 75,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-017",
        "name": "DN80",
        "unit": "个",
        "price": 184.3,
        "sourceRow": 76,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-018",
        "name": "DN100",
        "unit": "个",
        "price": 253.13,
        "sourceRow": 77,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-019",
        "name": "DN150",
        "unit": "个",
        "price": 482.71,
        "sourceRow": 78,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-020",
        "name": "DN200",
        "unit": "个",
        "price": 662.98,
        "sourceRow": 79,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-021",
        "name": "DN250",
        "unit": "个",
        "price": 910.46,
        "sourceRow": 80,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      },
      {
        "id": "imported-cost-006-022",
        "name": "DN300",
        "unit": "个",
        "price": 1111.94,
        "sourceRow": 81,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：可曲挠橡胶接头。"
      }
    ]
  },
  {
    "id": "imported-cost-007",
    "name": "不锈钢波纹管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-007-001",
        "name": "DN50(法兰连接)",
        "unit": "个",
        "price": 271.48,
        "sourceRow": 82,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-002",
        "name": "DN65(法兰连接)",
        "unit": "个",
        "price": 381.18,
        "sourceRow": 83,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-003",
        "name": "DN32",
        "unit": "个",
        "price": 119.3,
        "sourceRow": 84,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-004",
        "name": "DN40",
        "unit": "个",
        "price": 185.9,
        "sourceRow": 85,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-005",
        "name": "DN80(法兰连接)",
        "unit": "个",
        "price": 456.73,
        "sourceRow": 86,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-006",
        "name": "DN100(法兰连接)",
        "unit": "个",
        "price": 552.28,
        "sourceRow": 87,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-007",
        "name": "DN125(法兰连接)",
        "unit": "个",
        "price": 697.31,
        "sourceRow": 88,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-008",
        "name": "DN150(法兰连接)",
        "unit": "个",
        "price": 924.2,
        "sourceRow": 89,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-009",
        "name": "DN200(法兰连接)",
        "unit": "个",
        "price": 1292.36,
        "sourceRow": 90,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-010",
        "name": "DN250(法兰连接)",
        "unit": "个",
        "price": 1908.36,
        "sourceRow": 91,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-011",
        "name": "DN300(法兰连接)",
        "unit": "个",
        "price": 2431.57,
        "sourceRow": 92,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-012",
        "name": "DN350(法兰连接)",
        "unit": "个",
        "price": 2625.57,
        "sourceRow": 93,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-013",
        "name": "DN400(法兰连接)",
        "unit": "个",
        "price": 2891.46,
        "sourceRow": 94,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-014",
        "name": "DN450(法兰连接)",
        "unit": "个",
        "price": 3405.51,
        "sourceRow": 95,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      },
      {
        "id": "imported-cost-007-015",
        "name": "DN500(法兰连接)",
        "unit": "个",
        "price": 4045.44,
        "sourceRow": 96,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢波纹管。"
      }
    ]
  },
  {
    "id": "imported-cost-008",
    "name": "水表安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-008-001",
        "name": "DN25(螺纹连接)（个）",
        "unit": "个",
        "price": 145.19,
        "sourceRow": 97,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-002",
        "name": "DN32(螺纹连接)（个）",
        "unit": "个",
        "price": 196.42,
        "sourceRow": 98,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-003",
        "name": "DN40(螺纹连接)（个）",
        "unit": "个",
        "price": 290.57,
        "sourceRow": 99,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-004",
        "name": "DN50(螺纹连接)（个）",
        "unit": "个",
        "price": 390.53,
        "sourceRow": 100,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-005",
        "name": "DN20(螺纹连接)",
        "unit": "组",
        "price": 111.44,
        "sourceRow": 101,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-006",
        "name": "DN25(螺纹连接)（组）",
        "unit": "组",
        "price": 158.21,
        "sourceRow": 102,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-007",
        "name": "DN32(螺纹连接)（组）",
        "unit": "组",
        "price": 199.02,
        "sourceRow": 103,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-008",
        "name": "DN40(螺纹连接)（组）",
        "unit": "组",
        "price": 292.03,
        "sourceRow": 104,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-009",
        "name": "DN50(螺纹连接)（组）",
        "unit": "组",
        "price": 391.45,
        "sourceRow": 105,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-010",
        "name": "DN65(螺纹连接)",
        "unit": "组",
        "price": 594.98,
        "sourceRow": 106,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-011",
        "name": "DN80(螺纹连接)",
        "unit": "组",
        "price": 765.45,
        "sourceRow": 107,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      },
      {
        "id": "imported-cost-008-012",
        "name": "DN100(法兰连接)",
        "unit": "组",
        "price": 1382.8,
        "sourceRow": 108,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水表安装。"
      }
    ]
  },
  {
    "id": "imported-cost-009",
    "name": "智能IC卡水表",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-009-001",
        "name": "DN32",
        "unit": "个",
        "price": 196.42,
        "sourceRow": 109,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：智能IC卡水表。"
      },
      {
        "id": "imported-cost-009-002",
        "name": "DN40",
        "unit": "个",
        "price": 290.57,
        "sourceRow": 110,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：智能IC卡水表。"
      }
    ]
  },
  {
    "id": "imported-cost-010",
    "name": "进户套管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-010-001",
        "name": "Φ50（镀锌钢管）",
        "unit": "根",
        "price": 126.28,
        "sourceRow": 111,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：进户套管。"
      },
      {
        "id": "imported-cost-010-002",
        "name": "Φ80（镀锌钢管）",
        "unit": "根",
        "price": 175.05,
        "sourceRow": 112,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：进户套管。"
      },
      {
        "id": "imported-cost-010-003",
        "name": "Φ100（镀锌钢管）",
        "unit": "根",
        "price": 228.31,
        "sourceRow": 113,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：进户套管。"
      },
      {
        "id": "imported-cost-010-004",
        "name": "Φ120（镀锌钢管）",
        "unit": "根",
        "price": 280.05,
        "sourceRow": 114,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：进户套管。"
      },
      {
        "id": "imported-cost-010-005",
        "name": "Φ150（镀锌钢管）",
        "unit": "根",
        "price": 314.63,
        "sourceRow": 115,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：进户套管。"
      },
      {
        "id": "imported-cost-010-006",
        "name": "Φ200（镀锌钢管）",
        "unit": "根",
        "price": 349.45,
        "sourceRow": 116,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：进户套管。"
      }
    ]
  },
  {
    "id": "imported-cost-011",
    "name": "PE给水管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-011-001",
        "name": "Φ160（热熔连接）PN1.6MPa",
        "unit": "m",
        "price": 130.73,
        "sourceRow": 117,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：PE给水管。"
      },
      {
        "id": "imported-cost-011-002",
        "name": "Φ200（热熔连接）PN1.6MPa",
        "unit": "m",
        "price": 196.54,
        "sourceRow": 118,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：PE给水管。"
      }
    ]
  },
  {
    "id": "imported-cost-012",
    "name": "冷水型钢塑复合管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-012-001",
        "name": "DN80(螺纹连接)",
        "unit": "m",
        "price": 105.68,
        "sourceRow": 119,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冷水型钢塑复合管。"
      },
      {
        "id": "imported-cost-012-002",
        "name": "DN100(沟槽连接)",
        "unit": "m",
        "price": 146.68,
        "sourceRow": 120,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冷水型钢塑复合管。"
      }
    ]
  },
  {
    "id": "imported-cost-013",
    "name": "消防水镀锌钢管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-013-001",
        "name": "DN100(沟槽连接)",
        "unit": "m",
        "price": 101.65,
        "sourceRow": 121,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水镀锌钢管。"
      },
      {
        "id": "imported-cost-013-002",
        "name": "DN125(沟槽连接)",
        "unit": "m",
        "price": 129.1,
        "sourceRow": 122,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水镀锌钢管。"
      },
      {
        "id": "imported-cost-013-003",
        "name": "DN150(沟槽连接)",
        "unit": "m",
        "price": 161.87,
        "sourceRow": 123,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水镀锌钢管。"
      },
      {
        "id": "imported-cost-013-004",
        "name": "DN200(沟槽连接)",
        "unit": "m",
        "price": 238.13,
        "sourceRow": 124,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水镀锌钢管。"
      },
      {
        "id": "imported-cost-013-005",
        "name": "DN100(焊接)",
        "unit": "m",
        "price": 121.14,
        "sourceRow": 125,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水镀锌钢管。"
      },
      {
        "id": "imported-cost-013-006",
        "name": "DN125(焊接)",
        "unit": "m",
        "price": 152.11,
        "sourceRow": 126,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水镀锌钢管。"
      },
      {
        "id": "imported-cost-013-007",
        "name": "DN150(焊接)",
        "unit": "m",
        "price": 183.17,
        "sourceRow": 127,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水镀锌钢管。"
      },
      {
        "id": "imported-cost-013-008",
        "name": "DN200(焊接)",
        "unit": "m",
        "price": 259.59,
        "sourceRow": 128,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水镀锌钢管。"
      }
    ]
  },
  {
    "id": "imported-cost-014",
    "name": "消防水泵接合器",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-014-001",
        "name": "DN100 SQS",
        "unit": "套",
        "price": 1415.16,
        "sourceRow": 129,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水泵接合器。"
      },
      {
        "id": "imported-cost-014-002",
        "name": "DN150 SQS",
        "unit": "套",
        "price": 2330.73,
        "sourceRow": 130,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水泵接合器。"
      },
      {
        "id": "imported-cost-014-003",
        "name": "DN100 SQD",
        "unit": "套",
        "price": 888.63,
        "sourceRow": 131,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水泵接合器。"
      },
      {
        "id": "imported-cost-014-004",
        "name": "DN150 SQD",
        "unit": "套",
        "price": 1269.14,
        "sourceRow": 132,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消防水泵接合器。"
      }
    ]
  },
  {
    "id": "imported-cost-015",
    "name": "管道倒流防止器",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-015-001",
        "name": "DN100",
        "unit": "个",
        "price": 883.85,
        "sourceRow": 133,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：管道倒流防止器。"
      },
      {
        "id": "imported-cost-015-002",
        "name": "DN150",
        "unit": "个",
        "price": 1301.77,
        "sourceRow": 134,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：管道倒流防止器。"
      },
      {
        "id": "imported-cost-015-003",
        "name": "DN32",
        "unit": "个",
        "price": 173.54,
        "sourceRow": 135,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：管道倒流防止器。"
      },
      {
        "id": "imported-cost-015-004",
        "name": "DN40",
        "unit": "个",
        "price": 284.96,
        "sourceRow": 136,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：管道倒流防止器。"
      },
      {
        "id": "imported-cost-015-005",
        "name": "DN50",
        "unit": "个",
        "price": 483.5,
        "sourceRow": 137,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：管道倒流防止器。"
      },
      {
        "id": "imported-cost-015-006",
        "name": "DN65",
        "unit": "个",
        "price": 591.02,
        "sourceRow": 138,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：管道倒流防止器。"
      },
      {
        "id": "imported-cost-015-007",
        "name": "DN80",
        "unit": "个",
        "price": 697.51,
        "sourceRow": 139,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：管道倒流防止器。"
      }
    ]
  },
  {
    "id": "imported-cost-016",
    "name": "塑料球阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-016-001",
        "name": "Φ90",
        "unit": "个",
        "price": 100.93,
        "sourceRow": 140,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：塑料球阀。"
      },
      {
        "id": "imported-cost-016-002",
        "name": "Φ110",
        "unit": "个",
        "price": 165.7,
        "sourceRow": 141,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：塑料球阀。"
      }
    ]
  },
  {
    "id": "imported-cost-017",
    "name": "不锈钢水箱",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-017-001",
        "name": "池高1.0M以内，按照外表面展开面积计算",
        "unit": "㎡",
        "price": 610.74,
        "sourceRow": 142,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢水箱。"
      },
      {
        "id": "imported-cost-017-002",
        "name": "池高2.0M以内，按照外表面展开面积计算",
        "unit": "㎡",
        "price": 607.79,
        "sourceRow": 143,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢水箱。"
      },
      {
        "id": "imported-cost-017-003",
        "name": "池高3.0M以内，按照外表面展开面积计算",
        "unit": "㎡",
        "price": 605.99,
        "sourceRow": 144,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢水箱。"
      },
      {
        "id": "imported-cost-017-004",
        "name": "池高3.0M以外，按照外表面展开面积计算",
        "unit": "㎡",
        "price": 605.64,
        "sourceRow": 145,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：不锈钢水箱。"
      }
    ]
  },
  {
    "id": "imported-cost-018",
    "name": "DN20mm水表",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-018-001",
        "name": "射频卡表",
        "unit": "个",
        "price": 421.78,
        "sourceRow": 146,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN20mm水表。"
      },
      {
        "id": "imported-cost-018-002",
        "name": "远传",
        "unit": "个",
        "price": 271.91,
        "sourceRow": 147,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN20mm水表。"
      }
    ]
  },
  {
    "id": "imported-cost-019",
    "name": "DN25mm水表",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-019-001",
        "name": "射频卡表",
        "unit": "个",
        "price": 522.95,
        "sourceRow": 148,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN25mm水表。"
      },
      {
        "id": "imported-cost-019-002",
        "name": "远传",
        "unit": "个",
        "price": 377.14,
        "sourceRow": 149,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN25mm水表。"
      }
    ]
  },
  {
    "id": "imported-cost-020",
    "name": "DN32mm水表",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-020-001",
        "name": "射频卡表",
        "unit": "个",
        "price": 992.76,
        "sourceRow": 150,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN32mm水表。"
      },
      {
        "id": "imported-cost-020-002",
        "name": "远传",
        "unit": "个",
        "price": 972.5,
        "sourceRow": 151,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN32mm水表。"
      }
    ]
  },
  {
    "id": "imported-cost-021",
    "name": "DN40mm水表",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-021-001",
        "name": "射频卡表",
        "unit": "个",
        "price": 1341.98,
        "sourceRow": 152,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN40mm水表。"
      },
      {
        "id": "imported-cost-021-002",
        "name": "远传",
        "unit": "个",
        "price": 1447.91,
        "sourceRow": 153,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN40mm水表。"
      }
    ]
  },
  {
    "id": "imported-cost-022",
    "name": "DN50mm水表",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-022-001",
        "name": "射频卡表",
        "unit": "个",
        "price": 1529.74,
        "sourceRow": 154,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN50mm水表。"
      },
      {
        "id": "imported-cost-022-002",
        "name": "远传",
        "unit": "个",
        "price": 1517.42,
        "sourceRow": 155,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：DN50mm水表。"
      }
    ]
  },
  {
    "id": "imported-cost-023",
    "name": "全铜螺纹球阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-023-001",
        "name": "DN40",
        "unit": "个",
        "price": 132.39,
        "sourceRow": 156,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：全铜螺纹球阀。"
      },
      {
        "id": "imported-cost-023-002",
        "name": "DN50",
        "unit": "个",
        "price": 209.38,
        "sourceRow": 157,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：全铜螺纹球阀。"
      }
    ]
  },
  {
    "id": "imported-cost-024",
    "name": "压力表",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-024-001",
        "name": "含弯管表阀",
        "unit": "个",
        "price": 116.0,
        "sourceRow": 158,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：压力表。"
      },
      {
        "id": "imported-cost-024-002",
        "name": "已包含弯管表阀",
        "unit": "个",
        "price": 116.73,
        "sourceRow": 159,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：压力表。"
      }
    ]
  },
  {
    "id": "imported-cost-025",
    "name": "焊接钢管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-025-001",
        "name": "DN65（焊接）",
        "unit": "m",
        "price": 107.99,
        "sourceRow": 160,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-002",
        "name": "DN80（焊接）",
        "unit": "m",
        "price": 125.1,
        "sourceRow": 161,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-003",
        "name": "DN100（焊接）",
        "unit": "m",
        "price": 156.25,
        "sourceRow": 162,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-004",
        "name": "DN125（焊接）",
        "unit": "m",
        "price": 185.61,
        "sourceRow": 163,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-005",
        "name": "DN150（焊接）",
        "unit": "m",
        "price": 210.76,
        "sourceRow": 164,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-006",
        "name": "DN200（焊接）",
        "unit": "m",
        "price": 306.3,
        "sourceRow": 165,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-007",
        "name": "DN250（焊接）",
        "unit": "m",
        "price": 471.94,
        "sourceRow": 166,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-008",
        "name": "DN300（焊接）",
        "unit": "m",
        "price": 499.12,
        "sourceRow": 167,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-009",
        "name": "DN350（焊接）",
        "unit": "m",
        "price": 578.29,
        "sourceRow": 168,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-010",
        "name": "DN400（焊接）",
        "unit": "m",
        "price": 643.91,
        "sourceRow": 169,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-011",
        "name": "DN450（焊接）",
        "unit": "m",
        "price": 721.99,
        "sourceRow": 170,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-012",
        "name": "DN500（焊接）",
        "unit": "m",
        "price": 802.35,
        "sourceRow": 171,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-013",
        "name": "DN100 (焊接)",
        "unit": "m",
        "price": 120.34,
        "sourceRow": 172,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-014",
        "name": "DN125 (焊接)",
        "unit": "m",
        "price": 154.19,
        "sourceRow": 173,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-015",
        "name": "DN150 (焊接)",
        "unit": "m",
        "price": 175.27,
        "sourceRow": 174,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-016",
        "name": "DN200 (焊接)",
        "unit": "m",
        "price": 257.11,
        "sourceRow": 175,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-017",
        "name": "DN250 (焊接)",
        "unit": "m",
        "price": 390.23,
        "sourceRow": 176,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      },
      {
        "id": "imported-cost-025-018",
        "name": "DN300 (焊接)",
        "unit": "m",
        "price": 401.26,
        "sourceRow": 177,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：焊接钢管。"
      }
    ]
  },
  {
    "id": "imported-cost-026",
    "name": "无缝钢管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-026-001",
        "name": "DN100（焊接）",
        "unit": "m",
        "price": 168.07,
        "sourceRow": 178,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无缝钢管。"
      },
      {
        "id": "imported-cost-026-002",
        "name": "DN125（焊接）",
        "unit": "m",
        "price": 188.24,
        "sourceRow": 179,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无缝钢管。"
      },
      {
        "id": "imported-cost-026-003",
        "name": "DN150（焊接）",
        "unit": "m",
        "price": 225.71,
        "sourceRow": 180,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无缝钢管。"
      },
      {
        "id": "imported-cost-026-004",
        "name": "DN200（焊接）",
        "unit": "m",
        "price": 339.72,
        "sourceRow": 181,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无缝钢管。"
      },
      {
        "id": "imported-cost-026-005",
        "name": "DN250（焊接）",
        "unit": "m",
        "price": 491.59,
        "sourceRow": 182,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无缝钢管。"
      },
      {
        "id": "imported-cost-026-006",
        "name": "DN300（焊接）",
        "unit": "m",
        "price": 584.84,
        "sourceRow": 183,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无缝钢管。"
      },
      {
        "id": "imported-cost-026-007",
        "name": "DN350（焊接）",
        "unit": "m",
        "price": 712.67,
        "sourceRow": 184,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无缝钢管。"
      },
      {
        "id": "imported-cost-026-008",
        "name": "DN400（焊接）",
        "unit": "m",
        "price": 795.49,
        "sourceRow": 185,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无缝钢管。"
      }
    ]
  },
  {
    "id": "imported-cost-027",
    "name": "铜管安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-027-001",
        "name": "Φ31.8*1.4",
        "unit": "m",
        "price": 113.95,
        "sourceRow": 186,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：铜管安装。"
      },
      {
        "id": "imported-cost-027-002",
        "name": "Φ34.9*1.4",
        "unit": "m",
        "price": 123.82,
        "sourceRow": 187,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：铜管安装。"
      },
      {
        "id": "imported-cost-027-003",
        "name": "Φ38.1*1.4",
        "unit": "m",
        "price": 135.31,
        "sourceRow": 188,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：铜管安装。"
      },
      {
        "id": "imported-cost-027-004",
        "name": "Φ41.3*1.4",
        "unit": "m",
        "price": 145.66,
        "sourceRow": 189,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：铜管安装。"
      },
      {
        "id": "imported-cost-027-005",
        "name": "Φ44.5*1.4",
        "unit": "m",
        "price": 156.51,
        "sourceRow": 190,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：铜管安装。"
      }
    ]
  },
  {
    "id": "imported-cost-028",
    "name": "螺纹安全阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-028-001",
        "name": "DN15",
        "unit": "个",
        "price": 349.18,
        "sourceRow": 191,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹安全阀。"
      },
      {
        "id": "imported-cost-028-002",
        "name": "DN20",
        "unit": "个",
        "price": 356.84,
        "sourceRow": 192,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹安全阀。"
      },
      {
        "id": "imported-cost-028-003",
        "name": "DN25",
        "unit": "个",
        "price": 407.64,
        "sourceRow": 193,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹安全阀。"
      },
      {
        "id": "imported-cost-028-004",
        "name": "DN32",
        "unit": "个",
        "price": 430.84,
        "sourceRow": 194,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹安全阀。"
      },
      {
        "id": "imported-cost-028-005",
        "name": "DN40",
        "unit": "个",
        "price": 563.87,
        "sourceRow": 195,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹安全阀。"
      },
      {
        "id": "imported-cost-028-006",
        "name": "DN50",
        "unit": "个",
        "price": 694.91,
        "sourceRow": 196,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹安全阀。"
      }
    ]
  },
  {
    "id": "imported-cost-029",
    "name": "Y型过滤器",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-029-001",
        "name": "DN32(螺纹连接)",
        "unit": "个",
        "price": 122.77,
        "sourceRow": 197,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-002",
        "name": "DN40(螺纹连接)",
        "unit": "个",
        "price": 155.1,
        "sourceRow": 198,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-003",
        "name": "DN50(螺纹连接)",
        "unit": "个",
        "price": 171.59,
        "sourceRow": 199,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-004",
        "name": "DN65(法兰连接)",
        "unit": "个",
        "price": 294.66,
        "sourceRow": 200,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-005",
        "name": "DN80(法兰连接)",
        "unit": "个",
        "price": 353.89,
        "sourceRow": 201,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-006",
        "name": "DN100(法兰连接)",
        "unit": "个",
        "price": 436.82,
        "sourceRow": 202,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-007",
        "name": "DN125(法兰连接)",
        "unit": "个",
        "price": 573.12,
        "sourceRow": 203,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-008",
        "name": "DN150(法兰连接)",
        "unit": "个",
        "price": 712.57,
        "sourceRow": 204,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-009",
        "name": "DN200(法兰连接)",
        "unit": "个",
        "price": 1199.31,
        "sourceRow": 205,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-010",
        "name": "DN250(法兰连接)",
        "unit": "个",
        "price": 2099.03,
        "sourceRow": 206,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-011",
        "name": "DN300(法兰连接)",
        "unit": "个",
        "price": 2764.4,
        "sourceRow": 207,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-012",
        "name": "DN350(法兰连接)",
        "unit": "个",
        "price": 3232.59,
        "sourceRow": 208,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-013",
        "name": "DN400(法兰连接)",
        "unit": "个",
        "price": 4905.45,
        "sourceRow": 209,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-014",
        "name": "DN450(法兰连接)",
        "unit": "个",
        "price": 5240.81,
        "sourceRow": 210,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-015",
        "name": "DN500(法兰连接)",
        "unit": "个",
        "price": 5908.68,
        "sourceRow": 211,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      },
      {
        "id": "imported-cost-029-016",
        "name": "DN50",
        "unit": "个",
        "price": 196.09,
        "sourceRow": 212,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：Y型过滤器。"
      }
    ]
  },
  {
    "id": "imported-cost-030",
    "name": "螺纹浮球阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-030-001",
        "name": "DN25",
        "unit": "个",
        "price": 111.73,
        "sourceRow": 213,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹浮球阀。"
      },
      {
        "id": "imported-cost-030-002",
        "name": "DN32",
        "unit": "个",
        "price": 183.72,
        "sourceRow": 214,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹浮球阀。"
      },
      {
        "id": "imported-cost-030-003",
        "name": "DN40",
        "unit": "个",
        "price": 220.67,
        "sourceRow": 215,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹浮球阀。"
      },
      {
        "id": "imported-cost-030-004",
        "name": "DN50",
        "unit": "个",
        "price": 296.97,
        "sourceRow": 216,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹浮球阀。"
      }
    ]
  },
  {
    "id": "imported-cost-031",
    "name": "遥控浮球阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-031-001",
        "name": "DN65(法兰连接)",
        "unit": "个",
        "price": 724.85,
        "sourceRow": 217,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      },
      {
        "id": "imported-cost-031-002",
        "name": "DN80(法兰连接)",
        "unit": "个",
        "price": 838.25,
        "sourceRow": 218,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      },
      {
        "id": "imported-cost-031-003",
        "name": "DN100(法兰连接)",
        "unit": "个",
        "price": 1016.23,
        "sourceRow": 219,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      },
      {
        "id": "imported-cost-031-004",
        "name": "DN150(法兰连接)",
        "unit": "个",
        "price": 1521.79,
        "sourceRow": 220,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      },
      {
        "id": "imported-cost-031-005",
        "name": "DN200(法兰连接)",
        "unit": "个",
        "price": 4811.34,
        "sourceRow": 221,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      },
      {
        "id": "imported-cost-031-006",
        "name": "DN65 (法兰连接)",
        "unit": "个",
        "price": 726.41,
        "sourceRow": 222,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      },
      {
        "id": "imported-cost-031-007",
        "name": "DN80 (法兰连接)",
        "unit": "个",
        "price": 839.81,
        "sourceRow": 223,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      },
      {
        "id": "imported-cost-031-008",
        "name": "DN100 (法兰连接)",
        "unit": "个",
        "price": 1018.13,
        "sourceRow": 224,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      },
      {
        "id": "imported-cost-031-009",
        "name": "DN150 (法兰连接)",
        "unit": "个",
        "price": 1524.23,
        "sourceRow": 225,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：遥控浮球阀。"
      }
    ]
  },
  {
    "id": "imported-cost-032",
    "name": "法兰阀门保温",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-032-001",
        "name": "DN125至DN200",
        "unit": "个",
        "price": 164.35,
        "sourceRow": 226,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰阀门保温。"
      },
      {
        "id": "imported-cost-032-002",
        "name": "DN250至DN300",
        "unit": "个",
        "price": 259.19,
        "sourceRow": 227,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰阀门保温。"
      },
      {
        "id": "imported-cost-032-003",
        "name": "DN350至DN400",
        "unit": "个",
        "price": 371.86,
        "sourceRow": 228,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰阀门保温。"
      },
      {
        "id": "imported-cost-032-004",
        "name": "DN450至DN500",
        "unit": "个",
        "price": 449.93,
        "sourceRow": 229,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰阀门保温。"
      }
    ]
  },
  {
    "id": "imported-cost-033",
    "name": "镀锌薄钢板圆形风管制作安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-033-001",
        "name": "Φ320mm以下 δ=0.5mm",
        "unit": "㎡",
        "price": 231.94,
        "sourceRow": 230,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板圆形风管制作安装。"
      },
      {
        "id": "imported-cost-033-002",
        "name": "Φ320mm以下 δ=0.75mm",
        "unit": "㎡",
        "price": 243.03,
        "sourceRow": 231,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板圆形风管制作安装。"
      },
      {
        "id": "imported-cost-033-003",
        "name": "Φ450mm以下 δ=0.5mm",
        "unit": "㎡",
        "price": 205.19,
        "sourceRow": 232,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板圆形风管制作安装。"
      },
      {
        "id": "imported-cost-033-004",
        "name": "Φ450mm以下 δ=0.6mm",
        "unit": "㎡",
        "price": 210.18,
        "sourceRow": 233,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板圆形风管制作安装。"
      },
      {
        "id": "imported-cost-033-005",
        "name": "Φ450mm以下 δ=0.75mm",
        "unit": "㎡",
        "price": 216.28,
        "sourceRow": 234,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板圆形风管制作安装。"
      },
      {
        "id": "imported-cost-033-006",
        "name": "Φ1000mm以下 δ=0.75mm",
        "unit": "㎡",
        "price": 177.95,
        "sourceRow": 235,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板圆形风管制作安装。"
      },
      {
        "id": "imported-cost-033-007",
        "name": "Φ1250mm以下 δ=1.0mm",
        "unit": "㎡",
        "price": 210.39,
        "sourceRow": 236,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板圆形风管制作安装。"
      },
      {
        "id": "imported-cost-033-008",
        "name": "Φ2000mm以下 δ=1.2mm",
        "unit": "㎡",
        "price": 226.52,
        "sourceRow": 237,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板圆形风管制作安装。"
      }
    ]
  },
  {
    "id": "imported-cost-034",
    "name": "镀锌薄钢板矩形风管制作安装 长边长",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-034-001",
        "name": "mm ≤320 δ=0.5mm",
        "unit": "㎡",
        "price": 218.98,
        "sourceRow": 238,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-002",
        "name": "mm ≤320 δ=0.75mm",
        "unit": "㎡",
        "price": 230.07,
        "sourceRow": 239,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-003",
        "name": "mm ≤450 δ=0.5mm",
        "unit": "㎡",
        "price": 169.11,
        "sourceRow": 240,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-004",
        "name": "mm ≤450 δ=0.6mm",
        "unit": "㎡",
        "price": 174.11,
        "sourceRow": 241,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-005",
        "name": "mm ≤450 δ=0.75mm",
        "unit": "㎡",
        "price": 180.2,
        "sourceRow": 242,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-006",
        "name": "mm ≤450 δ=1.0mm",
        "unit": "㎡",
        "price": 183.35,
        "sourceRow": 243,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-007",
        "name": "mm ≤1000 δ=0.75mm",
        "unit": "㎡",
        "price": 148.83,
        "sourceRow": 244,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-008",
        "name": "mm ≤1000 δ=1.0mm",
        "unit": "㎡",
        "price": 151.37,
        "sourceRow": 245,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-009",
        "name": "mm ≤1250 δ=1.0mm",
        "unit": "㎡",
        "price": 168.62,
        "sourceRow": 246,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-010",
        "name": "mm ≤2000 δ=1.0mm",
        "unit": "㎡",
        "price": 188.47,
        "sourceRow": 247,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-011",
        "name": "mm ≤2000 δ=1.2mm",
        "unit": "㎡",
        "price": 196.63,
        "sourceRow": 248,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-012",
        "name": "mm ≤2000 δ=1.5mm",
        "unit": "㎡",
        "price": 213.29,
        "sourceRow": 249,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-013",
        "name": "mm ≤4000 δ=1.2mm",
        "unit": "㎡",
        "price": 204.96,
        "sourceRow": 250,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      },
      {
        "id": "imported-cost-034-014",
        "name": "mm ≤4000 δ=1.5mm",
        "unit": "㎡",
        "price": 221.63,
        "sourceRow": 251,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：镀锌薄钢板矩形风管制作安装 长边长。"
      }
    ]
  },
  {
    "id": "imported-cost-035",
    "name": "消声静压箱全费用综合包干材料价",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-035-001",
        "name": "标准项（m³）",
        "unit": "m³",
        "price": 779.92,
        "sourceRow": 252,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消声静压箱全费用综合包干材料价。"
      },
      {
        "id": "imported-cost-035-002",
        "name": "标准项（m3）",
        "unit": "m3",
        "price": 779.92,
        "sourceRow": 253,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消声静压箱全费用综合包干材料价。"
      }
    ]
  },
  {
    "id": "imported-cost-036",
    "name": "穿楼板钢套管制作安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-036-001",
        "name": "DN250(与DN200直管配套)",
        "unit": "个",
        "price": 102.2,
        "sourceRow": 254,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：穿楼板钢套管制作安装。"
      },
      {
        "id": "imported-cost-036-002",
        "name": "DN300(与DN250直管配套)",
        "unit": "个",
        "price": 132.73,
        "sourceRow": 255,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：穿楼板钢套管制作安装。"
      }
    ]
  },
  {
    "id": "imported-cost-037",
    "name": "穿墙钢套管制作安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-037-001",
        "name": "DN250(与DN200直管配套)",
        "unit": "个",
        "price": 113.24,
        "sourceRow": 256,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：穿墙钢套管制作安装。"
      },
      {
        "id": "imported-cost-037-002",
        "name": "DN300(与DN250直管配套)",
        "unit": "个",
        "price": 148.0,
        "sourceRow": 257,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：穿墙钢套管制作安装。"
      }
    ]
  },
  {
    "id": "imported-cost-038",
    "name": "穿梁钢套管制作安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-038-001",
        "name": "DN250(与DN200直管配套)",
        "unit": "个",
        "price": 122.09,
        "sourceRow": 258,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：穿梁钢套管制作安装。"
      },
      {
        "id": "imported-cost-038-002",
        "name": "DN300(与DN250直管配套)",
        "unit": "个",
        "price": 159.83,
        "sourceRow": 259,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：穿梁钢套管制作安装。"
      }
    ]
  },
  {
    "id": "imported-cost-039",
    "name": "刚性防水套管制作安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-039-001",
        "name": "DN80(与DN50钢管和dn50塑料管配套)",
        "unit": "个",
        "price": 113.17,
        "sourceRow": 260,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-002",
        "name": "DN100(与DN65钢管和dn63、dn75塑料管配套)",
        "unit": "个",
        "price": 130.39,
        "sourceRow": 261,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-003",
        "name": "DN125(与DN80钢管和dn90塑料管配套)",
        "unit": "个",
        "price": 145.53,
        "sourceRow": 262,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-004",
        "name": "DN150(与DN100钢管和dn110、dn125塑料管配套)",
        "unit": "个",
        "price": 156.63,
        "sourceRow": 263,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-005",
        "name": "DN200(与DN125、DN150钢管和dn140、dn160塑料管配套)",
        "unit": "个",
        "price": 183.02,
        "sourceRow": 264,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-006",
        "name": "DN250(与DN200直管配套)",
        "unit": "个",
        "price": 211.96,
        "sourceRow": 265,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-007",
        "name": "DN300(与DN250直管配套)",
        "unit": "个",
        "price": 284.47,
        "sourceRow": 266,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-008",
        "name": "DN350(与DN300直管配套)",
        "unit": "个",
        "price": 384.31,
        "sourceRow": 267,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-009",
        "name": "DN400(与DN350直管配套)",
        "unit": "个",
        "price": 506.92,
        "sourceRow": 268,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-010",
        "name": "DN450(与DN400直管配套)",
        "unit": "个",
        "price": 639.35,
        "sourceRow": 269,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-011",
        "name": "DN500(与DN450直管配套)",
        "unit": "个",
        "price": 744.4,
        "sourceRow": 270,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      },
      {
        "id": "imported-cost-039-012",
        "name": "DN550(与DN500直管配套)",
        "unit": "个",
        "price": 889.67,
        "sourceRow": 271,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：刚性防水套管制作安装。"
      }
    ]
  },
  {
    "id": "imported-cost-040",
    "name": "柔性防水套管制作安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-040-001",
        "name": "DN80(与DN50直管配套)",
        "unit": "个",
        "price": 345.61,
        "sourceRow": 272,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：柔性防水套管制作安装。"
      },
      {
        "id": "imported-cost-040-002",
        "name": "DN100(与DN65直管配套)",
        "unit": "个",
        "price": 386.95,
        "sourceRow": 273,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：柔性防水套管制作安装。"
      },
      {
        "id": "imported-cost-040-003",
        "name": "DN125(与DN80直管配套)",
        "unit": "个",
        "price": 436.47,
        "sourceRow": 274,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：柔性防水套管制作安装。"
      },
      {
        "id": "imported-cost-040-004",
        "name": "DN150(与DN100直管配套)",
        "unit": "个",
        "price": 531.45,
        "sourceRow": 275,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：柔性防水套管制作安装。"
      },
      {
        "id": "imported-cost-040-005",
        "name": "DN200(与DN150直管配套)",
        "unit": "个",
        "price": 661.76,
        "sourceRow": 276,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：柔性防水套管制作安装。"
      },
      {
        "id": "imported-cost-040-006",
        "name": "DN250(与DN200直管配套)",
        "unit": "个",
        "price": 836.73,
        "sourceRow": 277,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：柔性防水套管制作安装。"
      }
    ]
  },
  {
    "id": "imported-cost-041",
    "name": "防护密闭套管制作安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-041-001",
        "name": "DN50",
        "unit": "个",
        "price": 101.26,
        "sourceRow": 278,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：防护密闭套管制作安装。"
      },
      {
        "id": "imported-cost-041-002",
        "name": "DN65",
        "unit": "个",
        "price": 124.23,
        "sourceRow": 279,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：防护密闭套管制作安装。"
      },
      {
        "id": "imported-cost-041-003",
        "name": "DN80",
        "unit": "个",
        "price": 138.17,
        "sourceRow": 280,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：防护密闭套管制作安装。"
      },
      {
        "id": "imported-cost-041-004",
        "name": "DN100",
        "unit": "个",
        "price": 143.44,
        "sourceRow": 281,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：防护密闭套管制作安装。"
      },
      {
        "id": "imported-cost-041-005",
        "name": "DN125",
        "unit": "个",
        "price": 158.58,
        "sourceRow": 282,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：防护密闭套管制作安装。"
      },
      {
        "id": "imported-cost-041-006",
        "name": "DN150",
        "unit": "个",
        "price": 169.71,
        "sourceRow": 283,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：防护密闭套管制作安装。"
      },
      {
        "id": "imported-cost-041-007",
        "name": "DN200",
        "unit": "个",
        "price": 196.1,
        "sourceRow": 284,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：防护密闭套管制作安装。"
      }
    ]
  },
  {
    "id": "imported-cost-042",
    "name": "圆球灯",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-042-001",
        "name": "低压灯具 （直径20cm）",
        "unit": "个/盏",
        "price": 179.62,
        "sourceRow": 285,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：圆球灯。"
      },
      {
        "id": "imported-cost-042-002",
        "name": "低压灯具 （直径40cm）",
        "unit": "个/盏",
        "price": 262.87,
        "sourceRow": 286,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：圆球灯。"
      }
    ]
  },
  {
    "id": "imported-cost-043",
    "name": "水喷淋镀锌钢管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-043-001",
        "name": "DN65 (螺纹或沟槽连接)",
        "unit": "m",
        "price": 103.78,
        "sourceRow": 287,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水喷淋镀锌钢管。"
      },
      {
        "id": "imported-cost-043-002",
        "name": "DN80 (螺纹或沟槽连接)",
        "unit": "m",
        "price": 112.58,
        "sourceRow": 288,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水喷淋镀锌钢管。"
      },
      {
        "id": "imported-cost-043-003",
        "name": "DN100(沟槽式连接)",
        "unit": "m",
        "price": 115.14,
        "sourceRow": 289,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水喷淋镀锌钢管。"
      },
      {
        "id": "imported-cost-043-004",
        "name": "DN125(沟槽式连接)",
        "unit": "m",
        "price": 143.04,
        "sourceRow": 290,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水喷淋镀锌钢管。"
      },
      {
        "id": "imported-cost-043-005",
        "name": "DN150(沟槽式连接)",
        "unit": "m",
        "price": 164.31,
        "sourceRow": 291,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水喷淋镀锌钢管。"
      },
      {
        "id": "imported-cost-043-006",
        "name": "DN200(沟槽式连接)",
        "unit": "m",
        "price": 244.43,
        "sourceRow": 292,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水喷淋镀锌钢管。"
      }
    ]
  },
  {
    "id": "imported-cost-044",
    "name": "冲压弯头",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-044-001",
        "name": "DN80",
        "unit": "个",
        "price": 100.54,
        "sourceRow": 293,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压弯头。"
      },
      {
        "id": "imported-cost-044-002",
        "name": "DN100",
        "unit": "个",
        "price": 124.31,
        "sourceRow": 294,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压弯头。"
      },
      {
        "id": "imported-cost-044-003",
        "name": "DN125",
        "unit": "个",
        "price": 142.23,
        "sourceRow": 295,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压弯头。"
      },
      {
        "id": "imported-cost-044-004",
        "name": "DN150",
        "unit": "个",
        "price": 174.05,
        "sourceRow": 296,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压弯头。"
      },
      {
        "id": "imported-cost-044-005",
        "name": "DN200",
        "unit": "个",
        "price": 301.08,
        "sourceRow": 297,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压弯头。"
      },
      {
        "id": "imported-cost-044-006",
        "name": "DN250",
        "unit": "个",
        "price": 439.76,
        "sourceRow": 298,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压弯头。"
      },
      {
        "id": "imported-cost-044-007",
        "name": "DN300",
        "unit": "个",
        "price": 537.4,
        "sourceRow": 299,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压弯头。"
      }
    ]
  },
  {
    "id": "imported-cost-045",
    "name": "冲压三通",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-045-001",
        "name": "DN80",
        "unit": "个",
        "price": 107.86,
        "sourceRow": 300,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压三通。"
      },
      {
        "id": "imported-cost-045-002",
        "name": "DN100",
        "unit": "个",
        "price": 132.36,
        "sourceRow": 301,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压三通。"
      },
      {
        "id": "imported-cost-045-003",
        "name": "DN125",
        "unit": "个",
        "price": 149.48,
        "sourceRow": 302,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压三通。"
      },
      {
        "id": "imported-cost-045-004",
        "name": "DN150",
        "unit": "个",
        "price": 195.11,
        "sourceRow": 303,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压三通。"
      },
      {
        "id": "imported-cost-045-005",
        "name": "DN200",
        "unit": "个",
        "price": 312.96,
        "sourceRow": 304,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压三通。"
      },
      {
        "id": "imported-cost-045-006",
        "name": "DN250",
        "unit": "个",
        "price": 461.71,
        "sourceRow": 305,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压三通。"
      },
      {
        "id": "imported-cost-045-007",
        "name": "DN300",
        "unit": "个",
        "price": 638.97,
        "sourceRow": 306,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压三通。"
      }
    ]
  },
  {
    "id": "imported-cost-046",
    "name": "冲压大小头",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-046-001",
        "name": "DN100",
        "unit": "个",
        "price": 116.54,
        "sourceRow": 307,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压大小头。"
      },
      {
        "id": "imported-cost-046-002",
        "name": "DN125",
        "unit": "个",
        "price": 127.82,
        "sourceRow": 308,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压大小头。"
      },
      {
        "id": "imported-cost-046-003",
        "name": "DN150",
        "unit": "个",
        "price": 156.22,
        "sourceRow": 309,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压大小头。"
      },
      {
        "id": "imported-cost-046-004",
        "name": "DN200",
        "unit": "个",
        "price": 241.14,
        "sourceRow": 310,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压大小头。"
      },
      {
        "id": "imported-cost-046-005",
        "name": "DN250",
        "unit": "个",
        "price": 320.63,
        "sourceRow": 311,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压大小头。"
      },
      {
        "id": "imported-cost-046-006",
        "name": "DN300",
        "unit": "个",
        "price": 400.16,
        "sourceRow": 312,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：冲压大小头。"
      }
    ]
  },
  {
    "id": "imported-cost-047",
    "name": "吸水喇叭口",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-047-001",
        "name": "DN150",
        "unit": "个",
        "price": 176.62,
        "sourceRow": 313,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：吸水喇叭口。"
      },
      {
        "id": "imported-cost-047-002",
        "name": "DN200",
        "unit": "个",
        "price": 279.12,
        "sourceRow": 314,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：吸水喇叭口。"
      },
      {
        "id": "imported-cost-047-003",
        "name": "DN250",
        "unit": "个",
        "price": 378.13,
        "sourceRow": 315,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：吸水喇叭口。"
      },
      {
        "id": "imported-cost-047-004",
        "name": "DN300",
        "unit": "个",
        "price": 407.47,
        "sourceRow": 316,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：吸水喇叭口。"
      }
    ]
  },
  {
    "id": "imported-cost-048",
    "name": "螺纹法兰",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-048-001",
        "name": "DN65",
        "unit": "副",
        "price": 135.55,
        "sourceRow": 317,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹法兰。"
      },
      {
        "id": "imported-cost-048-002",
        "name": "DN80",
        "unit": "副",
        "price": 176.15,
        "sourceRow": 318,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹法兰。"
      },
      {
        "id": "imported-cost-048-003",
        "name": "DN100",
        "unit": "副",
        "price": 231.19,
        "sourceRow": 319,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：螺纹法兰。"
      }
    ]
  },
  {
    "id": "imported-cost-049",
    "name": "平焊法兰",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-049-001",
        "name": "DN50",
        "unit": "副",
        "price": 101.3,
        "sourceRow": 320,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      },
      {
        "id": "imported-cost-049-002",
        "name": "DN65",
        "unit": "副",
        "price": 120.45,
        "sourceRow": 321,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      },
      {
        "id": "imported-cost-049-003",
        "name": "DN80",
        "unit": "副",
        "price": 132.77,
        "sourceRow": 322,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      },
      {
        "id": "imported-cost-049-004",
        "name": "DN100",
        "unit": "副",
        "price": 149.97,
        "sourceRow": 323,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      },
      {
        "id": "imported-cost-049-005",
        "name": "DN125",
        "unit": "副",
        "price": 210.59,
        "sourceRow": 324,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      },
      {
        "id": "imported-cost-049-006",
        "name": "DN150",
        "unit": "副",
        "price": 251.17,
        "sourceRow": 325,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      },
      {
        "id": "imported-cost-049-007",
        "name": "DN200",
        "unit": "副",
        "price": 373.98,
        "sourceRow": 326,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      },
      {
        "id": "imported-cost-049-008",
        "name": "DN250",
        "unit": "副",
        "price": 505.13,
        "sourceRow": 327,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      },
      {
        "id": "imported-cost-049-009",
        "name": "DN300",
        "unit": "副",
        "price": 613.59,
        "sourceRow": 328,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：平焊法兰。"
      }
    ]
  },
  {
    "id": "imported-cost-050",
    "name": "法兰静音止回阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-050-001",
        "name": "DN50",
        "unit": "个",
        "price": 165.37,
        "sourceRow": 329,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰静音止回阀。"
      },
      {
        "id": "imported-cost-050-002",
        "name": "DN65",
        "unit": "个",
        "price": 222.99,
        "sourceRow": 330,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰静音止回阀。"
      },
      {
        "id": "imported-cost-050-003",
        "name": "DN80",
        "unit": "个",
        "price": 251.02,
        "sourceRow": 331,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰静音止回阀。"
      },
      {
        "id": "imported-cost-050-004",
        "name": "DN100",
        "unit": "个",
        "price": 315.25,
        "sourceRow": 332,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰静音止回阀。"
      },
      {
        "id": "imported-cost-050-005",
        "name": "DN125",
        "unit": "个",
        "price": 435.49,
        "sourceRow": 333,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰静音止回阀。"
      },
      {
        "id": "imported-cost-050-006",
        "name": "DN150",
        "unit": "个",
        "price": 528.22,
        "sourceRow": 334,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰静音止回阀。"
      }
    ]
  },
  {
    "id": "imported-cost-051",
    "name": "法兰缓闭止回阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-051-001",
        "name": "DN65",
        "unit": "个",
        "price": 622.61,
        "sourceRow": 335,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰缓闭止回阀。"
      },
      {
        "id": "imported-cost-051-002",
        "name": "DN80",
        "unit": "个",
        "price": 717.92,
        "sourceRow": 336,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰缓闭止回阀。"
      },
      {
        "id": "imported-cost-051-003",
        "name": "DN100",
        "unit": "个",
        "price": 809.74,
        "sourceRow": 337,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰缓闭止回阀。"
      },
      {
        "id": "imported-cost-051-004",
        "name": "DN125",
        "unit": "个",
        "price": 945.08,
        "sourceRow": 338,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰缓闭止回阀。"
      },
      {
        "id": "imported-cost-051-005",
        "name": "DN150",
        "unit": "个",
        "price": 1033.68,
        "sourceRow": 339,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰缓闭止回阀。"
      }
    ]
  },
  {
    "id": "imported-cost-052",
    "name": "比例式减压阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-052-001",
        "name": "DN100",
        "unit": "个",
        "price": 1108.76,
        "sourceRow": 340,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：比例式减压阀。"
      },
      {
        "id": "imported-cost-052-002",
        "name": "DN150",
        "unit": "个",
        "price": 1623.53,
        "sourceRow": 341,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：比例式减压阀。"
      }
    ]
  },
  {
    "id": "imported-cost-053",
    "name": "泄压持压阀/安全阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-053-001",
        "name": "DN65",
        "unit": "个",
        "price": 853.82,
        "sourceRow": 342,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：泄压持压阀/安全阀。"
      },
      {
        "id": "imported-cost-053-002",
        "name": "DN80",
        "unit": "个",
        "price": 1006.85,
        "sourceRow": 343,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：泄压持压阀/安全阀。"
      },
      {
        "id": "imported-cost-053-003",
        "name": "DN100",
        "unit": "个",
        "price": 1256.86,
        "sourceRow": 344,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：泄压持压阀/安全阀。"
      },
      {
        "id": "imported-cost-053-004",
        "name": "DN150",
        "unit": "个",
        "price": 1814.31,
        "sourceRow": 345,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：泄压持压阀/安全阀。"
      }
    ]
  },
  {
    "id": "imported-cost-054",
    "name": "法兰Y型过滤器",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-054-001",
        "name": "DN65",
        "unit": "个",
        "price": 212.65,
        "sourceRow": 346,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰Y型过滤器。"
      },
      {
        "id": "imported-cost-054-002",
        "name": "DN80",
        "unit": "个",
        "price": 266.82,
        "sourceRow": 347,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰Y型过滤器。"
      },
      {
        "id": "imported-cost-054-003",
        "name": "DN100",
        "unit": "个",
        "price": 344.83,
        "sourceRow": 348,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰Y型过滤器。"
      },
      {
        "id": "imported-cost-054-004",
        "name": "DN150",
        "unit": "个",
        "price": 593.56,
        "sourceRow": 349,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰Y型过滤器。"
      },
      {
        "id": "imported-cost-054-005",
        "name": "DN200",
        "unit": "个",
        "price": 1005.8,
        "sourceRow": 350,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰Y型过滤器。"
      },
      {
        "id": "imported-cost-054-006",
        "name": "DN250",
        "unit": "个",
        "price": 1659.32,
        "sourceRow": 351,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰Y型过滤器。"
      },
      {
        "id": "imported-cost-054-007",
        "name": "DN300",
        "unit": "个",
        "price": 2240.19,
        "sourceRow": 352,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：法兰Y型过滤器。"
      }
    ]
  },
  {
    "id": "imported-cost-055",
    "name": "水锤消除器",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-055-001",
        "name": "DN100",
        "unit": "个",
        "price": 1336.5,
        "sourceRow": 353,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水锤消除器。"
      },
      {
        "id": "imported-cost-055-002",
        "name": "DN150",
        "unit": "个",
        "price": 1608.63,
        "sourceRow": 354,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水锤消除器。"
      }
    ]
  },
  {
    "id": "imported-cost-056",
    "name": "流量计",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-056-001",
        "name": "DN100",
        "unit": "个",
        "price": 737.69,
        "sourceRow": 355,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：流量计。"
      },
      {
        "id": "imported-cost-056-002",
        "name": "DN150",
        "unit": "个",
        "price": 931.35,
        "sourceRow": 356,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：流量计。"
      }
    ]
  },
  {
    "id": "imported-cost-057",
    "name": "压力开关",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-057-001",
        "name": "DN100",
        "unit": "个",
        "price": 204.51,
        "sourceRow": 357,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：压力开关。"
      },
      {
        "id": "imported-cost-057-002",
        "name": "DN150",
        "unit": "个",
        "price": 215.59,
        "sourceRow": 358,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：压力开关。"
      }
    ]
  },
  {
    "id": "imported-cost-058",
    "name": "电动遥控浮球阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-058-001",
        "name": "DN100",
        "unit": "个",
        "price": 2367.56,
        "sourceRow": 359,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：电动遥控浮球阀。"
      },
      {
        "id": "imported-cost-058-002",
        "name": "DN150",
        "unit": "个",
        "price": 4226.33,
        "sourceRow": 360,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：电动遥控浮球阀。"
      }
    ]
  },
  {
    "id": "imported-cost-059",
    "name": "消火栓镀锌钢管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-059-001",
        "name": "DN80 (螺纹或沟槽连接)",
        "unit": "m",
        "price": 105.38,
        "sourceRow": 361,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓镀锌钢管。"
      },
      {
        "id": "imported-cost-059-002",
        "name": "DN100 (沟槽式连接)",
        "unit": "m",
        "price": 108.3,
        "sourceRow": 362,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓镀锌钢管。"
      },
      {
        "id": "imported-cost-059-003",
        "name": "DN125 (沟槽式连接)",
        "unit": "m",
        "price": 135.66,
        "sourceRow": 363,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓镀锌钢管。"
      },
      {
        "id": "imported-cost-059-004",
        "name": "DN150 (沟槽式连接)",
        "unit": "m",
        "price": 159.06,
        "sourceRow": 364,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓镀锌钢管。"
      },
      {
        "id": "imported-cost-059-005",
        "name": "DN200 (沟槽式连接)",
        "unit": "m",
        "price": 229.76,
        "sourceRow": 365,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓镀锌钢管。"
      }
    ]
  },
  {
    "id": "imported-cost-060",
    "name": "加厚消火栓镀锌钢管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-060-001",
        "name": "DN65 (螺纹或沟槽连接)",
        "unit": "m",
        "price": 102.7,
        "sourceRow": 366,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：加厚消火栓镀锌钢管。"
      },
      {
        "id": "imported-cost-060-002",
        "name": "DN80 (螺纹或沟槽连接)",
        "unit": "m",
        "price": 117.76,
        "sourceRow": 367,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：加厚消火栓镀锌钢管。"
      },
      {
        "id": "imported-cost-060-003",
        "name": "DN100 (沟槽式连接)",
        "unit": "m",
        "price": 120.27,
        "sourceRow": 368,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：加厚消火栓镀锌钢管。"
      },
      {
        "id": "imported-cost-060-004",
        "name": "DN125 (沟槽式连接)",
        "unit": "m",
        "price": 152.31,
        "sourceRow": 369,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：加厚消火栓镀锌钢管。"
      },
      {
        "id": "imported-cost-060-005",
        "name": "DN150 (沟槽式连接)",
        "unit": "m",
        "price": 172.66,
        "sourceRow": 370,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：加厚消火栓镀锌钢管。"
      }
    ]
  },
  {
    "id": "imported-cost-061",
    "name": "信号闸阀",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-061-001",
        "name": "DN50(沟槽连接)",
        "unit": "个",
        "price": 321.89,
        "sourceRow": 371,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：信号闸阀。"
      },
      {
        "id": "imported-cost-061-002",
        "name": "DN65(沟槽连接)",
        "unit": "个",
        "price": 312.91,
        "sourceRow": 372,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：信号闸阀。"
      },
      {
        "id": "imported-cost-061-003",
        "name": "DN80(沟槽连接)",
        "unit": "个",
        "price": 365.65,
        "sourceRow": 373,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：信号闸阀。"
      },
      {
        "id": "imported-cost-061-004",
        "name": "DN100(沟槽连接)",
        "unit": "个",
        "price": 430.78,
        "sourceRow": 374,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：信号闸阀。"
      },
      {
        "id": "imported-cost-061-005",
        "name": "DN125(沟槽连接)",
        "unit": "个",
        "price": 634.18,
        "sourceRow": 375,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：信号闸阀。"
      },
      {
        "id": "imported-cost-061-006",
        "name": "DN150(沟槽连接)",
        "unit": "个",
        "price": 741.2,
        "sourceRow": 376,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：信号闸阀。"
      },
      {
        "id": "imported-cost-061-007",
        "name": "DN200(沟槽连接)",
        "unit": "个",
        "price": 1115.36,
        "sourceRow": 377,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：信号闸阀。"
      }
    ]
  },
  {
    "id": "imported-cost-062",
    "name": "减压孔板",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-062-001",
        "name": "DN65(法兰连接)",
        "unit": "个",
        "price": 152.11,
        "sourceRow": 378,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：减压孔板。"
      },
      {
        "id": "imported-cost-062-002",
        "name": "DN80(法兰连接)",
        "unit": "个",
        "price": 190.5,
        "sourceRow": 379,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：减压孔板。"
      },
      {
        "id": "imported-cost-062-003",
        "name": "DN100(法兰连接)",
        "unit": "个",
        "price": 226.06,
        "sourceRow": 380,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：减压孔板。"
      },
      {
        "id": "imported-cost-062-004",
        "name": "DN125(法兰连接)",
        "unit": "个",
        "price": 308.66,
        "sourceRow": 381,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：减压孔板。"
      },
      {
        "id": "imported-cost-062-005",
        "name": "DN150(法兰连接)",
        "unit": "个",
        "price": 339.95,
        "sourceRow": 382,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：减压孔板。"
      },
      {
        "id": "imported-cost-062-006",
        "name": "DN200(法兰连接)",
        "unit": "个",
        "price": 371.41,
        "sourceRow": 383,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：减压孔板。"
      }
    ]
  },
  {
    "id": "imported-cost-063",
    "name": "水流指示器",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-063-001",
        "name": "DN65（法兰连接）",
        "unit": "个",
        "price": 291.37,
        "sourceRow": 384,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水流指示器。"
      },
      {
        "id": "imported-cost-063-002",
        "name": "DN80（法兰连接）",
        "unit": "个",
        "price": 349.35,
        "sourceRow": 385,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水流指示器。"
      },
      {
        "id": "imported-cost-063-003",
        "name": "DN100（法兰连接）",
        "unit": "个",
        "price": 423.33,
        "sourceRow": 386,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水流指示器。"
      },
      {
        "id": "imported-cost-063-004",
        "name": "DN125（法兰连接）",
        "unit": "个",
        "price": 541.19,
        "sourceRow": 387,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水流指示器。"
      },
      {
        "id": "imported-cost-063-005",
        "name": "DN150（法兰连接）",
        "unit": "个",
        "price": 559.44,
        "sourceRow": 388,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水流指示器。"
      },
      {
        "id": "imported-cost-063-006",
        "name": "DN200（法兰连接）",
        "unit": "个",
        "price": 755.7,
        "sourceRow": 389,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水流指示器。"
      }
    ]
  },
  {
    "id": "imported-cost-064",
    "name": "湿式报警装置",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-064-001",
        "name": "DN100(已包含压力开关、延迟器、水力警铃等)",
        "unit": "组",
        "price": 2873.24,
        "sourceRow": 390,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：湿式报警装置。"
      },
      {
        "id": "imported-cost-064-002",
        "name": "DN125(已包含压力开关、延迟器、水力警铃等)",
        "unit": "组",
        "price": 3343.34,
        "sourceRow": 391,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：湿式报警装置。"
      },
      {
        "id": "imported-cost-064-003",
        "name": "DN150(已包含压力开关、延迟器、水力警铃等)",
        "unit": "组",
        "price": 3449.46,
        "sourceRow": 392,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：湿式报警装置。"
      }
    ]
  },
  {
    "id": "imported-cost-065",
    "name": "预作用报警阀组",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-065-001",
        "name": "DN100（已包含压力开关、水力警铃等)",
        "unit": "组",
        "price": 4820.07,
        "sourceRow": 393,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：预作用报警阀组。"
      },
      {
        "id": "imported-cost-065-002",
        "name": "DN125（已包含压力开关、水力警铃等)",
        "unit": "组",
        "price": 5725.78,
        "sourceRow": 394,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：预作用报警阀组。"
      },
      {
        "id": "imported-cost-065-003",
        "name": "DN150（已包含压力开关、水力警铃等)",
        "unit": "组",
        "price": 5946.1,
        "sourceRow": 395,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：预作用报警阀组。"
      }
    ]
  },
  {
    "id": "imported-cost-066",
    "name": "流量开关",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-066-001",
        "name": "DN100",
        "unit": "个",
        "price": 615.45,
        "sourceRow": 396,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：流量开关。"
      },
      {
        "id": "imported-cost-066-002",
        "name": "DN150",
        "unit": "个",
        "price": 775.68,
        "sourceRow": 397,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：流量开关。"
      },
      {
        "id": "imported-cost-066-003",
        "name": "DN200",
        "unit": "个",
        "price": 886.86,
        "sourceRow": 398,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：流量开关。"
      }
    ]
  },
  {
    "id": "imported-cost-067",
    "name": "消火栓组合箱",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-067-001",
        "name": "包含1套消防箱1800x700,1个25米卷盘,1个卷盘板,1个￠65消火栓,1条25米水带含接扣,1支水枪,阀门和各种附件",
        "unit": "套",
        "price": 973.83,
        "sourceRow": 399,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓组合箱。"
      },
      {
        "id": "imported-cost-067-002",
        "name": "包含1套消防箱1800x700,1个25米卷盘,1个卷盘板,1个￠65减稳压消火栓,1条25米水带含接扣,1支水枪,阀门和各种附件",
        "unit": "套",
        "price": 1009.25,
        "sourceRow": 400,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓组合箱。"
      }
    ]
  },
  {
    "id": "imported-cost-068",
    "name": "消火栓单栓箱",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-068-001",
        "name": "包含1套消防箱950x650,1个25米卷盘,1个卷盘板,1个￠65消火栓,1条25米水带含接扣,1支水枪,阀门和各种附件",
        "unit": "套",
        "price": 711.04,
        "sourceRow": 401,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓单栓箱。"
      },
      {
        "id": "imported-cost-068-002",
        "name": "包含1套消防箱950x650,1个25米卷盘,1个卷盘板,1个￠65减稳压消火栓,1条25米水带含接扣,1支水枪,阀门和各种附件",
        "unit": "套",
        "price": 744.85,
        "sourceRow": 402,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓单栓箱。"
      },
      {
        "id": "imported-cost-068-003",
        "name": "包含1套消防箱800x650,1个25米卷盘,1个卷盘板,1个￠65消火栓,1条25米水带含接扣,1支水枪,阀门和各种附件",
        "unit": "套",
        "price": 673.54,
        "sourceRow": 403,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓单栓箱。"
      },
      {
        "id": "imported-cost-068-004",
        "name": "包含1套消防箱800x650,1个25米卷盘,1个卷盘板,1个￠65减稳压消火栓,1条25米水带含接扣,1支水枪,阀门和各种附件",
        "unit": "套",
        "price": 708.11,
        "sourceRow": 404,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓单栓箱。"
      },
      {
        "id": "imported-cost-068-005",
        "name": "包含1套消防箱1000*700,1个25米卷盘,1个卷盘板,1个￠65消火栓,1条25米水带含接扣,1支水枪,阀门和各种附件",
        "unit": "套",
        "price": 754.84,
        "sourceRow": 405,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓单栓箱。"
      },
      {
        "id": "imported-cost-068-006",
        "name": "包含1套消防箱1000*700,1个25米卷盘,1个卷盘板,1个￠65减稳压消火栓,1条25米水带含接扣,1支水枪,阀门和各种附件",
        "unit": "套",
        "price": 789.4,
        "sourceRow": 406,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓单栓箱。"
      }
    ]
  },
  {
    "id": "imported-cost-069",
    "name": "消火栓双栓箱",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-069-001",
        "name": "包含1套消防箱1200x800,1个25米卷盘,1个卷盘板,2个￠65消火栓,2条25米水带含接扣,2支水枪,阀门和各种附件",
        "unit": "套",
        "price": 1107.27,
        "sourceRow": 407,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓双栓箱。"
      },
      {
        "id": "imported-cost-069-002",
        "name": "包含1套消防箱1200x800,1个25米卷盘,1个卷盘板,2个￠65减稳压消火栓,2条25米水带含接扣,2支水枪,阀门和各种附件",
        "unit": "套",
        "price": 1178.13,
        "sourceRow": 408,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：消火栓双栓箱。"
      }
    ]
  },
  {
    "id": "imported-cost-070",
    "name": "灭火器面具箱安装",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-070-001",
        "name": "2KG×2个+2装",
        "unit": "套",
        "price": 118.12,
        "sourceRow": 409,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：灭火器面具箱安装。"
      },
      {
        "id": "imported-cost-070-002",
        "name": "3KG×2个+2装",
        "unit": "套",
        "price": 123.08,
        "sourceRow": 410,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：灭火器面具箱安装。"
      },
      {
        "id": "imported-cost-070-003",
        "name": "4KG×2个+2装",
        "unit": "套",
        "price": 128.03,
        "sourceRow": 411,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：灭火器面具箱安装。"
      }
    ]
  },
  {
    "id": "imported-cost-071",
    "name": "无管网七氟丙烷灭火装置",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-071-001",
        "name": "GQQ-70L (柜式，不含药剂)",
        "unit": "套",
        "price": 5877.04,
        "sourceRow": 412,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无管网七氟丙烷灭火装置。"
      },
      {
        "id": "imported-cost-071-002",
        "name": "GQQ-100L (柜式，不含药剂)",
        "unit": "套",
        "price": 6677.11,
        "sourceRow": 413,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无管网七氟丙烷灭火装置。"
      },
      {
        "id": "imported-cost-071-003",
        "name": "GQQ-120L (柜式，不含药剂)",
        "unit": "套",
        "price": 7955.37,
        "sourceRow": 414,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无管网七氟丙烷灭火装置。"
      },
      {
        "id": "imported-cost-071-004",
        "name": "GQQ-150L (柜式，不含药剂)",
        "unit": "套",
        "price": 9286.93,
        "sourceRow": 415,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：无管网七氟丙烷灭火装置。"
      }
    ]
  },
  {
    "id": "imported-cost-072",
    "name": "超细干粉灭火装置",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-072-001",
        "name": "FZXA-10.0",
        "unit": "套",
        "price": 186.62,
        "sourceRow": 416,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：超细干粉灭火装置。"
      },
      {
        "id": "imported-cost-072-002",
        "name": "FZXA-15.0",
        "unit": "套",
        "price": 191.18,
        "sourceRow": 417,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：超细干粉灭火装置。"
      },
      {
        "id": "imported-cost-072-003",
        "name": "FZXA-4.0",
        "unit": "套",
        "price": 184.98,
        "sourceRow": 418,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：超细干粉灭火装置。"
      }
    ]
  },
  {
    "id": "imported-cost-073",
    "name": "内外热镀锌钢管",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-073-001",
        "name": "DN100",
        "unit": "m",
        "price": 118.96,
        "sourceRow": 419,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：内外热镀锌钢管。"
      },
      {
        "id": "imported-cost-073-002",
        "name": "DN150（沟槽连接）",
        "unit": "m",
        "price": 184.6,
        "sourceRow": 420,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：内外热镀锌钢管。"
      }
    ]
  },
  {
    "id": "imported-cost-074",
    "name": "水流指示器法兰连接",
    "description": "来自《机电类成本项目菜单汇总.xlsx》的机电成本菜单项",
    "specifications": [
      {
        "id": "imported-cost-074-001",
        "name": "DN150",
        "unit": "个",
        "price": 412.9,
        "sourceRow": 421,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水流指示器法兰连接。"
      },
      {
        "id": "imported-cost-074-002",
        "name": "DN100",
        "unit": "个",
        "price": 305.91,
        "sourceRow": 422,
        "remark": "来源：机电类成本项目菜单汇总.xlsx；一级菜单：水流指示器法兰连接。"
      }
    ]
  }
];

  const api = {
    IMPORTED_COST_MENU_CATEGORIES,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.MepImportedCostMenu = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
