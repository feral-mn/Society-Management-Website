import {Router} from 'express';
import validate from '../middlewares/validate.middleware.js';
import {register, login, verify, profile, logout} from '../controllers/user.controller.js';
import authenticateJWT from '../middlewares/authenticate.middleware.js';


const userRouter = Router();

userRouter.post('/register', register)
userRouter.post('/login', authenticateJWT, login);
userRouter.post('/verify', verify )
userRouter.get('/profile', authenticateJWT, profile)
userRouter.get('/logout', authenticateJWT, logout); 

export default userRouter;