const mailer = require('./modules/mailer')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/stripe-notifications', (req, res) => {
  const event = req.body;

  // Verifica se o evento é do tipo payment_intent.created
  if (event.type === 'payment_intent.created') {
    const paymentIntent = event.data.object; // Objeto PaymentIntent

    mailer.sendMail({ // https://mailtrap.io/
      to: 'jorge@hotmail.com',
      from: 'novo@hotmail.com',
      template: 'auth/forgot_password',
      context: { paymentIntent }
    }, (err) => {
      if (err) return res.status(400).send({ error: 'error' })
    })
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});