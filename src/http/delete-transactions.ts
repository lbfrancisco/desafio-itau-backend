import { makeDeleteTransactionsUseCase } from '@/use-cases/factories/make-delete-transactions-use-case'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function deleteTransactions(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/transacao',
    {
      schema: {
        response: {
          200: z.null(),
        },
      },
    },
    async (request, reply) => {
      const deleteTransactionsUseCase = makeDeleteTransactionsUseCase()

      await deleteTransactionsUseCase.execute()

      return reply.send()
    },
  )
}
