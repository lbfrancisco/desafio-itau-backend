import type { Transaction } from '@/@types/transaction'
import { env } from '@/env'
import type { TransactionsRepository } from '../transactions-repository'

export class InMemoryTransactionRepository implements TransactionsRepository {
  public transactions: Transaction[] = []

  async create(transaction: Transaction) {
    this.transactions.push(transaction)
  }

  async deleteAll() {
    this.transactions = []
  }

  async getStatistics({ rangeInMinutes }: { rangeInMinutes: number }) {
    const now = new Date()

    const transactionDateRange = rangeInMinutes
      ? rangeInMinutes * 60 * 1000
      : env.STATISTICS_TRANSACTIONS_RANGE_IN_MINUTES * 60 * 1000

    return this.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dataHora)
      return now.getTime() - transactionDate.getTime() <= transactionDateRange
    })
  }
}
