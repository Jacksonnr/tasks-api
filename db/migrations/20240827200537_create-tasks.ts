import type { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tasks', (table) => {
        table.uuid('id').notNullable()
        table.text('title').notNullable()
        table.text('description').notNullable()
        table.timestamp('completed_at')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('tasks')
}

