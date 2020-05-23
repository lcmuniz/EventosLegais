exports.up = function (knex) {
  return knex.schema.createTable("pessoas", function (table) {
    table.string("id").primary();
    table.string("nome").notNullable();
    table.string("cpf").notNullable();
    table.date("dataNascimento").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("cidade").notNullable();
    table.string("estado").notNullable();
    table.string("imagem").notNullable();
    table.string("senha").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pessoas");
};
