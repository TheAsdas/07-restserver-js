"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullFreeze = void 0;
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
//# sourceMappingURL=util.js.map