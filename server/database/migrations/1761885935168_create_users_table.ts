import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.uuid('grade_id').references('id').inTable('grades')
      table.uuid('filere_id').references('id').inTable('fileres') 
      table.string('matricule').notNullable().unique()  
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
