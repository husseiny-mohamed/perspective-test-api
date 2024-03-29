const express = require('express');
const promisify = require('es6-promisify');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();



app.use(cors());

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('perspective-test-api works!');
});

// Handle our own routes!
apiRoutes(app);

// If that above routes didn't work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);


// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;



