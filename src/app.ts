import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createTransaction } from './http/create-transaction'
import { deleteTransactions } from './http/delete-transactions'
import { getTransactionsStatistics } from './http/get-transactions-statistics'
import { InMemoryTransactionRepository } from './repositories/in-memory/in-memory-transaction-repository'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

export const transactionsRepository = new InMemoryTransactionRepository()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(createTransaction)
app.register(deleteTransactions)
app.register(getTransactionsStatistics)
