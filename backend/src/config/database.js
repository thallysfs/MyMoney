//para subir o banco executar na pasta "backend" = mongod
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// local do banco mais o nome (mymoney)
module.exports = mongoose.connect('mongodb://localhost/mymoney', { useNewUrlParser: true })

//sobrepondo mensagem de erro
mongoose.Error.messages.general.required = "O Atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo do '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é menor que o limite máximo do '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."

