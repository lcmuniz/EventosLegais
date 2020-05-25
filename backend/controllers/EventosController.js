const crypto = require("crypto");

const connection = require("../connection");

module.exports = {
  // retorna todos os eventos do banco
  async index(req, res) {
    const eventos = await connection("eventos").select("*");

    res.json(eventos);
    return;
  },

  async get(req, res) {
    const { id } = req.params;

    const evento = await connection("eventos")
      .join("pessoas", "pessoas.id", "=", "eventos.id_pessoa")
      .select([
        "eventos.*",
        "pessoas.cpf",
        "pessoas.nome as nome_pessoa",
        "pessoas.dataNascimento",
        "pessoas.email",
        "pessoas.whatsapp",
        "pessoas.cidade as cidade_pessoa",
        "pessoas.estado as estado_pessoa",
        "pessoas.imagem",
      ])
      .where("eventos.id", id)
      .first();

    if (evento === undefined) {
      res.status(404).send();
      return;
    }
    res.json(evento);
  },

  // cria um evento no banco. o evento vem no corpo (body) da requisicao
  async create(req, res) {
    const evento = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("eventos").insert({
      id,
      ...evento,
    });

    res.json({ id });
  },

  // atualiza um evento no banco. o evento vem no corpo (body) da requisicao
  async update(req, res) {
    const { id } = req.params;

    const novos_dados = req.body;

    const evento = await connection("eventos")
      .select("*")
      .where("id", id)
      .first();

    if (evento === undefined) {
      res.status(404).send();
      return;
    }

    const evento_atualizado = {
      ...evento,
      ...novos_dados,
    };

    await connection("eventos").where("id", id).update(evento_atualizado);

    res.json(evento_atualizado);
  },

  async delete(req, res) {
    const { id } = req.params;

    const evento = await connection("eventos").where("id", id).first();

    if (evento === undefined) {
      res.status(404).send();
      return;
    }

    await connection("eventos").where("id", id).delete();

    res.status(204).send();
  },
};
