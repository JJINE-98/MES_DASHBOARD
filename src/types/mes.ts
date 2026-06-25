export type RiskLevel = '정상' | '주의' | '위험'
export type Trend = 'up' | 'down' | 'flat'

export interface ItemProduction {
  code: string
  name: string
  orderQty: number
  planQty: number
  prodQty: number
  shipPlanQty: number
  shipQty: number
  defectQty: number
  previousDefectRate: number
  delayed: boolean
}

export interface DailyProduction {
  date: string
  plan: number
  actual: number
}

export interface CustomerShipment {
  code: string
  name: string
  plan: number
  shipped: number
}

export interface LineOperation {
  name: string
  operationRate: number
  target: number
  status: RiskLevel
}

export interface DefectType {
  name: string
  value: number
  color: string
}

export interface KpiData {
  label: string
  value: string
  change: number
  status: RiskLevel
  accent: string
}

export interface DelayedItem {
  code: string
  name: string
  shortage: number
  achievementRate: number
}

export interface DefectItem {
  code: string
  name: string
  defectQty: number
  defectRate: number
}

export interface DashboardSummary {
  totalOrderQty: number
  totalPlanQty: number
  totalProdQty: number
  totalShipQty: number
  totalDefectQty: number
  productionAchievementRate: number
  shipmentAchievementRate: number
  defectRate: number
  topDelayedItems: DelayedItem[]
  topDefectItems: DefectItem[]
  topDefectTypes: Array<{ name: string; value: number }>
  lineOperationRates: Array<{ name: string; operationRate: number; status: RiskLevel }>
  customerShipmentStatus: Array<{ code: string; name: string; plan: number; shipped: number; rate: number }>
}

export interface AiBriefing {
  riskLevel: RiskLevel
  summary: string[]
  issues: string[]
  actions: string[]
  generatedAt?: string
  source?: 'AI' | '로컬 분석'
}

export interface AiAnswer {
  answer: string
  actions?: string[]
  source?: 'AI' | '로컬 분석'
}
