import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import morgan from'morgan'
import connectDB from './db.js';
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';
import complaintRouter from './routes/complaint.route.js';
import announcmentRouter from './routes/announcment.route.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // for pauthenticateJWTarsing cookies
app.use(morgan('dev')) // for logging requests
connectDB();// Connect to MongoDB

app.use('/api/v1/user', userRouter); // User routes
app.use('/api/v1/admin', adminRouter); // Admin routes
app.use('/api/v1/complaint', complaintRouter); //Complaint routes
app.use('/api/v1/announcment', announcmentRouter); //Announcment routes


app.get('/test', (req, res) => {
    res.json({ message: "Hello from test endpoint! And It's working" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

