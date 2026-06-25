import { customerShipments, defectTypes, itemData, lineOperations } from '../data/mockData'
import type { DashboardSummary } from '../types/mes'

const round = (value: number) => Math.round(value * 10) / 10

export const summaryData: DashboardSummary = (() => {
  const totalOrderQty = itemData.reduce((sum, item) => sum + item.orderQty, 0)
  const totalPlanQty = itemData.reduce((sum, item) => sum + item.planQty, 0)
  const totalProdQty = itemData.reduce((sum, item) => sum + item.prodQty, 0)
  const totalShipQty = itemData.reduce((sum, item) => sum + item.shipQty, 0)
  const totalShipPlanQty = itemData.reduce((sum, item) => sum + item.shipPlanQty, 0)
  const totalDefectQty = itemData.reduce((sum, item) => sum + item.defectQty, 0)

  return {
    totalOrderQty,
    totalPlanQty,
    totalProdQty,
    totalShipQty,
    totalDefectQty,
    productionAchievementRate: round((totalProdQty / totalPlanQty) * 100),
    shipmentAchievementRate: round((totalShipQty / totalShipPlanQty) * 100),
    defectRate: round((totalDefectQty / totalProdQty) * 100),
    topDelayedItems: itemData
      .filter((item) => item.delayed || item.prodQty < item.planQty)
      .map((item) => ({
        code: item.code,
        name: item.name,
        shortage: item.planQty - item.prodQty,
        achievementRate: round((item.prodQty / item.planQty) * 100),
      }))
      .sort((a, b) => a.achievementRate - b.achievementRate)
      .slice(0, 3),
    topDefectItems: itemData
      .map((item) => ({
        code: item.code,
        name: item.name,
        defectQty: item.defectQty,
        defectRate: round((item.defectQty / item.prodQty) * 100),
      }))
      .sort((a, b) => b.defectRate - a.defectRate)
      .slice(0, 3),
    topDefectTypes: [...defectTypes]
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(({ name, value }) => ({ name, value })),
    lineOperationRates: lineOperations.map(({ name, operationRate, status }) => ({
      name,
      operationRate,
      status,
    })),
    customerShipmentStatus: customerShipments.map((customer) => ({
      ...customer,
      rate: round((customer.shipped / customer.plan) * 100),
    })),
  }
})()
