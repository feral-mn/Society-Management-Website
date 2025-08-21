import {Router} from 'express';
import validate from '../middlewares/validate.middleware.js';
import {register, login, verify, profile, logout} from '../controllers/admin.controller.js';
import authenticateJWT from '../middlewares/authenticate.middleware.js';


const adminRouter = Router();

adminRouter.post('/register', validate, register)
adminRouter.post('/login', validate, authenticateJWT, login);
adminRouter.post('/verify', verify )
adminRouter.get('/profile', authenticateJWT, profile)
adminRouter.get('/logout', authenticateJWT, logout); 

export default adminRouter;