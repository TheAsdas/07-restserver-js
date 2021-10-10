"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
const models_1 = require("../models");
const utils_1 = require("../helpers/utils");
const populateParams_1 = require("../database/populateParams");
const collections = ["categories", "products", "roles", "usuarios"];
const search = () => async (req, res) => {
    let notOk;
    try {
        const { collection, query } = req.params;
        const showDeleted = (0, utils_1.stringToBoolean)(req.query.showDeleted);
        const { COLLECTION_NOT_FOUND } = errors_1.queryErrors;
        const { SEARCH_NOT_IMPLEMENTED } = errors_1.internalErrors;
        if (!collections.includes(collection))
            throw (0, errors_1.RequestError)(COLLECTION_NOT_FOUND);
        switch (collection) {
            case "categories":
                notOk = searchCategories(query, res, showDeleted);
                break;
            case "products":
                notOk = searchProducts(query, res, showDeleted);
                break;
            case "usuarios":
                notOk = searchUsers(query, res, showDeleted);
                break;
            default:
                throw (0, errors_1.RequestError)(SEARCH_NOT_IMPLEMENTED);
        }
        notOk = await notOk;
        if (notOk)
            throw notOk;
    }
    catch (error) {
        const { status = 500, message } = error;
        res.status(status).json({ msg: message });
    }
};
exports.search = search;
const searchUsers = async (query, res, showDeleted) => {
    var _a;
    try {
        if ((0, mongoose_1.isValidObjectId)(query)) {
            const user = await models_1.User.findById(query);
            res.json({ results: user ? [user] : [] });
            return;
        }
        const regex = new RegExp(query, "i");
        const users = await models_1.User.find({
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [showDeleted ? {} : { estado: true }],
        });
        res.json({ results: users });
    }
    catch (error) {
        return (0, errors_1.RequestError)([500, (_a = error.message) !== null && _a !== void 0 ? _a : "Algo salió mal."]);
    }
};
const searchCategories = async (query, res, showDeleted) => {
    var _a;
    try {
        if ((0, mongoose_1.isValidObjectId)(query)) {
            const category = await models_1.Category.findById(query);
            res.json({ results: category !== null && category !== void 0 ? category : [] });
            return;
        }
        const regex = new RegExp(query, "i");
        const users = await models_1.Category.find({
            $or: [{ name: regex }],
            $and: [showDeleted ? {} : { state: true }],
        });
        res.json({ results: users });
    }
    catch (error) {
        return (0, errors_1.RequestError)([500, (_a = error.message) !== null && _a !== void 0 ? _a : "Algo salió mal."]);
    }
};
const searchProducts = async (query, res, showDeleted) => {
    var _a;
    try {
        if ((0, mongoose_1.isValidObjectId)(query)) {
            const product = await models_1.Product.findById(query);
            if (product) {
                res.json({ results: product !== null && product !== void 0 ? product : [] });
                return;
            }
        }
        const regex = new RegExp(query, "i");
        const products = await models_1.Product.find({
            $or: [{ name: regex }, { category: query }],
            $and: [showDeleted ? {} : { state: true }],
        }).populate(populateParams_1.productPopulateParams);
        res.json({ results: products });
    }
    catch (error) {
        return (0, errors_1.RequestError)([500, (_a = error.message) !== null && _a !== void 0 ? _a : "Algo salió mal."]);
    }
};
//# sourceMappingURL=search.js.map