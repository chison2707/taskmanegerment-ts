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

    res.json(tasks);
});

app.get('/tasks/detail/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })

    res.json(task);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})