exports.up = function (knex) {
  return knex.schema.createTable("eventos", function (table) {
    table.string("id").primary();
    table.string("nome").notNullable();
    table.string("descricao").notNullable();
    table.datetime("dataHora").notNullable();
    table.string("endereco").notNullable();
    table.string("cidade").notNullable();
    table.string("estado").notNullable();
    table.string("imagem").notNullable();
    table.string("id_pessoa").notNullable();
    table.foreign("id_pessoa").references("id").inTable("pessoas");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("eventos");
};
