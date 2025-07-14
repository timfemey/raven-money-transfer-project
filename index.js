import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import bankAccountRoutes from './routes/bankAccountRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import webhookRoutes from './routes/webhookRoutes.js'
import transferRoutes from './routes/transferRoutes.js'

const app=express()
const PORT=process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/account',bankAccountRoutes)
app.use('/api/transactions',transactionRoutes)
app.use('/api/webhook',webhookRoutes)
app.use('/api/transfer',transferRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`)
})