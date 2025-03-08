import type { TransactionsRepository } from '@/repositories/transactions-repository'

interface GetTransactionsStatisticsUseCaseRequest {
  rangeInMinutes?: number | null
}

export class GetTransactionsStatisticsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ rangeInMinutes }: GetTransactionsStatisticsUseCaseRequest) {
    const transactionsStatistics = this.transactionsRepository.getStatistics({
      rangeInMinutes,
    })

    return transactionsStatistics
  }
}
