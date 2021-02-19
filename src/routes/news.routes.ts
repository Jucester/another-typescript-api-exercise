import { Router, Response, Request } from 'express';
import newsController from '../controllers/newsController';

class NewsRoutes {

    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {

        this.router.get('/', newsController.getAllNews);

        this.router.get('/:id', newsController.getNews);

        this.router.post('/create', newsController.createNews);

        this.router.put('/edit/:id', newsController.editNews);

        this.router.delete('/delete/:id', newsController.deleteNews);

    }

}

const newsRoutes = new NewsRoutes();
newsRoutes.routes();

export default newsRoutes.router;