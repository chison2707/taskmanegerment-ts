import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import mainV1Routes from "./api/v1/routes/index.route";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

database.connect();  // Connect to MongoDB

const app: Express = express()
const port: Number | String = process.env.PORT || 3000;

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
app.use(cors());

app.use(bodyParser.json());

mainV1Routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})