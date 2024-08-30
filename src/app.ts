import fastify from 'fastify'
import { tasksRoutes  } from './routes/tasks'
import fastifyMultipart from '@fastify/multipart'

export const app = fastify()

app.register(fastifyMultipart)

app.register(tasksRoutes,{
    prefix: 'tasks'
})