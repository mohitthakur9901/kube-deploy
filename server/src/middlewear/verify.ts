import jwt from 'jsonwebtoken';
import AsyncHandler from '../utils/AsyncHandler';
import ApiError from '../utils/ApiError';
import { User } from '../model/User.Model';

const verfiyJWT = AsyncHandler(async (req, res, next) => {
    try {
        let token;
        if (req.cookies?.accessToken) {
            token = req.cookies.accessToken; 
        } else if (req.headers?.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1]; 
            }
        }

        if (!token) {
            throw new ApiError(401, 'Unauthorized');
        }
        // console.log(token);
        

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { _id: string };
        const user = await User.findById(decoded?._id).select('-password -refresh_token');

        if (!user) {
            throw new ApiError(401, 'Unauthorized');
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error('Error in verfiyJWT:', error);
        throw new ApiError(401, 'Unauthorized');
    }
});

export { verfiyJWT };
