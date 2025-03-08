import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createTransaction } from './http/create-transaction'
import { deleteTransactions } from './http/delete-transactions'
import { getTransactionsStatistics } from './http/get-transactions-statistics'
import { InMemoryTransactionRepository } from './repositories/in-memory/in-memory-transaction-repository'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

export const transactionsRepository = new InMemoryTransactionRepository()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Desafio Itau - Back-end',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(createTransaction)
app.register(deleteTransactions)
app.register(getTransactionsStatistics)
