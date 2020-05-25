const crypto = require("crypto");

const connection = require("../connection");

module.exports = {
  // retorna todos as pessoas do banco
  async index(req, res) {
    const pessoas = await connection("pessoas").select("*");

    res.json(pessoas);
  },

  async get(req, res) {
    const { id } = req.params;

    const pessoa = await connection("pessoas")
      .select("*")
      .where("id", id)
      .first();

    if (pessoa === undefined) {
      res.status(404).send();
      return;
    }

    res.json(pessoa);
  },

  async create(req, res) {
    const pessoa = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    const { senha } = pessoa;

    const senha_crypto = crypto
      .createHash("sha256")
      .update(senha)
      .digest("hex");

    await connection("pessoas").insert({
      id,
      ...pessoa,
      senha: senha_crypto,
    });

    res.json({ id });
  },

  async update(req, res) {
    const { id } = req.params;

    const novos_dados = req.body;

    const pessoa = await connection("pessoas")
      .select("*")
      .where("id", id)
      .first();

    if (pessoa === undefined) {
      res.status(404).send();
    }

    const nova_pessoa = {
      ...pessoa,
      ...novos_dados,
    };

    await connection("pessoas").where("id", id).update(nova_pessoa);

    res.json(nova_pessoa);
  },

  async delete(req, res) {
    const { id } = req.params;

    const pessoa = await connection("pessoas").where("id", id).first();

    if (pessoa === undefined) {
      res.status(404).send();
    }

    await connection("pessoas").where("id", id).delete();

    res.status(204).send();
  },
};
