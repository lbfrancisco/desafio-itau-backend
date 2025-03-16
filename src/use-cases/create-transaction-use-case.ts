import type { TransactionsRepository } from '@/repositories/transactions-repository'
import { isDate, isFuture, toDate } from 'date-fns'
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

    const isValidDate = isDate(toDate(dataHora))
    const isDateInFuture = isFuture(dataHora)

    if (!isValidDate || isDateInFuture) {
      throw new UnprocessableEntityError()
    }

    const transaction = this.transactionsRepository.create({ valor, dataHora })

    return transaction
  }
}
