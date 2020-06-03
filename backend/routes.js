const express = require('express')

const EventosController = require('./controllers/EventosController')
const PessoasController = require('./controllers/PessoasController')
const InscricaoController = require('./controllers/InscricaoController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router({ strict: true })

// rotas de eventos
routes.get('/eventos', EventosController.index)
routes.get('/eventos/:id', EventosController.get)
routes.post('/eventos', EventosController.create)
routes.delete('/eventos/:id', EventosController.delete)
routes.put('/eventos/:id', EventosController.update)
routes.get('/eventos/:id/pessoas', EventosController.people)
routes.post('/eventos/search', EventosController.search)

// rotas de pessoas
routes.get('/pessoas', PessoasController.index)
routes.get('/pessoas/:id', PessoasController.get)
routes.post('/pessoas', PessoasController.create)
routes.put('/pessoas/:id', PessoasController.update)
routes.delete('/pessoas/:id', PessoasController.delete)

// rotas de inscricao
routes.post('/inscricao', InscricaoController.register)

// rotas de autenticacao
routes.post('/login', SessionController.login)

module.exports = routes
