import express from 'express';
import productController from '../Controller/ProductCotroller';
import protectMiddleware from '../Middleware/ProtectRoutesMiddleware';

const productRouter = express.Router();
productRouter.post('/add', protectMiddleware.protectMiddleware,productController.createProduct);
productRouter.put('/update/:id', protectMiddleware.protectMiddleware, productController.setProduct);

export default productRouter;
