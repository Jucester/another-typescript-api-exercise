import { Router, Response, Request } from 'express';
import AuthController from '../controllers/authController';

class AuthRoutes {

    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/singin', AuthController.singIn);
        this.router.post('/singup', AuthController.singUp);
        this.router.get('/profile', AuthController.profile);

    }

}

const authRoutes = new AuthRoutes();
authRoutes.routes();

export default authRoutes.router;