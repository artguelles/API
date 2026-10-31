console.clear()
console.log(`Iniciando API de StreamView`)

require('dotenv').config()
const { PORT , MONGO_URI } = process.env

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { middleware404, middleware500 } = require('./middlewares')
const { router } = require('./router')


const conectar = async ()=>
    await mongoose.connect(MONGO_URI)
    .then( res => console.log(`Conectado a Mongo`) )
    .catch( err => console.log(err) )
conectar()


const app = express()

    app.use(cors())
    app.use(express.urlencoded({extended : false}))
    app.use(express.json())


    app.use('/streamview' ,  router)

    app.use(middleware404)
    app.use(middleware500)


app.listen( PORT , ()=>{
    console.log(`Iniciando Express en localhost:${PORT}`)
})