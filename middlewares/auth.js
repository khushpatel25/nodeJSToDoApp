const jwt = require("jsonwebtoken");

const User = require('../models/user');

const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;

    try {

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Please login first"
            })
        }

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded._id)
            next();
           
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}

module.exports = isAuthenticated