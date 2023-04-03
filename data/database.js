const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((c) => console.log(`Database connected successfully with ${c.connection.host}....!`))
        .catch((e) => console.log(e))
}

module.exports = connectDB;