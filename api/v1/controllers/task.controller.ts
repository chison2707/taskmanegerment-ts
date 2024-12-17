import { Request, Response } from 'express';
import Task from "../models/task.model";
import paginationHelper from '../../../helper/pagination';
import searchHelper from '../../../helper/search';

export const index = async (req: Request, res: Response) => {
    // find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    const find: Find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status.toString();
    }

    // search
    const objSearch = searchHelper(req.query);
    if (objSearch.keyword) {
        find.title = objSearch.regex;
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

export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Task.updateOne({
            _id: id
        }, {
            status: status
        });

        res.json({
            code: 200,
            message: "Update status thành công"
        });
    } catch (error) {
        res.json({
            code: 404,
            message: "Không tồn tại!"
        });
    }
}