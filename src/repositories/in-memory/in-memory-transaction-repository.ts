import type { Transaction } from '@/@types/transaction'
import { env } from '@/env'
import type { TransactionsRepository } from '../transactions-repository'

export class InMemoryTransactionRepository implements TransactionsRepository {
  private transactions: Transaction[] = []

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

    const filteredTransactions = this.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dataHora)
      return now.getTime() - transactionDate.getTime() <= transactionDateRange
    })

    if (filteredTransactions.length === 0) {
      return {
        count: 0,
        sum: 0,
        avg: 0,
        min: 0,
        max: 0,
      }
    }

    const values = filteredTransactions.map((transaction) => transaction.valor)

    const sum = values.reduce((sum, acc) => sum + acc, 0)
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
