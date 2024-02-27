// https://mailtrap.io/inboxes/2547374/messages

// Importando a biblioteca nodemailer para envio de e-mails
const nodemailer = require('nodemailer')
// Importando a biblioteca nodemailer-express-handlebars para uso de templates Handlebars nos e-mails
const hbs = require('nodemailer-express-handlebars')
// Importando a biblioteca path para manipulação de caminhos de arquivo
const path = require('path')
// Importando as configurações de e-mail do arquivo mail.json
const { host, port, user, pass } = require('../config/mail.json')
// Criando um objeto de transporte (transporter) para o nodemailer
const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
})
// Configurando o uso de templates Handlebars para compilar e-mails
transport.use('compile', hbs({
  viewEngine: { // viewEngine (obrigatório) a instância do mecanismo de visualização express-handlebars
    defaultLayout: undefined, // Layout padrão (não utilizado neste exemplo)
    partialsDir: path.resolve('./src/resources/mail/') // Diretório de parciais Handlebars
  },
  viewPath: path.resolve('./src/resources/mail/'), // Diretório principal de visualizações Handlebars
  extName: '.html' // Extensão dos arquivos de visualizações (no formato .html)
  // defaultLayout: "false"
}))
// Exportando o objeto de transporte configurado
module.exports = transport

// error

// [Error: ENOENT: no such file or directory, open 'C:\Users\Dev\Desktop\MySql\main.handlebars'] {
//     errno: -4058,
//     code: 'ENOENT',
//     syscall: 'open',
//     path: 'C:\\Users\\Dev\\Desktop\\MySql\\main.handlebars'
//   }

// credito: para
// https://pt.stackoverflow.com/questions/400935/erro-nodejs-a-partials-dir-must-be-a-string-or-config-object
