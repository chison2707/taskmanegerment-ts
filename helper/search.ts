interface ObjSearch {
    keyword: string,
    regex?: RegExp
}

const searchHelper = (query) => {
    let objSearch: ObjSearch = {
        keyword: ""
    }
    if (query.keyword) {
        objSearch.keyword = query.keyword;

        const regex = new RegExp(objSearch.keyword, "i")
        objSearch.regex = regex;
    }
    return objSearch;
}

export default searchHelper;