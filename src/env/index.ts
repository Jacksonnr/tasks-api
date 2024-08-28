import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Erro... ', _env.error.format())
    throw new Error ('erro')
}

export const env = _env.data