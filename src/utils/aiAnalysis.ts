import type { AiAnswer, AiBriefing, DashboardSummary, RiskLevel } from '../types/mes'

const getRiskLevel = (data: DashboardSummary): RiskLevel => {
  const hasShipmentDelay = data.customerShipmentStatus.some((item) => item.rate < 80)
  if (data.productionAchievementRate < 80 || data.defectRate > 5 || hasShipmentDelay) return '위험'
  if (
    data.productionAchievementRate < 95 ||
    data.defectRate > 2 ||
    data.lineOperationRates.some((line) => line.operationRate < 80)
  ) return '주의'
  return '정상'
}

export const generateLocalFactoryBriefing = (data: DashboardSummary): AiBriefing => {
  const delayed = data.topDelayedItems[0]
  const defect = data.topDefectItems[0]
  const lowLine = [...data.lineOperationRates].sort((a, b) => a.operationRate - b.operationRate)[0]
  const delayedCustomer = [...data.customerShipmentStatus].sort((a, b) => a.rate - b.rate)[0]

  return {
    riskLevel: getRiskLevel(data),
    source: '로컬 분석',
    generatedAt: new Date().toISOString(),
    summary: [
      `금일 생산실적은 ${data.totalProdQty.toLocaleString()}EA로 계획 대비 ${data.productionAchievementRate}% 수준입니다.`,
      `${delayed.code} 품목의 생산 부족 ${delayed.shortage.toLocaleString()}EA로 후속 출하 대응이 필요합니다.`,
      `${lowLine.name} 가동률이 ${lowLine.operationRate}%로 기준 가동률을 하회하고 있습니다.`,
      `종합 불량률은 ${data.defectRate}%이며 ${defect.code} 품목을 우선 관리해야 합니다.`,
    ],
    issues: [
      `${delayed.code} 생산달성률 ${delayed.achievementRate}%`,
      `${defect.code} 불량률 ${defect.defectRate}% (${defect.defectQty}EA)`,
      `${delayedCustomer.name} 출하달성률 ${delayedCustomer.rate}%`,
      `${lowLine.name} 가동률 ${lowLine.operationRate}%`,
    ],
    actions: [
      `${delayed.code} 긴급 생산 오더를 우선 배정하고 잔여 ${delayed.shortage}EA 만회계획을 수립하십시오.`,
      `${lowLine.name} 비가동 원인과 금형·설비 이상 이력을 즉시 점검하십시오.`,
      `${defect.code} 초품 재검증 및 용접 조건·치구 정밀도를 확인하십시오.`,
      `${delayedCustomer.name} 납품계획을 재협의하고 분할 출하 가능 여부를 검토하십시오.`,
    ],
  }
}

export const generateLocalAiAnswer = (question: string, data: DashboardSummary): AiAnswer => {
  const delayed = data.topDelayedItems[0]
  const defect = data.topDefectItems[0]
  const lowLine = [...data.lineOperationRates].sort((a, b) => a.operationRate - b.operationRate)[0]
  const delayedCustomer = [...data.customerShipmentStatus].sort((a, b) => a.rate - b.rate)[0]
  let answer = ''
  let actions: string[] = []

  if (question.includes('왜 위험')) {
    answer = `생산달성률이 ${data.productionAchievementRate}%로 목표 95%를 하회하고, ${delayedCustomer.name} 출하달성률이 ${delayedCustomer.rate}%까지 저하되었습니다. 특히 ${lowLine.name} 가동률 ${lowLine.operationRate}%가 생산 차질의 핵심 선행지표입니다.`
  } else if (question.includes('문제가 큰 품목')) {
    answer = `${delayed.code}(${delayed.name})이 가장 시급합니다. 계획 대비 ${delayed.shortage}EA 부족하며 생산달성률은 ${delayed.achievementRate}%입니다.`
    actions = ['해당 품목을 프레스·후공정 최우선 순번으로 재배치', '시간대별 만회 실적을 생산관리에서 추적']
  } else if (question.includes('출하 지연')) {
    answer = `${delayedCustomer.name} 출하달성률이 ${delayedCustomer.rate}%이며, 86320-A20B0 품목의 출하 지연이 이미 발생했습니다. 현 생산 추세가 유지되면 차기 납기에도 영향 가능성이 높습니다.`
    actions = ['완성재 재고와 검사대기 수량 확인', '고객사와 분할 출하 및 긴급 운송 협의']
  } else if (question.includes('불량 증가')) {
    answer = `${defect.code}(${defect.name}) 불량률이 ${defect.defectRate}%로 가장 높습니다. 불량 유형 중 용접불량 비중이 최대이므로 용접 조건 편차, 치구 유격, 작업 표준 준수 여부를 우선 확인해야 합니다.`
    actions = ['용접 전류·가압력 조건 점검', '치구 정밀도 확인 및 초품 승인 재실시']
  } else {
    answer = `${delayed.code} 생산 만회, ${lowLine.name} 설비 정상화, ${defect.code} 불량 차단을 동시에 추진해야 합니다. 출하 지연 고객은 생산 완료분부터 분할 출하하는 것이 가장 현실적입니다.`
    actions = ['2시간 단위 만회계획 운영', '설비보전 긴급 투입', '품질 게이트 강화', '고객사 납기 커뮤니케이션']
  }

  return { answer, actions, source: '로컬 분석' }
}
