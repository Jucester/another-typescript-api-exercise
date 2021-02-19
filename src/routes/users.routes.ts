import { Router, Response, Request } from 'express';
import userController from '../controllers/userController';

class UserRoutes {

    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {

        this.router.get('/', userController.index);
        /*
        this.router.get('/:id', userController.getNews);

        this.router.post('/create', userController.createNews);

        this.router.put('/edit/:id', userController.editNews);

        this.router.delete('/delete/:id', userController.deleteNews);*/
    }

}

const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;