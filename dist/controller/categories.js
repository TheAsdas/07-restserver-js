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
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.remove = exports.getMany = exports.getOne = exports.create = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const util_1 = require("../helpers/util");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let { name } = req.body;
        name = name.toUpperCase();
        const { ALREADY_EXISTS } = errors_1.queryErrors;
        if (yield models_1.Category.exists({ name }))
            throw (0, errors_1.RequestError)(ALREADY_EXISTS);
        const category = new models_1.Category({ name, createdBy: req.user._id });
        yield category.save();
        res.json({
            msg: `La categoria "${name}" fue creada correctamente.`,
            madeBy: req.user,
            category,
        });
    }
    catch (error) {
        const { status = 500, message } = error;
        console.log(error);
        res.status(status).json({ msg: message });
    }
});
exports.create = create;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield models_1.Category.findOne({ _id: id, state: true }).populate("createdBy", "nombre");
        res.json({ category });
    }
    catch (error) {
        const { message } = error;
        res.status(500).json({ msg: message });
    }
});
exports.getOne = getOne;
const getMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offset, limit } = (0, util_1.normalizePagination)({
            offset: req.query.offset,
            limit: req.query.limit,
        });
        const query = { state: true };
        const [total, categories] = yield Promise.all([
            models_1.Category.count(query),
            models_1.Category.find(query)
                .skip(+offset)
                .limit(+limit)
                .populate("createdBy", "nombre"),
        ]);
        const { next, last } = (0, util_1.calculateNextAndLastUrl)({
            offset: +offset,
            limit: +limit,
            total,
            url: (0, util_1.fullUrl)(req) + "/api/categorias",
        });
        res.json({ next, last, total, categories });
    }
    catch (error) {
        const { message } = error;
        res.status(500).json({ msg: message });
    }
});
exports.getMany = getMany;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield models_1.Category.findOne({ _id: id, state: true });
        category.state = false;
        category.save();
        res.json({ msg: "Borramos la categoría satisfactoriamente.", category });
    }
    catch (error) {
        console.error(error);
        const { message, status = 500 } = error;
        res.status(status).json({ msg: message });
    }
});
exports.remove = remove;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = yield models_1.Category.findOne({
            _id: id,
            state: true,
        });
        category.name = name.toUpperCase();
        category.editedBy = req.user._id;
        yield category.save();
        res.json({
            msg: "Modificamos la categoría exitosamente.",
            category: category,
        });
    }
    catch (error) {
        const { status = 500, message } = error;
        res.status(status).json({ msg: message });
    }
});
exports.edit = edit;
//# sourceMappingURL=categories.js.map