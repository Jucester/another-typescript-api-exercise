import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

import jwt from 'jsonwebtoken'

class AuthController {

    public async singUp (req: Request, res: Response) {
        // Receiving the data and saving a new user
        const { username, email, password } = req.body;
        const user : IUser = new User({
            username,
            email,
            password
        });
        const savedUser = await user.save();
        console.log(savedUser);

        // Asigning a token
        const token : string = jwt.sign({ _id : savedUser._id }, process.env.TOKEN_SECRET_KEY || 'token_test');
        
        res.status(200).header('auth-token', token).json({
            message: 'User registered',
            data: savedUser
        })

    }

    public singIn (req: Request, res: Response) {
        res.send(`Api: /api/news`);
    }

    public profile (req: Request, res: Response) {
        res.send(`Api: /api/news`);
    }
}

const authController = new AuthController();

export default authController;