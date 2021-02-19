import { Router, Response, Request } from 'express';
import indexController from '../controllers/indexController';

class IndexRoutes {

    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', indexController.index);

    }

}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;