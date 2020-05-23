const crypto = require("crypto");

const connection = require("../connection");

module.exports = {
  // retorna todos as pessoas do banco
  async index(req, res) {
    const pessoas = await connection("pessoas").select("*");

    res.json(pessoas);
  },
};
