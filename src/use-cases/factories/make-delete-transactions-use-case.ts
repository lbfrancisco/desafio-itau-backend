import { transactionsRepository } from '@/app'
import { DeleteTransactionsUseCase } from '../delete-transactions-use-case'

export function makeDeleteTransactionsUseCase() {
  const deleteTransactionsUseCase = new DeleteTransactionsUseCase(
    transactionsRepository,
  )

  return deleteTransactionsUseCase
}
