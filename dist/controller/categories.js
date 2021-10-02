"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.remove = exports.getMany = exports.getOne = exports.create = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const pagination_1 = require("../helpers/pagination");
const create = async (req, res) => {
    try {
        console.log(req.body);
        let { name } = req.body;
        name = name.toUpperCase();
        const { ALREADY_EXISTS } = errors_1.queryErrors;
        if (await models_1.Category.exists({ name }))
            throw (0, errors_1.RequestError)(ALREADY_EXISTS);
        const category = new models_1.Category({ name, createdBy: req.user._id });
        await category.save();
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
};
exports.create = create;
const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await models_1.Category.findOne({ _id: id, state: true }).populate("createdBy", "nombre");
        res.json({ category });
    }
    catch (error) {
        const { message } = error;
        res.status(500).json({ msg: message });
    }
};
exports.getOne = getOne;
const getMany = async (req, res) => {
    try {
        const { offset, limit } = (0, pagination_1.normalizePagination)({
            offset: req.query.offset,
            limit: req.query.limit,
        });
        const query = { state: true };
        const [total, categories] = await Promise.all([
            models_1.Category.count(query),
            models_1.Category.find(query)
                .skip(+offset)
                .limit(+limit)
                .populate("createdBy", "nombre"),
        ]);
        const { next, last } = (0, pagination_1.calculateNextAndLastUrl)({
            offset: +offset,
            limit: +limit,
            total,
            url: (0, pagination_1.fullUrl)(req) + "/api/categorias",
        });
        res.json({ next, last, total, categories });
    }
    catch (error) {
        const { message } = error;
        res.status(500).json({ msg: message });
    }
};
exports.getMany = getMany;
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await models_1.Category.findOne({ _id: id, state: true });
        category.state = false;
        category.save();
        res.json({ msg: "Borramos la categoría satisfactoriamente.", category });
    }
    catch (error) {
        console.error(error);
        const { message, status = 500 } = error;
        res.status(status).json({ msg: message });
    }
};
exports.remove = remove;
const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await models_1.Category.findOne({
            _id: id,
            state: true,
        });
        category.name = name.toUpperCase();
        category.editedBy = req.user._id;
        await category.save();
        res.json({
            msg: "Modificamos la categoría exitosamente.",
            category: category,
        });
    }
    catch (error) {
        const { status = 500, message } = error;
        res.status(status).json({ msg: message });
    }
};
exports.edit = edit;
//# sourceMappingURL=categories.js.map