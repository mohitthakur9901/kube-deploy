import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type Role = 'user' | 'admin';

interface ordersArray {
    productId : mongoose.Types.ObjectId
    quantity : number
}
interface IUser extends Document {
    profileImg?: string
    username: string
    firstName: string
    lastName?: string
    email: string,
    password: string,
    role : Role
    orders: ordersArray[]
    access_token: string;
    refresh_token: string;
}

export interface UserDocument extends IUser, Document {
    isPasswordCorrect: (password: string) => Promise<boolean>;
    generateAccessToken: () => string;
    generateRefreshToken: () => string;
}

export interface UserModel extends mongoose.Model<UserDocument> { }

const userSchema = new mongoose.Schema({
    profileImg: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    orders: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    access_token: {
        type: String,
        default: ""
    },
    refresh_token: {
        type: String,
        default: ""
    },
}, { timestamps: true });

userSchema.pre<UserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        role : this.role
    }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    })
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,

    }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRTY,
    })
}

export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);