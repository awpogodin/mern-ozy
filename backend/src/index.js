const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const requestLogger = require('./middlewares/request-logger.middleware');
const controllers = require('./controllers');

const PORT = config.get('port') || 5000;

const app = express();

mongoose.connect(config.get('mongoUri'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json({ extended: true }));
app.use(requestLogger);

app.use(controllers);

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
