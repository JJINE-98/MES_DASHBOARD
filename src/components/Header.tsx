import { useEffect, useState } from 'react'
import { Activity, CalendarDays, Clock3, Factory, Radio } from 'lucide-react'

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(date)

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)

export default function Header() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <header className="top-header">
      <div className="brand">
        <div className="brand-mark">
          <Activity size={22} />
        </div>
        <div>
          <div className="eyebrow"><Radio size={11} /> SMART FACTORY CONTROL</div>
          <h1>AI 스마트팩토리 MES 관제 대시보드</h1>
        </div>
      </div>
      <div className="header-meta">
        <div className="meta-item">
          <CalendarDays size={16} />
          <div><span>기준일자</span><strong>{formatDate(now)}</strong></div>
        </div>
        <div className="meta-item">
          <Factory size={16} />
          <div><span>공장명</span><strong>DMC 1공장</strong></div>
        </div>
        <div className="meta-item live-time">
          <Clock3 size={16} />
          <div><span>현재시간</span><strong>{formatTime(now)}</strong></div>
        </div>
      </div>
    </header>
  )
}
