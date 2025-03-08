import { transactionsRepository } from '@/app'
import { GetTransactionsStatisticsUseCase } from './../get-transactions-statistics-use-case'

export function makeGetTransactionsStatisticsUseCase() {
  const getTransactionsStatisticsUseCase = new GetTransactionsStatisticsUseCase(
    transactionsRepository,
  )

  return getTransactionsStatisticsUseCase
}
