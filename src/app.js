import express from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  
  middlewares() {
    //tamanho configurado no express e no nginx
    this.server.use(express.json({limit: '100mb'}));
  }

  routes() {
    this.server.use(cors());
    this.server.use(routes);
  }
}

export default new App().server;
