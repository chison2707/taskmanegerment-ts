import { Request, Response } from 'express';
import Task from "../models/task.model";
import paginationHelper from '../../../helper/pagination';

export const index = async (req: Request, res: Response) => {
    // find
    interface Find {
        deleted: boolean,
        status?: string
    }
    const find: Find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status.toString();
    }

    // pagination
    const countRecords = await Task.countDocuments(find);
    let objPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 2
        },
        req.query,
        countRecords
    );
    // end pagination

    // sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }

    const tasks = await Task.find(find).sort(sort).limit(objPagination.limitItems).skip(objPagination.skip);

    res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })

    res.json(task);
}