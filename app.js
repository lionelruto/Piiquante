require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')

const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')
const likeRoutes = require('./routes/likes')
const rateLimiter = require('./middleware/rate-limit')

mongoose.connect('mongodb+srv://' + process.env.DB_LOGIN + ':' + process.env.DB_PASSWORD + '@' +
process.env.DB + '.wd2vi.mongodb.net/' + process.env.DB + '?retryWrites=true&w=majority',
    {useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use(cors())

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', rateLimiter, userRoutes)
app.use('/api/sauces', likeRoutes)

app.use(helmet())

module.exports = app