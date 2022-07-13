const mongoose = require('mongoose')
URL = "mongodb://127.0.0.1:27017/task-manager-api"

mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})
