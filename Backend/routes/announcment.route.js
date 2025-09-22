import {Router} from 'express';
import authenticateJWT from '../middlewares/authenticate.middleware.js';
import {register, get, update, deleteAnnouncment} from '../controllers/announcment.controller.js'
import authorizeRoles from '../middlewares/authorize.middleware.js';


const announcmentRouter = Router();

announcmentRouter.post('/register', authenticateJWT, register)
announcmentRouter.get('/get', authenticateJWT, get);
announcmentRouter.patch('/update',authenticateJWT, update)
announcmentRouter.delete('/delete/:id',authenticateJWT, authorizeRoles("admin"), deleteAnnouncment)


export default announcmentRouter;