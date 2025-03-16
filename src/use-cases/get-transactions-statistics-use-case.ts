import type { TransactionsRepository } from '@/repositories/transactions-repository'

interface GetTransactionsStatisticsUseCaseRequest {
  rangeInMinutes?: number | null
}

interface GetTransactionsStatisticsResponse {
  count: number
  sum: number
  avg: number
  min: number
  max: number
}

export class GetTransactionsStatisticsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    rangeInMinutes,
  }: GetTransactionsStatisticsUseCaseRequest): Promise<GetTransactionsStatisticsResponse> {
    const transactionsStatistics =
      await this.transactionsRepository.getStatistics({
        rangeInMinutes,
      })

    if (transactionsStatistics.length === 0) {
      return {
        count: 0,
        sum: 0,
        avg: 0,
        min: 0,
        max: 0,
      }
    }

    const values = transactionsStatistics.map(
      (transaction) => transaction.valor,
    )

    const sum = values.reduce((acc, val) => acc + val, 0)
    const avg = sum / values.length
    const min = Math.min(...values)
    const max = Math.max(...values)

    return {
      count: values.length,
      sum,
      avg,
      min,
      max,
    }
  }
}
