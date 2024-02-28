const mailer = require('./modules/mailer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/stripe-notifications', (req, res) => {
  const paymentIntent = req.body.paymentIntent;

  mailer.sendMail({
    to: 'jorge@hotmail.com',
    from: 'novo@hotmail.com',
    template: 'auth/forgot_password',
    context: { paymentIntent }
  }, (err) => {
    if (err) return res.status(400).send({ error: 'error' });
    res.status(200).send('E-mail enviado com sucesso');
  });
});

// Não é mais necessário definir a porta manualmente
// O Vercel atribuirá automaticamente uma porta para o seu aplicativo

// Remova a definição da porta
// const PORT = 3000;

// Não é mais necessário usar app.listen()
// O Vercel lidará com isso automaticamente

// Remova app.listen()
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });
