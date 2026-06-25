import { useEffect, useState } from 'react'
import { AlertCircle, Bot, CheckCircle2, ChevronRight, LoaderCircle, RefreshCw, Sparkles, Wrench } from 'lucide-react'
import type { AiAnswer, AiBriefing, DashboardSummary } from '../types/mes'
import { fetchAiAnswer, fetchAiBriefing } from '../services/aiService'
import { generateLocalFactoryBriefing } from '../utils/aiAnalysis'

const questions = [
  '왜 위험 상태인가요?',
  '가장 문제가 큰 품목은?',
  '출하 지연 가능성은?',
  '불량 증가 원인은?',
  '어떤 조치가 필요합니까?',
]

export default function AiReportPanel({ summaryData }: { summaryData: DashboardSummary }) {
  const [briefing, setBriefing] = useState<AiBriefing>(() => generateLocalFactoryBriefing(summaryData))
  const [answer, setAnswer] = useState<AiAnswer | null>(null)
  const [loading, setLoading] = useState(true)
  const [answerLoading, setAnswerLoading] = useState<string | null>(null)

  const loadBriefing = async () => {
    setLoading(true)
    setBriefing(await fetchAiBriefing(summaryData))
    setLoading(false)
  }

  useEffect(() => {
    void loadBriefing()
    // summaryData is a stable module-level aggregate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const askQuestion = async (question: string) => {
    setAnswerLoading(question)
    setAnswer(null)
    setAnswer(await fetchAiAnswer(question, summaryData))
    setAnswerLoading(null)
  }

  return (
    <aside className="ai-panel">
      <div className="ai-panel-header">
        <div className="ai-title">
          <div className="ai-orb"><Bot size={23} /></div>
          <div><span>FACTORY COPILOT</span><h2>AI 생산관리 보고서</h2></div>
        </div>
        <button className="icon-button" onClick={() => void loadBriefing()} disabled={loading} aria-label="보고서 새로고침">
          <RefreshCw size={16} className={loading ? 'spin' : ''} />
        </button>
      </div>

      <div className={`risk-banner risk-${briefing.riskLevel}`}>
        <div><span>현재 종합 위험도</span><strong>{briefing.riskLevel}</strong></div>
        <div className="risk-pulse"><i /><i /><i /></div>
      </div>

      <div className="ai-scroll">
        <section className="report-section">
          <div className="report-section-title"><Sparkles size={15} /><h3>AI 종합 브리핑</h3><span>{briefing.source}</span></div>
          {loading ? (
            <div className="analysis-loading"><LoaderCircle className="spin" size={20} /><span>MES 지표 분석 중...</span></div>
          ) : (
            <div className="briefing-copy">
              {briefing.summary.map((line) => <p key={line}>{line}</p>)}
            </div>
          )}
        </section>

        <section className="report-section">
          <div className="report-section-title"><AlertCircle size={15} /><h3>주요 이슈</h3></div>
          <div className="issue-list">
            {briefing.issues.map((issue, index) => (
              <div className="issue-row" key={issue}><span>{String(index + 1).padStart(2, '0')}</span><p>{issue}</p></div>
            ))}
          </div>
        </section>

        <section className="report-section">
          <div className="report-section-title"><Wrench size={15} /><h3>추천 조치사항</h3></div>
          <div className="action-list">
            {briefing.actions.map((action) => (
              <div className="action-row" key={action}><CheckCircle2 size={15} /><p>{action}</p></div>
            ))}
          </div>
        </section>

        <section className="report-section question-section">
          <div className="report-section-title"><Bot size={15} /><h3>AI에게 상세 질문</h3></div>
          <div className="question-buttons">
            {questions.map((question) => (
              <button key={question} onClick={() => void askQuestion(question)} disabled={answerLoading !== null}>
                <span>{question}</span>
                {answerLoading === question ? <LoaderCircle size={14} className="spin" /> : <ChevronRight size={14} />}
              </button>
            ))}
          </div>
        </section>

        {answer && (
          <section className="answer-box">
            <div className="answer-label"><Sparkles size={14} /> AI 답변 <span>{answer.source}</span></div>
            <p>{answer.answer}</p>
            {answer.actions && answer.actions.length > 0 && (
              <ul>{answer.actions.map((action) => <li key={action}>{action}</li>)}</ul>
            )}
          </section>
        )}
      </div>
      <div className="ai-footer"><span className="online-dot" /> MES 데이터 연동 정상 · 마지막 분석 {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
    </aside>
  )
}
