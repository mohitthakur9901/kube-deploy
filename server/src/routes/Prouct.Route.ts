import express from 'express';
import {createProduct,deleteProduct,
    getAllProduct,getProduct,updateProuct
} from '../controller/Product'
import { upload } from '../lib/Multer';
import { verfiyJWT } from '../middlewear/verify';
const router = express.Router();

router.route('/getAllProduct').get(getAllProduct);
router.use(verfiyJWT);
router.route('/createProduct').post(upload.single('productImage'),createProduct);
router.route('/deleteProduct/:id').delete(deleteProduct);
router.route('/updateProduct/:id').put(upload.single('productImage'), updateProuct);
router.route('/getProduct/:id').get(getProduct);



export default router;

