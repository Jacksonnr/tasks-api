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

    app.put('/:id', async (request, reply) => {
        const createUpdateTaskSchema = z.object({
            title: z.string(),
            description: z.string(),
        })

        const getIdTask = z.object({
            id: z.string().uuid()
        })

        const { id } = getIdTask.parse(request.params)
        const { title, description } = createUpdateTaskSchema.parse(request.body)

        const result = await knex('tasks')
            .update({ 
                title, 
                description,
                updated_at : knex.fn.now()
             })
            .where('id', id)

        if (result === 0) {
            return reply.status(404).send('task not found!');
        }

        return reply.status(200).send('task Updated')
    })
    

    app.delete('/:id', async (request, reply) => {
        const getIdTask = z.object({
            id: z.string().uuid()
        })

        const { id } = getIdTask.parse(request.params)

        const result = await knex('tasks')
            .delete()
            .where('id', id)

        if (result === 0) {
            return reply.status(404).send('task not found!');
        }

        return reply.status(200).send('task deleted')   
    })

    app.patch('/:id/complete', async(request, reply) => {
        const getIdTask = z.object({
            id: z.string().uuid()
        })

        const { id } = getIdTask.parse(request.params)

        const result = await knex ('tasks')
        .update({
            updated_at: knex.fn.now(),
            completed_at :knex.fn.now()
        })
        .where('id', id)

        if (result === 0) {
            return reply.status(404).send('task not found!');
        }

        return reply.status(200).send('task completed')   
    })
    
}