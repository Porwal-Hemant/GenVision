import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay';
import transactionModel from "../models/transactionModel.js";

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, user: { name: user.name } })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
// only email and password is needed
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }
        // when the user has been existed but now we have to check whether the password entered by the user is correct or not 
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            //  We generate a JWT (JSON Web Token) to authenticate users after they log in.
            //  Instead of storing sessions on the server, we give the client a token that they can send with each request to verify their identity.
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token, user: { name: user.name } })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API Controller function to get user available credits data
const userCredits = async (req, res) => {
    try {

        const { userId } = req.body
        // we will provide userId in the body with the help of auth.js middleware  

        // Fetching userdata using userId
        const user = await userModel.findById(userId)
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// razorpay gateway initialize
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Payment API to add credits
const paymentRazorpay = async (req, res) => {
    try {

        const { userId, planId } = req.body
        // userId will going to be taken with the help of authUser middleware 

        const userData = await userModel.findById(userId)

        // checking for planId and userdata
        if (!userData || !planId) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        let credits, plan, amount, date

        // Switch Cases for different plans
        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
                return res.json({ success: false, message: 'plan not found' })
        }

        date = Date.now()

        // Creating Transaction Data
        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        }

        // Saving Transaction Data to Database
        const newTransaction = await transactionModel.create(transactionData)

        // Creating options to create razorpay Order
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        // Creating razorpay Order
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API Controller function to verify razorpay payment
const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body;

        // Fetching order data from razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        // razorpayInstance.orders.fetch(razorpay_order_id) is making an API call to Razorpay to fetch details about this specific order.

        // Checking for payment status
        if (orderInfo.status === 'paid') {
            // we will find transaction data for this order 
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                // if the payment is already verified that means the transaction is already failed 
                return res.json({ success: false, message: 'Payment Failed' })
            }

            // Adding Credits in user data
            const userData = await userModel.findById(transactionData.userId)
            // transactionData.userId corresponds to the user who have done the payment and now we have to find other data about this user from the userModel  
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, { creditBalance })

            // Marking the payment true 
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ success: true, message: "Credits Added" });
        }
        else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { registerUser, loginUser , userCredits ,  paymentRazorpay , verifyRazorpay}






/* 

some explaination 

const salt = await bcrypt.genSalt(10);
exp->
Without salt, identical passwords would always produce the same hash, making it easier for attackers to detect common passwords.
Salting ensures that even if two users have the same password, their hashed passwords will be different.

const hashedPassword = await bcrypt.hash(password, salt)
exp-> 
bcrypt.hash(password, salt) → Uses the given password and the generated salt to create a secure hashed password.
The function repeatedly hashes the input (10 times in this case) to make it computationally expensive for an attacker to brute-force.
await? → Since password hashing is a time-consuming operation, we use await to wait for it to complete before moving forward.


After a user logs in, the server generates a JWT.
The JWT is sent back to the client (browser/mobile app).
The client includes the JWT in subsequent requests to prove authentication.
The server can verify the token and grant access to protected routes.

*/

/* 
   
code for showing correct implementation of jwt token  


// ===================== 🔹 User Login & JWT Generation =====================
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // We generate a JWT (JSON Web Token) to authenticate users after they log in. Instead of storing sessions on the server, we give the client a token that they can send with each request to verify their identity.
        // Authentication → When a user logs in, we generate this token so they don't need to enter their credentials again for every request.
        //Stateless Authorization → The server does not need to store user sessions, making it scalable.
        //Security → Ensures only authorized users can access protected routes (e.g., user dashboard, payment, etc.).
        //Expiry Time (expiresIn: "1h") → Prevents long-term token misuse by setting an expiration time.


        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
  
*/