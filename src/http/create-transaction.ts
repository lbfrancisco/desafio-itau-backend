import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case'
import { isDate, isFuture, toDate } from 'date-fns'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function createTransaction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/transacao',
    {
      schema: {
        body: z.object({
          valor: z.coerce.number().positive(),
          dataHora: z.coerce.string(),
        }),
        response: {
          201: z.null(),
          400: z.null(),
          422: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { valor, dataHora } = request.body

      const createTransactionUseCase = makeCreateTransactionUseCase()

      if (valor <= 0) {
        return reply.status(422).send()
      }

      const isValidDate = isDate(toDate(dataHora))
      const isDateInFuture = isFuture(dataHora)

      console.log(isValidDate, isDateInFuture)

      if (!isValidDate || isDateInFuture) {
        return reply.status(422).send()
      }

      await createTransactionUseCase.execute({ valor, dataHora })

      return reply.status(201).send()
    },
  )
}
