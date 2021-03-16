import express from 'express';
import bodyParsr from 'body-parser';
import config from '../config';
import userRouter from '../Routes/UserRouter';
import productRouter from '../Routes/ProductRouter';
import listRouter from '../Routes/ListRouter';
import productListRouter from '../Routes/ProductListRouter';

class HttpServer {
    constructor(options = {}) {
        // this.port = options.serverPort || config.serverPort;
        this.port = 4000;
        // this.nodeEnv = options.nodeEnv || config.nodeEnv;
        this.app = express();
    }

    start() {
        this.register();
        this.app.listen(this.port, () => {
            console.log(`Server working on port ${this.port} in development mode`);
        });
    }

    register() {
        this.app.use(bodyParsr());
        this.app.get('/', (req, res) => {
            res.send('HTTP server is up ...');
        });
        this.app.use('/user', userRouter);
        this.app.use('/product', productRouter);
        this.app.use('/list', listRouter);
        this.app.use('/product/list', productListRouter);
    }
}

export default new HttpServer();
