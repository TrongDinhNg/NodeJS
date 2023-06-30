import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import cors from "cors";

let app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

configViewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT;

app.listen(port, () => {
    console.log("Server is running on port: ", port);
});
