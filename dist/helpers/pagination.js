"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePagination = exports.fullUrl = exports.calculateNextAndLastUrl = void 0;
const calculateNextAndLastUrl = (data) => {
    const { offset, limit, url, total } = data;
    const urls = {};
    if (limit + offset < total)
        urls.next = `${url}?offset=${offset + limit}&limit=${limit}`;
    if (offset !== 0)
        urls.last = `${url}?offset=${offset - limit < 0 ? 0 : offset - limit}&limit=${limit}`;
    return urls;
};
exports.calculateNextAndLastUrl = calculateNextAndLastUrl;
const fullUrl = (req) => req.protocol + "://" + req.get("host");
exports.fullUrl = fullUrl;
const normalizePagination = (data) => {
    let { offset, limit } = data;
    if (isNaN(Number(offset)) || Number(offset) < 0)
        offset = 0;
    else
        offset = Number(offset);
    if (isNaN(Number(limit)) || Number(limit) < 0)
        limit = 5;
    else
        limit = Number(limit);
    return { limit, offset };
};
exports.normalizePagination = normalizePagination;
//# sourceMappingURL=pagination.js.map