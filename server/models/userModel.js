import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  // new user cannot be stored with the same email-ID 
    password: { type: String, required: true },
    creditBalance: { type: Number, default: 5 },
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)  
/* 

Purpose: Ensures that the model is not redefined multiple times.
How it works:
mongoose.models.user → Checks if the User model already exists.
If it exists, use the existing model.
Otherwise, create a new model using mongoose.model("user", userSchema).
Why is this needed?
In Next.js (or when using hot-reloading), if we directly use mongoose.model("user", userSchema), it may try to redefine the model, causing errors.
Checking mongoose.models.user prevents model re-registration issues.

*/

export default userModel;


