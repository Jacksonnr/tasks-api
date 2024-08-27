import type { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tasks', (table) => {
        table.uuid('id').notNullable(),
        table.text('title').notNullable()
        table.text('description').notNullable()
        table.dateTime('completed_at')
        table.dateTime('created_at')
        table.dateTime('updated_at')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('tasks')
}

