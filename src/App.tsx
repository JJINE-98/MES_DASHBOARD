import DashboardCharts from './components/DashboardCharts'
import AiReportPanel from './components/AiReportPanel'
import Header from './components/Header'
import KpiCard from './components/KpiCard'
import { previousDay } from './data/mockData'
import { summaryData } from './utils/dashboardSummary'
import type { KpiData, RiskLevel } from './types/mes'

const changeRate = (current: number, previous: number) => ((current - previous) / previous) * 100
const rateStatus = (rate: number, warning = 95, danger = 80): RiskLevel =>
  rate >= warning ? '정상' : rate >= danger ? '주의' : '위험'

const averageOperation = 83.7
const deliveryRate = 89.4

const kpis: KpiData[] = [
  { label: '금일 수주수량', value: `${summaryData.totalOrderQty.toLocaleString()} EA`, change: changeRate(summaryData.totalOrderQty, previousDay.orderQty), status: '정상', accent: '#38bdf8' },
  { label: '금일 생산계획', value: `${summaryData.totalPlanQty.toLocaleString()} EA`, change: changeRate(summaryData.totalPlanQty, previousDay.planQty), status: '정상', accent: '#818cf8' },
  { label: '금일 생산실적', value: `${summaryData.totalProdQty.toLocaleString()} EA`, change: changeRate(summaryData.totalProdQty, previousDay.prodQty), status: '주의', accent: '#f59e0b' },
  { label: '금일 출하수량', value: `${summaryData.totalShipQty.toLocaleString()} EA`, change: changeRate(summaryData.totalShipQty, previousDay.shipQty), status: '주의', accent: '#20c997' },
  { label: '금일 불량수량', value: `${summaryData.totalDefectQty.toLocaleString()} EA`, change: changeRate(summaryData.totalDefectQty, previousDay.defectQty), status: '위험', accent: '#ef4444' },
  { label: '생산달성률', value: `${summaryData.productionAchievementRate}%`, change: -5.4, status: rateStatus(summaryData.productionAchievementRate), accent: '#f59e0b' },
  { label: '출하달성률', value: `${summaryData.shipmentAchievementRate}%`, change: -4.2, status: rateStatus(summaryData.shipmentAchievementRate), accent: '#fb923c' },
  { label: '불량률', value: `${summaryData.defectRate}%`, change: 1.0, status: summaryData.defectRate > 2 ? '주의' : '정상', accent: '#ef4444' },
  { label: '평균 가동률', value: `${averageOperation}%`, change: changeRate(averageOperation, previousDay.operationRate), status: rateStatus(averageOperation, 90, 75), accent: '#a78bfa' },
  { label: '납기준수율', value: `${deliveryRate}%`, change: changeRate(deliveryRate, previousDay.deliveryRate), status: rateStatus(deliveryRate), accent: '#f59e0b' },
]

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="dashboard-layout">
        <div className="main-dashboard">
          <section className="kpi-section">
            <div className="section-label">
              <div><span className="live-indicator" /> LIVE PRODUCTION KPI</div>
              <p>금일 누적 기준 · 5분 주기 자동 집계</p>
            </div>
            <div className="kpi-grid">
              {kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
            </div>
          </section>
          <DashboardCharts />
        </div>
        <AiReportPanel summaryData={summaryData} />
      </main>
    </div>
  )
}
