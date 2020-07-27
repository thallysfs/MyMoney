const restful = require('node-restful')
const mongoose = restful.mongoose

//abaixo crio as tabelas e defino as validações

// esquema relacionado a tabela crédito
const creditSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }
})

// esquema relacionado a tabela débito
const debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!'] },
    //status será convertido pára maiúscula ao ser digitado e enum de três tipos
    status: {
        type: String, required: false, uppercase: true,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO']
    }
})

const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, min: 1970, max: 2100, required: true },
    //os atributos baixo são arrays que apontam para os esquemas definidos acima
    credits: [creditSchema],
    debts: [debtSchema]
})

//exportar o esquema para usar em outro módulo
module.exports = restful.model('BillingCycle', billingCycleSchema)
