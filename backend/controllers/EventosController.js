const crypto = require("crypto");

const connection = require("../connection");

module.exports = {
  // retorna todos os eventos do banco
  async index(req, res) {
    const eventos = await connection("eventos").select("*");

    res.json(eventos);
  },

  async get(req, res) {
    const { id } = req.params;

    const eventos = await connection("eventos").select("*").where("id", id);

    if (eventos.length == 0) {
      res.json({});
    }

    const evento = eventos[0];

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

  async delete(req, res) {
    const { id } = req.params;

    const evento = await connection("eventos").where("id", id).first();

    if (evento === undefined) {
      res.json({ mensagem: "Evento não encontrado" });
    }

    await connection("eventos").where("id", id).delete();

    res.json({ mensagem: "Evento " + id + " foi excluido" });
  },
};
