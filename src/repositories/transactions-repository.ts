import type { Transaction } from '@/@types/transaction'

interface GetTransactionsStatistics {
  count: number
  sum: number
  avg: number
  min: number
  max: number
}

export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>
  deleteAll(): Promise<void>
  getStatistics({
    rangeInMinutes,
  }: {
    rangeInMinutes?: number | null
  }): Promise<GetTransactionsStatistics>
}
