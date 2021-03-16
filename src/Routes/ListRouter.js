import express from 'express';
import listController from '../Controller/ListController';
import protectMiddleware from '../Middleware/ProtectRoutesMiddleware';

const listRouter = express.Router();

listRouter.post('/add', protectMiddleware.protectMiddleware, listController.createList);
listRouter.delete('/delete/:listId', protectMiddleware.protectMiddleware, listController.deleteList);

export default listRouter;
