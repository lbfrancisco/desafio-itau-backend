import { InMemoryTransactionRepository } from '@/repositories/in-memory/in-memory-transaction-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GetTransactionsStatisticsUseCase } from './get-transactions-statistics-use-case'
import { afterEach } from 'node:test'

let transactionsRepository: InMemoryTransactionRepository
let sut: GetTransactionsStatisticsUseCase

describe('Get Transactions Statistics Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionRepository()
    sut = new GetTransactionsStatisticsUseCase(transactionsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('deve ser possível listar as estatísticas de transações em um período padrão (1 minuto)', async () => {
    const now = new Date()
    vi.setSystemTime(now)

    await Promise.all([
      transactionsRepository.create({
        valor: 100,
        dataHora: now.toISOString(),
      }),
      transactionsRepository.create({
        valor: 300,
        dataHora: now.toISOString(),
      }),
    ])

    const statistics = await sut.execute({})

    expect(transactionsRepository.transactions).toHaveLength(2)
    expect(statistics.count).toEqual(2)
    expect(statistics.avg).toEqual(200)
    expect(statistics.sum).toEqual(400)
    expect(statistics.min).toEqual(100)
    expect(statistics.max).toEqual(300)
  })

  it('deve ser possível listar as estatísticas de transações em um período de definido', async () => {
    const now = new Date()
    vi.setSystemTime(now)

    const rangeInMinutes = 60 // 60 minutos

    await Promise.all([
      transactionsRepository.create({
        valor: 100,
        dataHora: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
      }),
      transactionsRepository.create({
        valor: 300,
        dataHora: new Date(now.getTime() - 50 * 60 * 1000).toISOString(),
      }),
    ])

    const statistics = await sut.execute({ rangeInMinutes })

    expect(transactionsRepository.transactions).toHaveLength(2)
    expect(statistics.count).toEqual(2)
    expect(statistics.avg).toEqual(200)
    expect(statistics.sum).toEqual(400)
    expect(statistics.min).toEqual(100)
    expect(statistics.max).toEqual(300)
  })

  it('não deve listar estatísticas de transações fora do range de 1 minuto', async () => {
    const now = new Date()
    vi.setSystemTime(now)

    await Promise.all([
      transactionsRepository.create({
        valor: 100,
        dataHora: new Date(now.getTime() - 2 * 60 * 1000).toISOString(), // 2 minutos atrás
      }),
      transactionsRepository.create({
        valor: 300,
        dataHora: new Date(now.getTime() - 3 * 60 * 1000).toISOString(), // 3 minutos atrás
      }),
    ])

    const statistics = await sut.execute({})

    expect(statistics.count).toEqual(0)
    expect(statistics.sum).toEqual(0)
    expect(statistics.avg).toEqual(0)
    expect(statistics.min).toEqual(0)
    expect(statistics.max).toEqual(0)
  })
})
