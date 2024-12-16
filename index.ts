import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import Task from "./models/task.model";

dotenv.config();

database.connect();  // Connect to MongoDB

const app: Express = express()
const port: Number | String = process.env.PORT || 3000;

app.get('/tasks', async (req: Request, res: Response) => {
    const tasks = await Task.find({
        deleted: false
    })

    console.log(tasks)
    res.json(tasks);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})