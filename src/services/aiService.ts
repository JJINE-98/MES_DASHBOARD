import type { AiAnswer, AiBriefing, DashboardSummary } from '../types/mes'
import { generateLocalAiAnswer, generateLocalFactoryBriefing } from '../utils/aiAnalysis'

export const fetchAiBriefing = async (summaryData: DashboardSummary): Promise<AiBriefing> => {
  return Promise.resolve(generateLocalFactoryBriefing(summaryData))
}

export const fetchAiAnswer = async (
  question: string,
  summaryData: DashboardSummary,
): Promise<AiAnswer> => {
  return Promise.resolve(generateLocalAiAnswer(question, summaryData))
}
