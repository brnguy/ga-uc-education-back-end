import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'
import { router as moduleRouter } from './routes/modules.js'
import { router as lessonsRouter } from './routes/lessons.js'
import { router as quizRouter } from './routes/quizzes.js'
import { router as entrepreneurRouter } from './routes/entrepreneur.js'

import('./config/database.js')

const app = express()

app.use(cors({
  origin:  "https://uceducation.herokuapp.com/", // <-- location of the react app were connecting to
  credentials: true,
}))
app.use(logger('dev'))
app.use(express.json())

app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/modules', moduleRouter)
app.use('/lessons', lessonsRouter)
app.use('/quiz', quizRouter)
app.use('/entrepreneur', entrepreneurRouter)

app.use(function (req, res, next) {
  res.status(404).json({ err: "Not found" })
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }
