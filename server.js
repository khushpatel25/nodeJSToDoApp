const app = require('./app')
const connectDB = require('./data/database')

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT} `)
})

