import type { TransactionsRepository } from '@/repositories/transactions-repository'

export class DeleteTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute() {
    const transaction = this.transactionsRepository.deleteAll()

    return transaction
  }
}
