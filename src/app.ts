// Dependencies
import Koa from 'koa';
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';

// Assets
import hola from './routes/hola';
import newUser from './routes/newUser';

const APP: Koa = new Koa();
const PORT: string | number = process.env.PORT || 3000;

// Middlewares
APP.use(bodyParser())
  .use(cors({ origin: '*' }))
  .use(logger())
  .use(hola.routes())
  .use(newUser.routes());

// Creacion del servidor
const SERVER = APP.listen(PORT, async () => console.log(`Server listening on port ${PORT}`))
  .on('error', (err) => console.log(err));

module.exports = SERVER;
