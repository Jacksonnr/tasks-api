import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'



export async function tasksRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const createTaskSchema = z.object({
            title: z.string(),
            description: z.string(),
        })

        const { title, description } = createTaskSchema.parse(request.body)

        await knex('tasks').insert({
            id : randomUUID(),
            title,
            description,
        })

        return reply.status(201).send()
    })

    app.get('/', async () => {
        const listTasks = await knex('tasks')

        return listTasks 
    })
}