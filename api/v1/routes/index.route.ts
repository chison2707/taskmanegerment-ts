import { Express } from "express";
import { taskRouter } from "./task.route";
import { userRouter } from "./user.route";

import * as authMiddleware from "../middlewares/auth.middleware";

const mainV1Routes = (app: Express): void => {

    const version = "/api/v1";

    app.use(version + '/tasks', authMiddleware.requireAuth, taskRouter);
    app.use(version + '/users', userRouter);

}

export default mainV1Routes;