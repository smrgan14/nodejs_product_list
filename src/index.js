import Promise from 'bluebird';
import httpServer from './Infrastructure/HttpServer';

Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

httpServer.start();
