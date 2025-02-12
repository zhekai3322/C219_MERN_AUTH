require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware to handle CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://c219-mern-auth-frontend.onrender.com'], // Allow both local and production
  methods: ['GET', 'POST', 'DELETE'], // Specify allowed methods
  credentials: true  // Allow cookies if needed (e.g., for authentication)
}));

// middleware to parse JSON
app.use(express.json())

// log the requests
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
