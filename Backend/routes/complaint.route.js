import {Router} from 'express';
import authenticateJWT from '../middlewares/authenticate.middleware.js';
import {register, get, getAll, update} from '../controllers/complaint.controller.js'

const complaintRouter = Router();

complaintRouter.post('/register', authenticateJWT, register)
complaintRouter.get('/get', authenticateJWT, get);
complaintRouter.get('/getAll', authenticateJWT, getAll)
complaintRouter.patch('/update',authenticateJWT, update)

export default complaintRouter;