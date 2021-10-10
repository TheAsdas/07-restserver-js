"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPopulateParams = void 0;
exports.productPopulateParams = [
    { path: "editedBy", select: "nombre", strictPopulate: false },
    { path: "createdBy", select: "nombre" },
    { path: "category", select: "name" },
];
//# sourceMappingURL=populateParams.js.map