import type { Transaction } from '@/@types/transaction'

export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>
  deleteAll(): Promise<void>
  getStatistics({
    rangeInMinutes,
  }: {
    rangeInMinutes?: number | null
  }): Promise<Transaction[]>
}
