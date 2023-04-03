const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const User = require('../models/user')
const setCookie = require('../utils/features')

const createUser = async (req, res) => {

    const { name, email, password } = req.body

    try {

        const user = await User.findOne({ email });

        if (user) {
            return res.status(404).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        setCookie(newUser, res, 'Registered Successfully', 201)

    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}

const getMyProfile = async (req, res) => {

    try {

        res.status(201).json({
            success: true,
            user: req.user
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            error
        })
    }
}

const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist. Please check your email."
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(404).json({
                success: false,
                message: "Incorrect Credentials"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        setCookie(user, res, `Welcome ${user.name}!`, 200)

    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }

}

const logout = (req,res) => {

    try {
        
        res.cookie("token",'',{
            expires: new Date(Date.now()),
            sameSite: 'lax',
            secure: false 
        }).json({
            success: true,
            message: "Successfully logged out"
        })

    } catch (error) {
        res.json({
            success: false,
            error
        })
    }

}

module.exports = { createUser, getMyProfile, login,logout }