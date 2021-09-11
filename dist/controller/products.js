"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.modify = exports.create = exports.update = exports.remove = exports.getOne = exports.getMany = void 0;
const util_1 = require("../helpers/util");
const models_1 = require("../models");
const populateParams = [
    { path: "editedBy", select: "nombre", strictPopulate: false },
    { path: "createdBy", select: "nombre" },
    { path: "category", select: "name" },
];
const getMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset, limit } = util_1.normalizePagination({
            offset: req.query.offset,
            limit: req.query.limit,
        });
        const query = { state: true };
        const [total, products] = yield Promise.all([
            models_1.Product.count(query),
            models_1.Product.find(query)
                .skip(+offset)
                .limit(+limit)
                .populate(populateParams),
        ]);
        const { next, last } = util_1.calculateNextAndLastUrl({
            offset: +offset,
            limit: +limit,
            total,
            url: util_1.fullUrl(req) + "/api/productos",
        });
        res.json({ next, last, total, products });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.getMany = getMany;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield models_1.Product.findOne({ _id: id, state: true }).populate(populateParams);
        res.json({ product });
    }
    catch (error) {
        const { message } = error;
        res.status(500).json({ msg: message });
    }
});
exports.getOne = getOne;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req.user._id;
        const product = yield models_1.Product.findOne({ _id: id, state: true });
        product.state = false;
        product.editedBy = userId;
        yield product.save();
        res.json({ msg: "Eliminamos el producto.", product });
    }
    catch (error) {
        const { message } = error;
        res.status(500).json({ msg: message });
    }
});
exports.remove = remove;
const update = (req, res) => {
    res.json({ msg: "Te reviento." });
};
exports.update = update;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { createdBy, editedBy, _id, __v } = _a, data = __rest(_a, ["createdBy", "editedBy", "_id", "__v"]);
        const product = new models_1.Product(Object.assign(Object.assign({}, data), { createdBy: req.user._id }));
        yield product.save();
        res.json({ msg: "Creamos el producto exitósamente.", category: product });
    }
    catch (error) {
        const { status = 500, message } = error;
        res.status(status).json({ msg: message });
    }
});
exports.create = create;
const modify = (req, res) => {
    res.json({ msg: "Te reviento." });
};
exports.modify = modify;
//# sourceMappingURL=products.js.map