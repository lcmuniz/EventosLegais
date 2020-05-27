const crypto = require('crypto')

const sha256 = require('js-sha256')

const connection = require('../connection')

module.exports = {
  // retorna todos as pessoas do banco
  async index(req, res) {
    const pessoas = await connection('pessoas').select('*')

    res.json(pessoas)
  },

  async get(req, res) {
    const { id } = req.params

    const pessoa = await connection('pessoas')
      .select('*')
      .where('id', id)
      .first()

    if (pessoa === undefined) {
      res.status(404).send()
      return
    }

    res.json(pessoa)
  },

  // cria uma pessoa no banco de dados
  async create(req, res) {
    const pessoa = req.body

    const id = crypto.randomBytes(4).toString('HEX')

    const { senha } = pessoa

    const senha_crypto = sha256(senha)

    await connection('pessoas').insert({
      id,
      ...pessoa,
      senha: senha_crypto,
    })

    res.json({ id })
  },

  /// atualiza uma pessoa no banco de dados
  async update(req, res) {
    const { id } = req.params

    const novos_dados = req.body

    const { senha } = novos_dados

    const pessoa = await connection('pessoas')
      .select('*')
      .where('id', id)
      .first()

    if (pessoa === undefined) {
      res.status(404).send()
    }

    let senha_crypto
    if (senha) {
      senha_crypto = sha256(senha)
    } else {
      senha_crypto = pessoa.senha
    }

    const nova_pessoa = {
      ...pessoa,
      ...novos_dados,
      senha: senha_crypto,
    }

    await connection('pessoas').where('id', id).update(nova_pessoa)

    res.json(nova_pessoa)
  },

  // exclui uma pessoa no banco de dados
  async delete(req, res) {
    const { id } = req.params

    const pessoa = await connection('pessoas').where('id', id).first()

    if (pessoa === undefined) {
      res.status(404).send()
    }

    await connection('pessoas').where('id', id).delete()

    res.status(204).send()
  },
}
