import { makeGetTransactionsStatisticsUseCase } from '@/use-cases/factories/make-get-transactions-statistics-use-case'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function getTransactionsStatistics(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/estatisticas',
    {
      schema: {
        params: z.object({
          intervaloEmMinuto: z.coerce.number().positive().nullish(),
        }),
        response: {
          200: z.object({
            count: z.number(),
            avg: z.number(),
            sum: z.number(),
            min: z.number(),
            max: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { intervaloEmMinuto: rangeInMinutes } = request.params

      const getTransactionsStatistics = makeGetTransactionsStatisticsUseCase()

      const statistics = await getTransactionsStatistics.execute({
        rangeInMinutes,
      })

      console.log(statistics)

      return reply.send({
        count: statistics.count,
        avg: statistics.avg,
        sum: statistics.sum,
        min: statistics.min,
        max: statistics.max,
      })
    },
  )
}
