"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modify = exports.create = exports.remove = exports.getOne = exports.getMany = void 0;
const pagination_1 = require("../helpers/pagination");
const models_1 = require("../models");
const errors_1 = require("../errors");
const populateParams_1 = require("../database/populateParams");
const getMany = () => async (req, res) => {
    try {
        const { offset, limit } = (0, pagination_1.normalizePagination)({
            offset: req.query.offset,
            limit: req.query.limit,
        });
        const query = { state: true };
        const [total, products] = await Promise.all([
            models_1.Product.count(query),
            models_1.Product.find(query)
                .skip(+offset)
                .limit(+limit)
                .populate(populateParams_1.productPopulateParams),
        ]);
        const { next, last } = (0, pagination_1.calculateNextAndLastUrl)({
            offset: +offset,
            limit: +limit,
            total,
            url: (0, pagination_1.fullUrl)(req) + "/api/productos",
        });
        res.json({ next, last, total, products });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.getMany = getMany;
const getOne = () => async (req, res) => {
    try {
        const { id } = req.params;
        const product = await models_1.Product.findOne({ _id: id, state: true }).populate(populateParams_1.productPopulateParams);
        res.json({ product });
    }
    catch (error) {
        const { message } = error;
        res.status(500).json({ msg: message });
    }
};
exports.getOne = getOne;
const remove = () => async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user._id;
        const product = await models_1.Product.findOne({ _id: id, state: true });
        product.state = false;
        product.editedBy = userId;
        await product.save();
        res.json({ msg: "Eliminamos el producto.", product });
    }
    catch (error) {
        const { message } = error;
        res.status(500).json({ msg: message });
    }
};
exports.remove = remove;
const create = () => async (req, res) => {
    try {
        const _a = req.body, { createdBy, editedBy, _id, __v } = _a, data = __rest(_a, ["createdBy", "editedBy", "_id", "__v"]);
        const product = new models_1.Product(Object.assign(Object.assign({}, data), { createdBy: req.user._id }));
        await product.save();
        res.json({ msg: "Creamos el producto exitosamente.", category: product });
    }
    catch (error) {
        const { status = 500, message } = error;
        res.status(status).json({ msg: message });
    }
};
exports.create = create;
const modify = () => async (req, res) => {
    try {
        const { id } = req.params;
        const _a = req.body, { _id, _v, state, createdBy } = _a, data = __rest(_a, ["_id", "_v", "state", "createdBy"]);
        const { category, name } = data;
        const { INVALID_REFERENCE, ALREADY_EXISTS } = errors_1.queryErrors;
        if (category &&
            !(await models_1.Category.exists({ _id: category, state: true })))
            throw (0, errors_1.RequestError)(INVALID_REFERENCE);
        if (name && (await models_1.Product.exists({ name })))
            throw (0, errors_1.RequestError)(ALREADY_EXISTS);
        data.editedBy = req.user._id;
        data.category = category;
        const product = await models_1.Product.findByIdAndUpdate(id, data).populate(populateParams_1.productPopulateParams);
        res.json({ msg: "Modificamos el producto exitosamente.", product });
    }
    catch (error) {
        const { status = 500, message } = error;
        res.status(status).json({ msg: message });
    }
};
exports.modify = modify;
//# sourceMappingURL=products.js.map