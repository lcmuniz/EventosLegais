exports.up = function (knex) {
  return knex.schema.createTable('pessoas_tokens', function (table) {
    table.string('id_pessoa').notNullable()
    table.string('token').notNullable()
    table.foreign('id_pessoa').references('id').inTable('pessoas')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('pessoas_tokens')
}
