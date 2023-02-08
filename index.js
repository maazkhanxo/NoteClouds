const express = require('express');
const connectionToMongo = require('./db');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5000
connectionToMongo()

app.use(cors())
app.use(express.json())

app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, () => {
    console.log(`NoteCloud app listening at ${PORT}`)
  })