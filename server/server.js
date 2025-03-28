import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
const PORT =  process.env.PORT || 4000 

const app = express();

// Intialize Middlewares
app.use(express.json())
app.use(cors())
await connectDB()   
// await keyword is used because we have to wait till the database has not been connected with the MONGO-DB 

// API routes
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/', (req,res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));


// http://localhost:4000/api/user/register

// RESTful APIs (Representational State Transfer APIs) are web services that follow the REST architecture to allow communication between a client (frontend, mobile app, etc.) and a server (backend, database, etc.).
/* 
// backlend is nothing it is just the communication with the frontend from database with the help of APIs ( this whole process is given the name of backend ( forming controllers , models , routes etc))
Any route inside userRouter will now be prefixed with /api/user.

when a request like POST /api/user/register is made, Express:

Recognizes /api/user is handled by userRouter.
Looks inside userRouter for /register.
Executes registerUser function.


*/


