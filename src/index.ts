import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

require('./database/database');

import indexRoutes from './routes/index.routes';
import newsRoutes from './routes/news.routes';
import authRoutes from './routes/auth.routes';

class Server {

    app: express.Application;

    constructor() {
        this.app = express(); 
        this.config();
        this.middlewares();
        this.routes();      
    }

    config() {
        this.app.set('port', process.env.PORT || 4000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/news", newsRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server runnign on port ', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();

export default server.app;
