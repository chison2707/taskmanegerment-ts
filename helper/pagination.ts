interface ObjPagination {
    currentPage: number,
    limitItems: number,
    skip?: number,
    totalPage?: number
}

const paginationHelper = (objPagination: ObjPagination, query: Record<string, any>, countRecords: number): ObjPagination => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }

    if (query.limit) {
        objPagination.limitItems = parseInt(query.limit);
    }

    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;

    const totalPage = Math.ceil(countRecords / objPagination.limitItems);
    objPagination.totalPage = totalPage;

    return objPagination;
}

export default paginationHelper;