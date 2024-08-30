import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import csvParser from 'csv-parser'
import { Readable } from 'stream'




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

    app.post('/upload-csv', async (request, reply) => {
        const data = await request.file()

        if(!data){
            return reply.status(400).send('No file uploaded')
        }

        const results: { title: string, description: string} [] = []

        const stream = Readable.from(data.file)

        stream.pipe(csvParser({headers: ['title', 'description']}))
          .on('data', (row) => results.push(row))
          .on('end', async () => {
            for(const row of results) {
                await knex('tasks').insert({
                    id: randomUUID(),
                    title: row.title,
                    description: row.description,
                })
            }
            reply.status(200).send('CSV processed successfully')
          })
          .on('error', (err) => {
            reply.status(500).send('Error processing CSV.')
          })
    })
    
}