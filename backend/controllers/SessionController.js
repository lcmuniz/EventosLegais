const md5 = require('md5')

const connection = require('../connection')

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body

    const pessoa = await connection('pessoas')
      .select('*')
      .where('email', email)
      .where('senha', senha)
      .first()

    if (pessoa == undefined) {
      res.status(404).send()
      return
    }

    const data = new Date().getTime()

    const token = md5(email + senha + data)

    res.json({ token })
  },
}
