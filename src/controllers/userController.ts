import { Request, Response } from 'express';
import User from '../models/User';

class UserController {

    public async index (req: Request, res: Response) : Promise<void> {
     
        res.status(200).json({
            message: 'Working'
        })
    }

  
}

const userController = new UserController();

export default userController;