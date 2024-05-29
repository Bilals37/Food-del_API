import jwt from 'jsonwebtoken';

// Middleware to authenticate the user
const authmiddleware = async (req, res, next) => {
    // Extract token from the request headers
    const { token } = req.headers;

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, please login again" });
    }

    try {
        // Verify the token using the JWT_SECRET
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the userId from the decoded token to the request body
        req.body.userId = token_decode.id;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        // Send an error response if token verification fails
        res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
}

export default authmiddleware;
