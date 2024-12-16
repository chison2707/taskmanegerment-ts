import { Express } from "express";
import { taskRouter } from "./task.route";

const mainV1Routes = (app: Express): void => {

    const version = "/api/v1";

    app.use(version + '/tasks', taskRouter);

}

export default mainV1Routes;