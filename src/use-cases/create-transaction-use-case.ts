import type { TransactionsRepository } from '@/repositories/transactions-repository'
import { UnprocessableEntityError } from './errors/unprocessable-entity-error'

interface CreateTransactionUseCaseRequest {
  valor: number
  dataHora: string
}

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ valor, dataHora }: CreateTransactionUseCaseRequest) {
    if (valor <= 0) {
      throw new UnprocessableEntityError()
    }

    const invalidDate = isNaN(new Date(dataHora).getTime())
    const isDateInFuture = !!invalidDate && new Date()

    if (invalidDate || isDateInFuture) {
      throw new UnprocessableEntityError()
    }

    const transaction = this.transactionsRepository.create({ valor, dataHora })

    return transaction
  }
}
