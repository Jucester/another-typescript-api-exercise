import { Router, Response, Request } from 'express';
import AuthController from '../controllers/authController';
import { TokenValidation } from '../libs/verifyToken';

class AuthRoutes {

    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/signin', AuthController.signIn);
        this.router.post('/signup', AuthController.signUp);
        this.router.get('/profile', TokenValidation, AuthController.profile);

    }

}

const authRoutes = new AuthRoutes();
authRoutes.routes();

export default authRoutes.router;