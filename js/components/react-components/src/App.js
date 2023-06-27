import "./App.css";
import { useRef, useEffect, useState, useCallback } from "react";

const tableElements = [
  {
    id: 44,
    state: 0,
    status: 0,
    name: "m2",
    isTemplate: false,
    description: "",
    сreateUId: 0,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 0,
    createDate: "2023-05-23 13:43:07",
    verificateDate: "",
    activateDate: "2023-05-23 13:46:06",
    deactivateDate: "2023-06-08 14:45:45",
    workTimeSec: 1396734,
    workTimeRightPrc: 100,
    emergencyCount: 1,
    warningCount: 0,
    firstEmergencyDate: "2040-09-15 10:00:00",
    firstWarningDate: "",
    lastEmergencyDate: "2040-09-15 10:00:00",
    lastWarningDate: "",
    inputSignalsId: [925, 924, 927, 926, 929, 928, 931, 930, 1467],
    outputSignalsId: [
      22892, 22893, 22894, 22895, 22896, 22897, 22898, 22899, 22900, 22901,
      22902, 22903, 22904, 22905, 22906, 22907, 22908, 22909, 22910, 22911,
      22912, 22913, 22914, 22915, 22916, 22917, 22918, 22919, 22920, 22921,
      22922, 22923, 22924, 22925, 22926, 22927, 22928,
    ],
    casesId: [120],
    projectId: 4,
    path: "Medvedev/p1",
    omrId: 22928,
  },
  {
    id: 15,
    state: 0,
    status: 0,
    name: "m1",
    isTemplate: false,
    description: "",
    сreateUId: 0,
    verifivateUId: 0,
    activateUId: 1,
    deactivateUId: 1,
    createDate: "2023-05-04 09:06:45",
    verificateDate: "",
    activateDate: "2023-06-15 15:19:47",
    deactivateDate: "2023-06-15 15:20:49",
    workTimeSec: 1017432,
    workTimeRightPrc: 100,
    emergencyCount: 1,
    warningCount: 0,
    firstEmergencyDate: "2050-01-14 14:00:00",
    firstWarningDate: "",
    lastEmergencyDate: "2050-01-14 14:00:00",
    lastWarningDate: "",
    inputSignalsId: [925, 924],
    outputSignalsId: [
      51968, 51969, 51970, 51971, 51972, 51973, 51974, 51975, 51976,
    ],
    casesId: null,
    projectId: 4,
    path: "Medvedev/p1",
    omrId: 51976,
  },
  {
    id: 16,
    state: 0,
    status: 0,
    name: "m1",
    isTemplate: false,
    description: "",
    сreateUId: 0,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 0,
    createDate: "2023-05-04 09:12:49",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: null,
    outputSignalsId: null,
    casesId: null,
    projectId: 5,
    path: "Ponomarev",
    omrId: 0,
  },
  {
    id: 85,
    state: 0,
    status: 0,
    name: "m2",
    isTemplate: false,
    description: "",
    сreateUId: 7,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 0,
    createDate: "2023-06-22 14:04:51",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: null,
    outputSignalsId: null,
    casesId: null,
    projectId: 5,
    path: "Ponomarev",
    omrId: 0,
  },
  {
    id: 87,
    state: 0,
    status: 0,
    name: "m10",
    isTemplate: false,
    description: "",
    сreateUId: 7,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 0,
    createDate: "2023-06-22 14:13:23",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: null,
    outputSignalsId: null,
    casesId: null,
    projectId: 5,
    path: "Ponomarev",
    omrId: 0,
  },
  {
    id: 25,
    state: 0,
    status: 0,
    name: "m1",
    isTemplate: false,
    description: "",
    сreateUId: 0,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 0,
    createDate: "2023-05-18 10:33:43",
    verificateDate: "",
    activateDate: "2023-05-18 10:58:55",
    deactivateDate: "2023-05-18 17:10:18",
    workTimeSec: 33056,
    workTimeRightPrc: 100,
    emergencyCount: 1,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "2039-04-24 05:00:00",
    lastWarningDate: "",
    inputSignalsId: [924, 925, 926],
    outputSignalsId: [21536],
    casesId: null,
    projectId: 13,
    path: "Medvedev/p3",
    omrId: 21536,
  },
  {
    id: 77,
    state: 0,
    status: 0,
    name: "Система отсоса пара из уплотнений",
    isTemplate: false,
    description: "",
    сreateUId: 3,
    verifivateUId: 0,
    activateUId: 3,
    deactivateUId: 0,
    createDate: "2023-06-07 10:14:59",
    verificateDate: "",
    activateDate: "2023-06-22 18:46:33",
    deactivateDate: "",
    workTimeSec: 400226,
    workTimeRightPrc: 0,
    emergencyCount: 221,
    warningCount: 492,
    firstEmergencyDate: "2044-11-20 11:00:00",
    firstWarningDate: "2044-11-20 08:00:00",
    lastEmergencyDate: "2052-02-23 05:00:00",
    lastWarningDate: "2052-03-05 02:00:00",
    inputSignalsId: [925, 924, 927, 926, 929, 928, 931, 930, 1156],
    outputSignalsId: [
      50708, 50709, 50710, 50711, 50712, 50713, 50714, 50715, 50716, 50717,
      50718, 50719, 50720, 50721, 50722, 50723, 50724, 50725, 50726, 50727,
      50728, 50729, 50730, 50731, 50732, 50733, 50734, 50735, 50736, 50737,
      50738, 50739, 50740, 50741, 50742, 50743, 50786,
    ],
    casesId: [182],
    projectId: 28,
    path: "Турбина Демо",
    omrId: 50786,
  },
  {
    id: 75,
    state: 0,
    status: 0,
    name: "Многоступенчатая система смазки паровой турбины",
    isTemplate: false,
    description: "",
    сreateUId: 3,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 3,
    createDate: "2023-06-07 10:07:07",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "2023-06-23 09:51:00",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: [
      948, 1456, 1156, 945, 944, 947, 946, 933, 932, 935, 934, 941, 940, 943,
      942, 937, 936, 939, 938, 949,
    ],
    outputSignalsId: [
      62187, 62188, 62189, 62190, 62191, 62192, 62193, 62194, 62195, 62196,
      62197, 62198, 62199, 62200, 62201, 62202, 62203, 62204, 62205, 62206,
      62207, 62208, 62209, 62210, 62211, 62212, 62213, 62214, 62215, 62216,
      62217, 62218, 62219, 62220, 62221, 62222, 62223, 62224, 62225, 62226,
      62227, 62228, 62229, 62230, 62231, 62232, 62233, 62234, 62235, 62236,
      62237, 62238, 62239, 62240, 62241, 62242, 62243, 62244, 62245, 62246,
      62247, 62248, 62249, 62250, 62251, 62252, 62253, 62254, 62255, 62256,
      62257, 62258, 62259, 62260, 62261, 62262, 62263, 62264, 62265, 62266,
      62267,
    ],
    casesId: null,
    projectId: 28,
    path: "Турбина Демо",
    omrId: 62267,
  },
  {
    id: 78,
    state: 0,
    status: 0,
    name: "123",
    isTemplate: false,
    description: "",
    сreateUId: 3,
    verifivateUId: 3,
    activateUId: 3,
    deactivateUId: 0,
    createDate: "2023-06-07 13:14:32",
    verificateDate: "2023-06-22 17:59:27",
    activateDate: "2023-06-22 17:59:28",
    deactivateDate: "",
    workTimeSec: 403051,
    workTimeRightPrc: 0,
    emergencyCount: 5,
    warningCount: 6,
    firstEmergencyDate: "2052-01-31 20:00:00",
    firstWarningDate: "2052-01-31 22:00:00",
    lastEmergencyDate: "2052-03-04 08:00:00",
    lastWarningDate: "2052-03-04 05:00:00",
    inputSignalsId: [762, 761, 764, 763, 765],
    outputSignalsId: [
      51349, 51350, 51351, 51352, 51353, 51354, 51355, 51356, 51357, 51358,
      51359, 51360, 51361, 51362, 51363, 51364, 51365, 51366, 51367, 51368,
      53991,
    ],
    casesId: null,
    projectId: 28,
    path: "Турбина Демо",
    omrId: 53991,
  },
  {
    id: 76,
    state: 0,
    status: 0,
    name: "Система уплощтнения сальника паровой турбины",
    isTemplate: false,
    description: "",
    сreateUId: 3,
    verifivateUId: 0,
    activateUId: 3,
    deactivateUId: 0,
    createDate: "2023-06-07 10:12:25",
    verificateDate: "",
    activateDate: "2023-06-22 18:46:14",
    deactivateDate: "",
    workTimeSec: 400245,
    workTimeRightPrc: 0,
    emergencyCount: 23,
    warningCount: 54,
    firstEmergencyDate: "2044-12-13 04:00:00",
    firstWarningDate: "2044-12-24 19:00:00",
    lastEmergencyDate: "2049-12-22 09:00:00",
    lastWarningDate: "2049-12-21 17:00:00",
    inputSignalsId: [762, 761, 764, 763, 765],
    outputSignalsId: [
      50652, 50653, 50654, 50655, 50656, 50657, 50658, 50659, 50660, 50661,
      50662, 50663, 50664, 50665, 50666, 50667, 50668, 50669, 50670, 50671,
      50744,
    ],
    casesId: null,
    projectId: 28,
    path: "Турбина Демо",
    omrId: 50744,
  },
  {
    id: 89,
    state: 0,
    status: 0,
    name: "var",
    isTemplate: false,
    description: "",
    сreateUId: 3,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 0,
    createDate: "2023-06-23 09:36:42",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: null,
    outputSignalsId: null,
    casesId: null,
    projectId: 28,
    path: "Турбина Демо",
    omrId: 0,
  },
  {
    id: 79,
    state: 0,
    status: 0,
    name: "AEtest",
    isTemplate: false,
    description: "",
    сreateUId: 19,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 0,
    createDate: "2023-06-08 13:43:14",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: null,
    outputSignalsId: null,
    casesId: null,
    projectId: 29,
    path: "AEtest",
    omrId: 0,
  },
  {
    id: 81,
    state: 0,
    status: 0,
    name: "test_model",
    isTemplate: false,
    description: "",
    сreateUId: 4,
    verifivateUId: 0,
    activateUId: 4,
    deactivateUId: 4,
    createDate: "2023-06-21 08:50:59",
    verificateDate: "",
    activateDate: "2023-06-21 09:36:38",
    deactivateDate: "2023-06-21 09:13:09",
    workTimeSec: 519621,
    workTimeRightPrc: 81,
    emergencyCount: 4,
    warningCount: 12,
    firstEmergencyDate: "2051-08-23 16:00:00",
    firstWarningDate: "2051-08-16 17:00:00",
    lastEmergencyDate: "2051-11-03 21:00:00",
    lastWarningDate: "2052-03-02 08:00:00",
    inputSignalsId: [
      748, 749, 750, 751, 752, 753, 754, 788, 789, 790, 791, 792, 793, 794, 780,
      781, 782, 783, 784, 785, 786, 787, 772, 773, 774, 775, 776, 777, 778, 779,
      759, 760, 766, 767, 768, 769, 770, 771,
    ],
    outputSignalsId: [
      54378, 54379, 54380, 54381, 54382, 54383, 54384, 54385, 54386, 54387,
      54388, 54389, 54390, 54338, 54339, 54340, 54341, 54342, 54343, 54344,
      54345, 54346, 54347, 54348, 54349, 54350, 54351, 54352, 54353, 54354,
      54355, 54356, 54357, 54358, 54359, 54360, 54361, 54362, 54363, 54364,
      54365, 54366, 54367, 54368, 54369, 54370, 54371, 54372, 54373, 54374,
      54375, 54376, 54377,
    ],
    casesId: null,
    projectId: 32,
    path: "Тестирование/Orlov/test 21.05",
    omrId: 54390,
  },
  {
    id: 82,
    state: 0,
    status: 0,
    name: "test_model2",
    isTemplate: false,
    description: "",
    сreateUId: 4,
    verifivateUId: 0,
    activateUId: 4,
    deactivateUId: 0,
    createDate: "2023-06-21 09:26:48",
    verificateDate: "",
    activateDate: "2023-06-21 09:33:49",
    deactivateDate: "",
    workTimeSec: 519790,
    workTimeRightPrc: 100,
    emergencyCount: 1,
    warningCount: 0,
    firstEmergencyDate: "2051-08-11 14:00:00",
    firstWarningDate: "",
    lastEmergencyDate: "2051-08-11 14:00:00",
    lastWarningDate: "",
    inputSignalsId: [
      788, 789, 790, 791, 792, 793, 794, 781, 782, 783, 784, 785, 786, 787,
    ],
    outputSignalsId: [
      54472, 54473, 54474, 54475, 54476, 54477, 54478, 54479, 54480, 54481,
      54482, 54483, 54484, 54485, 54486, 54487, 54488, 54489, 54490, 54491,
      54492, 54493, 54494, 54495, 54496, 54497, 54498, 54499, 54500, 54501,
      54502, 54503, 54504, 54505, 54506, 54507, 54508, 54509, 54510, 54511,
      54512, 54513, 54514, 54515, 54516, 54517, 54518, 54519, 54520, 54521,
      54522, 54523, 54524, 54525, 54526, 54527, 54528,
    ],
    casesId: null,
    projectId: 32,
    path: "Тестирование/Orlov/test 21.05",
    omrId: 54528,
  },
  {
    id: 83,
    state: 0,
    status: 0,
    name: "система смазки подшипников",
    isTemplate: false,
    description: "",
    сreateUId: 2,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 2,
    createDate: "2023-06-22 12:53:14",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "2023-06-26 09:15:19",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: [
      68830, 68831, 68829, 68834, 68835, 68832, 68833, 68838, 68839, 68836,
      68837, 68842, 68843, 68840, 68841, 68846, 68847, 68844, 68845,
    ],
    outputSignalsId: [
      68342, 68266, 68267, 68268, 68269, 68270, 68271, 68272, 68273, 68274,
      68275, 68276, 68277, 68278, 68279, 68280, 68281, 68282, 68283, 68284,
      68285, 68286, 68287, 68288, 68289, 68290, 68291, 68292, 68293, 68294,
      68295, 68296, 68297, 68298, 68299, 68300, 68301, 68302, 68303, 68304,
      68305, 68306, 68307, 68308, 68309, 68310, 68311, 68312, 68313, 68314,
      68315, 68316, 68317, 68318, 68319, 68320, 68321, 68322, 68323, 68324,
      68325, 68326, 68327, 68328, 68329, 68330, 68331, 68332, 68333, 68334,
      68335, 68336, 68337, 68338, 68339, 68340, 68341,
    ],
    casesId: null,
    projectId: 33,
    path: "Demo",
    omrId: 68342,
  },
  {
    id: 84,
    state: 0,
    status: 0,
    name: "подшипники ",
    isTemplate: false,
    description: "",
    сreateUId: 2,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 2,
    createDate: "2023-06-22 13:21:24",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "2023-06-26 09:15:27",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: [
      68866, 68867, 68864, 68865, 68870, 68871, 68868, 68869, 68874, 68875,
      68872, 68873, 68878, 68879, 68876, 68877, 68850, 68851, 68848, 68849,
      68854, 68855, 68852, 68853, 68858, 68859, 68856, 68857, 68862, 68863,
      68860, 68861, 68882, 68883, 68880, 68881, 68886, 68887, 68884, 68885,
      68888, 68889,
    ],
    outputSignalsId: [
      67913, 67745, 67746, 67747, 67748, 67749, 67750, 67751, 67752, 67753,
      67754, 67755, 67756, 67757, 67758, 67759, 67760, 67761, 67762, 67763,
      67764, 67765, 67766, 67767, 67768, 67769, 67770, 67771, 67772, 67773,
      67774, 67775, 67776, 67777, 67778, 67779, 67780, 67781, 67782, 67783,
      67784, 67785, 67786, 67787, 67788, 67789, 67790, 67791, 67792, 67793,
      67794, 67795, 67796, 67797, 67798, 67799, 67800, 67801, 67802, 67803,
      67804, 67805, 67806, 67807, 67808, 67809, 67810, 67811, 67812, 67813,
      67814, 67815, 67816, 67817, 67818, 67819, 67820, 67821, 67822, 67823,
      67824, 67825, 67826, 67827, 67828, 67829, 67830, 67831, 67832, 67833,
      67834, 67835, 67836, 67837, 67838, 67839, 67840, 67841, 67842, 67843,
      67844, 67845, 67846, 67847, 67848, 67849, 67850, 67851, 67852, 67853,
      67854, 67855, 67856, 67857, 67858, 67859, 67860, 67861, 67862, 67863,
      67864, 67865, 67866, 67867, 67868, 67869, 67870, 67871, 67872, 67873,
      67874, 67875, 67876, 67877, 67878, 67879, 67880, 67881, 67882, 67883,
      67884, 67885, 67886, 67887, 67888, 67889, 67890, 67891, 67892, 67893,
      67894, 67895, 67896, 67897, 67898, 67899, 67900, 67901, 67902, 67903,
      67904, 67905, 67906, 67907, 67908, 67909, 67910, 67911, 67912,
    ],
    casesId: null,
    projectId: 33,
    path: "Demo",
    omrId: 67913,
  },
  {
    id: 88,
    state: 0,
    status: 0,
    name: "rotor vibration",
    isTemplate: false,
    description: "",
    сreateUId: 2,
    verifivateUId: 0,
    activateUId: 0,
    deactivateUId: 0,
    createDate: "2023-06-22 14:34:14",
    verificateDate: "",
    activateDate: "",
    deactivateDate: "",
    workTimeSec: 0,
    workTimeRightPrc: 0,
    emergencyCount: 0,
    warningCount: 0,
    firstEmergencyDate: "",
    firstWarningDate: "",
    lastEmergencyDate: "",
    lastWarningDate: "",
    inputSignalsId: null,
    outputSignalsId: null,
    casesId: null,
    projectId: 33,
    path: "Demo",
    omrId: 0,
  },
];
const tableHeaders = [
  "Название",
  "Дата аварии",
  "Дата тревоги",
  "Дата активации",
];
const rows = tableElements.map((e) => [
  e.name,
  e.firstEmergencyDate,
  e.lastWarningDate,
  e.activateDate,
]);
const createColumns = (headers) => {
  return headers.map((header) => ({
    header,
    resizerRef: useRef(),
    thRef: useRef(),
  }));
};

function App() {
  const tableRef = useRef(null);
  const wrapperRef = useRef(null);
  const columns = createColumns(tableHeaders);
  const [columnWidths, setColumnWidths] = useState(columns.map((c) => 500));
  const [activeIndex, setActiveIndex] = useState(null);
  const [offset, setOffset] = useState(null);
  const [focusIndex, setFocusIndex] = useState(null);
  // const [start, setStart] = useState(0);

  const mouseDown = (index, e) => {
    e.stopPropagation();
    // отключаем возможность выделять текст при изменении размера колонки
    wrapperRef.current.style.userSelect = "none";

    // задаем resize курсор на всей областии таблицы при изменении ширины колонки
    wrapperRef.current.style.cursor = "col-resize";

    const start = columnWidths
      .filter((w, i) => i <= index)
      .reduce((acc, curr) => (acc = acc + curr), 0);

    setOffset(start - e.clientX - wrapperRef.current.scrollLeft);
    console.log(start - e.clientX - wrapperRef.current.scrollLeft);
    console.dir(columns[index]);
    setActiveIndex(index);
  };

  const mouseUp = () => {
    setActiveIndex(null);
    wrapperRef.current.style.userSelect = "";
    wrapperRef.current.style.cursor = "";
  };

  const mouseMove = (e) => {
    const start = columnWidths
      .filter((w, i) => i <= activeIndex)
      .reduce((acc, curr) => (acc = acc + curr), 0);
    // setStart(start - (start - e.clientX));
    setColumnWidths(
      columnWidths.map((w, i) =>
        i === activeIndex
          ? w + e.clientX - start + wrapperRef.current.scrollLeft + offset
          : w
      )
    );
  };

  useEffect(() => {
    // window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      // window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [activeIndex, columns]);

  return (
    <div className="App" ref={wrapperRef} onMouseMove={mouseMove}>
      <table
        ref={tableRef}
        style={{
          width: columnWidths.reduce((acc, curr) => (acc = acc + curr), 0),
        }}
      >
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                ref={column.thRef}
                style={{ minWidth: columnWidths[i] }}
              >
                <div
                  className="resizer"
                  ref={column.resizerRef}
                  onMouseDown={(e) => mouseDown(i, e)}
                />
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="row"
              onClick={() => setFocusIndex(i)}
              style={{ background: focusIndex === i ? "red" : "" }}
            >
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
