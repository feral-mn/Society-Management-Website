import {Router} from 'express';
import authenticateJWT from '../middlewares/authenticate.middleware.js';
import {register, get, update} from '../controllers/announcment.controller.js'

const announcmentRouter = Router();

announcmentRouter.post('/register', authenticateJWT, register)
announcmentRouter.get('/get', authenticateJWT, get);
announcmentRouter.patch('/update',authenticateJWT, update)

export default announcmentRouter;