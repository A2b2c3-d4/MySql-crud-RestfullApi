const jwt = require("jsonwebtoken");

const authenticateJwt = async (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }
    try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
    }
    catch {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}

module.exports = authenticateJwt;