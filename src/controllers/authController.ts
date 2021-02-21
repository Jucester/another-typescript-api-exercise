import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

import jwt from 'jsonwebtoken'

class AuthController {

    public async signUp (req: Request, res: Response) {
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
        const token : string = jwt.sign({ _id : savedUser._id }, process.env.TOKEN_SECRET_KEY || 'token_secret');
        
        res.status(200).header('auth-token', token).json({
            message: 'User registered',
            data: savedUser
        })
    }

    public async signIn (req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                message: 'Email or password incorrect'
            });
        }

        const validated : boolean = await user.validatePassword(password)
        if(!validated) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        };

        const token : string  = jwt.sign({ _id : user._id}, process.env.TOKEN_SECRET_KEY || 'token_secret', {
            expiresIn: 60 * 60 * 24
        });

        res.status(200).header('auth-token', token).json({
            message: 'User logged ',
            data: user
        })

    }

    public async profile (req: Request, res: Response) {
        const { userId } = req.body;
        const user = await User.findById(userId)

        if(!user) return res.status(404).json('User not found');

        res.status(200).json({
            message: 'User found',
            data: user
        })
    }
}

const authController = new AuthController();

export default authController;