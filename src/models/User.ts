import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface to define the data of the model
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    //encryptPassword(password: string ): Promise<string>,
    validatePassword(password: string): Promise<string>;
}

//Asignning "Schema<IUser>" solve the error with "this.password" not detected
const UserSchema : Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    updatedAt: {
        type: Date,
    },
})

UserSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();

})

/*
UserSchema.methods.encryptPassword = async (password : string) : Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};*/

UserSchema.methods.validatePassword = async function (password : string) : Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', UserSchema);