"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePagination = exports.fullUrl = exports.calculateNextAndLastUrl = exports.fullFreeze = void 0;
const fullFreeze = (obj) => {
    Object.keys(obj).forEach((key) => {
        const current = obj[key];
        const objects = hasAnyObjects(current);
        if (objects)
            objects.forEach((obj) => (0, exports.fullFreeze)(obj));
    });
    Object.freeze(obj);
};
exports.fullFreeze = fullFreeze;
const hasAnyObjects = (obj) => {
    const foundObjects = [];
    Object.keys(obj).forEach((key) => {
        const current = obj[key];
        typeof current === "object" && foundObjects.push(current);
    });
    return foundObjects.length === 0 ? false : foundObjects;
};
const calculateNextAndLastUrl = ({ offset, limit, total, url, }) => {
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
const normalizePagination = ({ limit, offset, }) => {
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
//# sourceMappingURL=util.js.map