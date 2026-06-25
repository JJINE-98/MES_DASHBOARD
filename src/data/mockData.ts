import type {
  CustomerShipment,
  DailyProduction,
  DefectType,
  ItemProduction,
  LineOperation,
} from '../types/mes'

export const itemData: ItemProduction[] = [
  {
    code: '84736-T60C0',
    name: '도어트림 브라켓',
    orderQty: 1380,
    planQty: 1320,
    prodQty: 920,
    shipPlanQty: 980,
    shipQty: 870,
    defectQty: 24,
    previousDefectRate: 1.8,
    delayed: false,
  },
  {
    code: '84741-T60C0',
    name: '센터패널 브라켓',
    orderQty: 1120,
    planQty: 1080,
    prodQty: 1040,
    shipPlanQty: 940,
    shipQty: 930,
    defectQty: 15,
    previousDefectRate: 1.2,
    delayed: false,
  },
  {
    code: '85210-P10A0',
    name: '콘솔 브라켓',
    orderQty: 960,
    planQty: 920,
    prodQty: 850,
    shipPlanQty: 760,
    shipQty: 740,
    defectQty: 58,
    previousDefectRate: 3.1,
    delayed: false,
  },
  {
    code: '86320-A20B0',
    name: '사이드 커버',
    orderQty: 840,
    planQty: 800,
    prodQty: 735,
    shipPlanQty: 710,
    shipQty: 510,
    defectQty: 18,
    previousDefectRate: 2.0,
    delayed: true,
  },
  {
    code: '87310-H50A0',
    name: '도어 가니쉬',
    orderQty: 760,
    planQty: 720,
    prodQty: 695,
    shipPlanQty: 640,
    shipQty: 625,
    defectQty: 10,
    previousDefectRate: 1.5,
    delayed: false,
  },
]

export const dailyProduction: DailyProduction[] = [
  { date: '06.18', plan: 4380, actual: 4210 },
  { date: '06.19', plan: 4520, actual: 4430 },
  { date: '06.20', plan: 4470, actual: 4390 },
  { date: '06.21', plan: 4680, actual: 4510 },
  { date: '06.22', plan: 4720, actual: 4460 },
  { date: '06.23', plan: 4780, actual: 4290 },
  { date: '06.24', plan: 4840, actual: 4240 },
]

export const customerShipments: CustomerShipment[] = [
  { code: 'C001', name: '현대자동차', plan: 980, shipped: 920 },
  { code: 'C002', name: '기아', plan: 820, shipped: 790 },
  { code: 'C003', name: '현대모비스', plan: 760, shipped: 730 },
  { code: 'C004', name: 'HL만도', plan: 690, shipped: 510 },
  { code: 'C005', name: '서연이화', plan: 780, shipped: 725 },
]

export const lineOperations: LineOperation[] = [
  { name: '프레스 1라인', operationRate: 91.2, target: 90, status: '정상' },
  { name: '프레스 2라인', operationRate: 68.4, target: 90, status: '위험' },
  { name: '용접 1라인', operationRate: 86.7, target: 90, status: '주의' },
  { name: '조립 1라인', operationRate: 88.5, target: 90, status: '주의' },
]

export const defectTypes: DefectType[] = [
  { name: '찍힘', value: 22, color: '#f59e0b' },
  { name: '스크래치', value: 27, color: '#f97316' },
  { name: '변형', value: 18, color: '#8b5cf6' },
  { name: '용접불량', value: 35, color: '#ef4444' },
  { name: '치수불량', value: 23, color: '#38bdf8' },
]

export const previousDay = {
  orderQty: 4860,
  planQty: 4700,
  prodQty: 4380,
  shipQty: 3700,
  defectQty: 92,
  operationRate: 87.6,
  deliveryRate: 96.3,
}
