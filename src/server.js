import express from "express";
import bodyParser from "body-parser";
import configViewEngine from './config/viewEngine.js'
import initWebRoutes from './route/web.js'
import 'dotenv/config';

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

configViewEngine(app)
initWebRoutes(app)

let port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on port: ', port)
})