const connection = require('../connection')

module.exports = {
  // inscrive uma pessoa em um evento
  async register(req, res) {
    const { id_evento, id_pessoa } = req.body

    const inscricao = await connection('eventos_pessoas')
      .select('*')
      .where('id_evento', id_evento)
      .where('id_pessoa', id_pessoa)
      .first()

    if (inscricao) {
      res.json({ error: 'Inscrição já realizada' })
      return
    }

    const evento = await connection('eventos').where('id', id_evento).first()

    if (evento === undefined) {
      res.json({ error: `Evento ${id_evento} não encontrado` })
      return
    }

    const pessoa = await connection('pessoas').where('id', id_pessoa).first()

    if (pessoa === undefined) {
      res.json({ error: `Pessoa ${id_pessoa} não encontrada` })
      return
    }

    const nova_inscricao = { id_evento, id_pessoa }

    await connection('eventos_pessoas').insert(nova_inscricao)

    res.status(204).send()
  },
}
