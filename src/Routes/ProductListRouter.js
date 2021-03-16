import express from 'express';
import prouctListController from '../Controller/ProductListController';
import protectRoutersMiddleware from '../Middleware/ProtectRoutesMiddleware';

const productListRouter = express();
productListRouter.post('/add', protectRoutersMiddleware.protectMiddleware, prouctListController.createProductList);
productListRouter.put('/update/:id', protectRoutersMiddleware.protectMiddleware, prouctListController.setProductList);
productListRouter.get('/report', protectRoutersMiddleware.protectMiddleware, prouctListController.getProductListReport);
export default productListRouter;
