import { transactionsRepository } from '@/app'
import { CreateTransactionUseCase } from '../create-transaction-use-case'

export function makeCreateTransactionUseCase() {
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionsRepository,
  )

  return createTransactionUseCase
}
