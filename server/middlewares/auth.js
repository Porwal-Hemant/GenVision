// we will find userID for the userController with the help of JSON web token and it will be going to put in the request body 

import jwt from 'jsonwebtoken'

// This function is the authentication middleware that will be used in our userController to protect routes by verifying a user's JSON Web Token (JWT).


const userAuth = async( req ,  res , next ) =>{
    const {token} = req.headers ;  

        // Check if the token is missing
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }
        
    try {
        // Verify the token using the secret key
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        // token ->    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)   
        // I have created token with the help of userId and secret key 

        // IMP FOR CONCEPT ->   tokenDecode will contain only the payload (data) that was encoded inside the token.  ( here it is userID)

        // Check if the decoded token contains a user ID
        if (tokenDecode.id) {

            // Attach user ID to the request body        
            req.body.userId = tokenDecode.id; 
            // This step ensures that the authenticated user's ID is available in req.body for further processing in route handlers without requiring the frontend to send it explicitly.
            // when api will be called with the help of this auth.js it will send the authenticated user ID in the body of the request for further completion of api task 
            
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        // Call the next function in the stack
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }        

};
// Export the middleware
export default userAuth; 


/* 

Problem Without Token Verification
How do we remember that the user is logged in?

Just logging in once doesn't mean the server should remember it forever.
The server doesn't store user sessions (like in traditional session-based authentication).
Instead, we generate a JWT token and send it to the client.
What happens when the user makes further requests?

If there's no token verification, any user could send a request and claim to be logged in.
The server would have no way to verify if the user is actually authenticated or not.
hence when performing any function . we pass this token and secret key in order to obtain the id we used while constructing token  


*/


/* 

const userAuth = async( req ,  res , next )

This is an Express middleware function.
It will be used to protect routes by checking if a valid token exists before allowing access.
The function receives three parameters:
req → Incoming HTTP request
res → Response object
next → Calls the next middleware function if authentication is successful


req.headers contains the headers sent by the client (such as Postman, frontend application, or browser) when making an HTTP request.

*/

/* 

if (tokenDecode.id) ->
This ensures that the decoded token contains a valid id field.
If id is not present, it means the token is invalid or tampered with, and the user is not authorized.


*/