import express from 'express';
import { upload } from '../lib/Multer';
import {
    registerUser, loginUser, logoutUser, UpdateCurrentUser, changeCurrentPassword,
    getUser, getusers, refreshActionToken, updateProfileImgAndDeletePrevious , updateUserToAdmin ,addToOrders, 
    getAllOrders
} from '../controller/User';
import { verfiyJWT } from '../middlewear/verify';


const router = express.Router();

router.post('/register', upload.single('profileImg'), registerUser);
router.post('/login', loginUser);
router.post('/logout', verfiyJWT, logoutUser)
router.post('/update-profile', verfiyJWT, upload.single('profileImg'), updateProfileImgAndDeletePrevious)
router.post('/refresh', refreshActionToken)
router.post('/change-password', verfiyJWT, changeCurrentPassword)
router.get('/current-user', verfiyJWT, getUser)
router.get('/users',verfiyJWT, getusers)
router.put('/update-user', verfiyJWT, UpdateCurrentUser)

router.put('/user-to-admin', verfiyJWT, updateUserToAdmin);

router.post('/add-to-orders', verfiyJWT, addToOrders);
router.get('/get-all-orders', verfiyJWT , getAllOrders);

export default router;