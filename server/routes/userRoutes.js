import express from 'express'
import authUser from '../middlewares/auth.js'
import {
    userCredits,
    paymentRazorpay,
    verifyRazorpay,
    registerUser,
    loginUser,
} from '../controllers/userController.js'


const userRouter = express.Router()
// express.Router() creates a mini router that we can use to define multiple routes related to users.

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', authUser, userCredits)
userRouter.post('/pay-razor', authUser, paymentRazorpay)
userRouter.post('/verify-razor', verifyRazorpay)

export default userRouter
// after this we will add our userRouter in express app  ( server.js file )



