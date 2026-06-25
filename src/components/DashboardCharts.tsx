import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AlertTriangle, BarChart3, CircleGauge, PackageCheck, ShieldAlert, TrendingUp } from 'lucide-react'
import { customerShipments, dailyProduction, defectTypes, itemData, lineOperations } from '../data/mockData'

const tooltipStyle = {
  background: '#f8fbff',
  border: '1px solid #8fb3d1',
  borderRadius: 10,
  color: '#10243a',
  fontSize: 12,
  fontWeight: 600,
  boxShadow: '0 12px 28px rgba(2, 12, 27, 0.32)',
  padding: '10px 12px',
}

const tooltipLabelStyle = {
  color: '#0b2942',
  fontWeight: 700,
  marginBottom: 6,
}

const tooltipItemStyle = {
  color: '#16324f',
  fontWeight: 600,
  padding: '2px 0',
}

const tooltipCursor = {
  fill: 'rgba(125, 211, 252, 0.12)',
  stroke: 'rgba(125, 211, 252, 0.35)',
}

const itemChartData = itemData.map((item) => ({
  code: item.code.split('-')[0],
  fullCode: item.code,
  수주: item.orderQty,
  생산: item.prodQty,
  출하: item.shipQty,
}))

const achievementData = itemData.map((item) => ({
  code: item.code.split('-')[0],
  rate: Math.round((item.prodQty / item.planQty) * 1000) / 10,
}))

const operationColor = (rate: number) => (rate < 75 ? '#ef4444' : rate < 90 ? '#f59e0b' : '#20c997')
const achievementColor = (rate: number) => (rate < 80 ? '#ef4444' : rate < 95 ? '#f59e0b' : '#38bdf8')

function ChartCard({
  title,
  subtitle,
  icon,
  className = '',
  children,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`chart-card ${className}`}>
      <div className="section-heading">
        <div className="section-icon">{icon}</div>
        <div><h2>{title}</h2><p>{subtitle}</p></div>
      </div>
      <div className="chart-body">{children}</div>
    </section>
  )
}

export default function DashboardCharts() {
  return (
    <div className="charts-grid">
      <ChartCard
        title="최근 7일 생산 추이"
        subtitle="생산계획 대비 생산실적"
        icon={<TrendingUp size={18} />}
        className="wide-chart"
      >
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyProduction} margin={{ top: 10, right: 18, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#1d2d40" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" stroke="#718096" tickLine={false} axisLine={false} />
            <YAxis stroke="#718096" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} formatter={(value) => [`${Number(value).toLocaleString()} EA`]} />
            <Legend iconType="circle" />
            <Line type="monotone" dataKey="plan" name="생산계획" stroke="#64748b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="actual" name="생산실적" stroke="#38bdf8" strokeWidth={3} dot={{ r: 3, fill: '#38bdf8' }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="품목별 수급 현황" subtitle="수주 · 생산 · 출하 비교" icon={<BarChart3 size={18} />} className="wide-chart">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={itemChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid stroke="#1d2d40" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="code" stroke="#718096" tickLine={false} axisLine={false} />
            <YAxis stroke="#718096" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} formatter={(value) => [`${Number(value).toLocaleString()} EA`]} />
            <Legend iconType="circle" />
            <Bar dataKey="수주" fill="#42526a" radius={[3, 3, 0, 0]} />
            <Bar dataKey="생산" fill="#38bdf8" radius={[3, 3, 0, 0]} />
            <Bar dataKey="출하" fill="#20c997" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="거래처별 출하 현황" subtitle="금일 계획 대비 출하 실적" icon={<PackageCheck size={18} />}>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={customerShipments} layout="vertical" margin={{ top: 4, right: 15, left: 24, bottom: 0 }}>
            <CartesianGrid stroke="#1d2d40" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" stroke="#718096" tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="name" width={74} stroke="#8da0b7" tickLine={false} axisLine={false} fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} formatter={(value) => [`${Number(value).toLocaleString()} EA`]} />
            <Bar dataKey="plan" name="계획" fill="#35445a" radius={[0, 4, 4, 0]} />
            <Bar dataKey="shipped" name="실적" fill="#20c997" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="불량 유형별 비율" subtitle="금일 불량 125EA 분석" icon={<ShieldAlert size={18} />}>
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie data={defectTypes} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3}>
              {defectTypes.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={(value) => [`${value} EA`]} />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="라인별 가동률" subtitle="목표 가동률 90%" icon={<CircleGauge size={18} />}>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={lineOperations} layout="vertical" margin={{ top: 4, right: 18, left: 28, bottom: 0 }}>
            <CartesianGrid stroke="#1d2d40" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#718096" tickLine={false} axisLine={false} unit="%" />
            <YAxis type="category" dataKey="name" width={78} stroke="#8da0b7" tickLine={false} axisLine={false} fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} formatter={(value) => [`${value}%`, '가동률']} />
            <ReferenceLine x={90} stroke="#64748b" strokeDasharray="4 4" />
            <Bar dataKey="operationRate" radius={[0, 5, 5, 0]}>
              {lineOperations.map((entry) => <Cell key={entry.name} fill={operationColor(entry.operationRate)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="품목별 생산달성률" subtitle="계획 대비 실적 달성 수준" icon={<AlertTriangle size={18} />}>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={achievementData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="#1d2d40" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="code" stroke="#718096" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 110]} stroke="#718096" tickLine={false} axisLine={false} unit="%" />
            <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} formatter={(value) => [`${value}%`, '달성률']} />
            <ReferenceLine y={95} stroke="#64748b" strokeDasharray="4 4" />
            <Bar dataKey="rate" radius={[5, 5, 0, 0]}>
              {achievementData.map((entry) => <Cell key={entry.code} fill={achievementColor(entry.rate)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
