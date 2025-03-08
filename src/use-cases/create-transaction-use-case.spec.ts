import { InMemoryTransactionRepository } from '@/repositories/in-memory/in-memory-transaction-repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { CreateTransactionUseCase } from './create-transaction-use-case'
import { UnprocessableEntityError } from './errors/unprocessable-entity-error'

let transactionsRepository: InMemoryTransactionRepository
let sut: CreateTransactionUseCase

describe('Create Transaction Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionRepository()
    sut = new CreateTransactionUseCase(transactionsRepository)
  })

  it('deve ser possível criar uma nova transação', async () => {
    await sut.execute({
      valor: 123.45,
      dataHora: '2020-08-07T12:34:56.789-03:00',
    })

    expect(transactionsRepository.transactions).toHaveLength(1)
  })

  it('não deve ser possível criar uma transação com o valor menor ou igual do que zero', async () => {
    await expect(() =>
      sut.execute({
        valor: -123.45,
        dataHora: '2020-08-07T12:34:56.789-03:00',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('não deve ser possível criar uma transação com uma data inválida', async () => {
    await expect(() =>
      sut.execute({
        valor: -123.45,
        dataHora: 'qualquer-coisa',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })

  it('não deve ser possível criar uma transação com uma data no futuro', async () => {
    await expect(() =>
      sut.execute({
        valor: -123.45,
        dataHora: '2030-08-07T12:34:56.789-03:00',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError)
  })
})
