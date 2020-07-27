const express = require('express')

//recebendo o servidor como parâmetro
module.exports = function (server) {

    // Definir URL base para todas as rotas 
    const router = express.Router()
    //sempre que uma rota começar com /api será direcionado para o router
    server.use('/api', router)

    // Rotas de Ciclo de Pagamento 
    const BillingCycle = require('../api/billingCycle/billingCycleServices')
    BillingCycle.register(router, '/billingCycles')
}
