//pego tudo que está dentro do caminho ./billingCycle e armazeno na constante "BillingCycle" para poder utilizar neste arquivo
const BillingCycle = require('./billingCycle')
//mesma coisa descrita acima, só muda o arquivo e caminho
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
//quando o objeto for atualizado, ele sempre retornará o objeto novo. runValidators: true - roda as validações que não são onrighatórias no PUT
BillingCycle.updateOptions({ new: true, runValidators: true })

BillingCycle.after('post', errorHandler).after('put', errorHandler)

BillingCycle.route('get', (req, res, next) => {

    BillingCycle.find({}, (err, docs) => {

        if (!err) {

            res.json(docs)

        } else {

            res.status(500).json({ errors: [error] })

        }

    })

})

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{
        //aqui realizo a soma de todos os registros de débito e crédito
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
    }, {
        //aqui agrupo os registros de crédito e débito sem critério de id
        $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
    }, {
        //aqui defino o que vai aparecer nesse agrupamento 0= Não aparece 1= aparece
        $project: { _id: 0, credit: 1, debt: 1 }
    }], (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

//exporto as alterações, juntamente com os registros armazenados no arquivo billingCycle.js
//peguei o que ele gerou e acrescentei mais coisas nesse arquivo services
module.exports = BillingCycle
