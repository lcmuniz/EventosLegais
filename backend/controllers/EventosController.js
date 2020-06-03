const crypto = require('crypto')

const connection = require('../connection')

module.exports = {
  // retorna todos os eventos do banco
  async index(req, res) {
    const eventos = await connection('eventos').select('*')

    res.json(eventos)
    return
  },

  async get(req, res) {
    const { id } = req.params

    const evento = await connection('eventos')
      .join('pessoas', 'pessoas.id', '=', 'eventos.id_pessoa')
      .select([
        'eventos.*',
        'pessoas.cpf',
        'pessoas.nome as nome_pessoa',
        'pessoas.dataNascimento',
        'pessoas.email',
        'pessoas.whatsapp',
        'pessoas.cidade as cidade_pessoa',
        'pessoas.estado as estado_pessoa',
        'pessoas.imagem',
      ])
      .where('eventos.id', id)
      .first()

    if (evento === undefined) {
      res.status(404).send()
      return
    }
    res.json(evento)
  },

  // cria um evento no banco. o evento vem no corpo (body) da requisicao
  async create(req, res) {
    const evento = req.body

    const token = req.headers['x-token']

    if (token === undefined) {
      res.status(401).send()
      return
    }

    const pt = await connection('pessoas_tokens')
      .select('*')
      .where('id_pessoa', '=', evento.id_pessoa)
      .where('token', '=', token)
      .first()

    if (pt === undefined) {
      res.status(401).send()
      return
    }

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('eventos').insert({
      id,
      ...evento,
    })

    res.json({ id })
  },

  // atualiza um evento no banco.
  async update(req, res) {
    const { id } = req.params

    const novos_dados = req.body

    const evento = await connection('eventos')
      .select('*')
      .where('id', id)
      .first()

    if (evento === undefined) {
      res.status(404).send()
      return
    }

    const evento_atualizado = {
      ...evento,
      ...novos_dados,
    }

    await connection('eventos').where('id', id).update(evento_atualizado)

    res.json(evento_atualizado)
  },

  // exclui um evento do banco de dados
  async delete(req, res) {
    const { id } = req.params

    const evento = await connection('eventos').where('id', id).first()

    if (evento === undefined) {
      res.status(404).send()
      return
    }

    await connection('eventos').where('id', id).delete()

    res.status(204).send()
  },
  // obtem as pessoas que estao em um evento
  async people(req, res) {
    const { id } = req.params

    const evento = await connection('eventos').where('id', id).first()

    if (evento === undefined) {
      res.status(404).send()
      return
    }

    const pessoas = await connection('eventos_pessoas')
      .join('pessoas', 'pessoas.id', '=', 'eventos_pessoas.id_pessoa')
      .select(['pessoas.*'])
      .where('eventos_pessoas.id_evento', id)

    // inclui o id do evento no cabeçalho da resposta
    res.header('X-Id-Evento', id)

    res.json(pessoas)
  },

  async search(req, res) {
    const { texto } = req.body

    const eventos = await connection('eventos')
      .join('pessoas', 'pessoas.id', '=', 'eventos.id_pessoa')
      .select([
        'eventos.*',
        'pessoas.cpf',
        'pessoas.nome as nome_pessoa',
        'pessoas.dataNascimento',
        'pessoas.email',
        'pessoas.whatsapp',
        'pessoas.cidade as cidade_pessoa',
        'pessoas.estado as estado_pessoa',
        'pessoas.imagem as imagem_pessoa',
      ])
      .where('eventos.nome', 'like', '%' + texto + '%')

    res.json(eventos)
  },
}
