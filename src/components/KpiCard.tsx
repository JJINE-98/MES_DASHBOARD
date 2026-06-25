import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import type { KpiData } from '../types/mes'

export default function KpiCard({ label, value, change, status, accent }: KpiData) {
  const TrendIcon = change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus
  const isNegativeMetric = label.includes('불량')
  const isGoodTrend = isNegativeMetric ? change <= 0 : change >= 0

  return (
    <article className="kpi-card" style={{ '--accent': accent } as React.CSSProperties}>
      <div className="kpi-top">
        <span>{label}</span>
        <span className={`status-badge status-${status}`}>{status}</span>
      </div>
      <strong className="kpi-value">{value}</strong>
      <div className={`kpi-change ${isGoodTrend ? 'positive' : 'negative'}`}>
        <TrendIcon size={14} />
        <span>전일 대비 {Math.abs(change).toFixed(1)}%</span>
      </div>
    </article>
  )
}
