import z from 'zod'

const envSchema = z.object({
  STATISTICS_TRANSACTIONS_RANGE_IN_MINUTES: z.coerce.number().default(1),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
