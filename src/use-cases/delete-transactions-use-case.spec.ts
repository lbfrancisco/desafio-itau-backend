import { InMemoryTransactionRepository } from '@/repositories/in-memory/in-memory-transaction-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTransactionsUseCase } from './delete-transactions-use-case'

let transactionsRepository: InMemoryTransactionRepository
let sut: DeleteTransactionsUseCase

describe('Delete Transaction Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionRepository()
    sut = new DeleteTransactionsUseCase(transactionsRepository)
  })

  it('deve ser possível deletar todas as transações', async () => {
    await Promise.all([
      transactionsRepository.create({
        valor: 123.56,
        dataHora: '2020-08-07T12:34:56.789-03:00',
      }),
      transactionsRepository.create({
        valor: 1000.11,
        dataHora: '2022-08-07T12:34:56.789-03:00',
      }),
      transactionsRepository.create({
        valor: 0.11,
        dataHora: '2024-08-07T12:34:56.789-03:00',
      }),
    ])

    // SUT: Deleta todas as transações
    await sut.execute()

    expect(transactionsRepository.transactions).toHaveLength(0)
  })
})
