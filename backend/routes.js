const express = require("express");

const EventosController = require("./controllers/EventosController");
const PessoasController = require("./controllers/PessoasController");

const routes = express.Router({ strict: true });

// rotas de eventos
routes.get("/eventos", EventosController.index);
routes.get("/eventos/:id", EventosController.get);
routes.post("/eventos", EventosController.create);
routes.delete("/eventos/:id", EventosController.delete);

// rotas de pessoas
routes.get("/pessoas", PessoasController.index);

module.exports = routes;
