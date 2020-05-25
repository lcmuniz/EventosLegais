exports.up = function (knex) {
  return knex.schema.createTable("eventos_pessoas", function (table) {
    table.string("id_evento").notNullable();
    table.string("id_pessoa").notNullable();
    table.foreign("id_evento").references("id").inTable("eventos");
    table.foreign("id_pessoa").references("id").inTable("pessoas");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("eventos_pessoas");
};
