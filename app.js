const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const cors = require('cors')

const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task');

const app = express();
dotenv.config({
    path: './data/config.env'
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'https://todolistreactj.netlify.app/',
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
}))

app.use('/api/v1/users',userRoutes)
app.use('/api/v1/task',taskRoutes)

app.get('/', (req, res) => {
    res.send("Working seamlessly")
})

module.exports = app;