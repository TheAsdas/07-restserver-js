import { RequestHandler, Response } from "express";
import { isValidObjectId } from "mongoose";
import { internalErrors, queryErrors, RequestError } from "../errors";
import { Category, Product, User } from "../models";
import { stringToBoolean } from "../helpers/utils";
import { productPopulateParams } from '../database/populateParams';

const collections = ["categories", "products", "roles", "usuarios"];

export const search = (): RequestHandler => async (req, res) => {
	let notOk;
	try {
		const { collection, query } = req.params;
		const showDeleted = stringToBoolean(req.query.showDeleted as string);
		const { COLLECTION_NOT_FOUND } = queryErrors;
		const { SEARCH_NOT_IMPLEMENTED } = internalErrors;

		if (!collections.includes(collection))
			throw RequestError(COLLECTION_NOT_FOUND);

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
				throw RequestError(SEARCH_NOT_IMPLEMENTED);
		}

		notOk = await notOk;
		if (notOk) throw notOk;
	} catch (error) {
		const { status = 500, message } = error as any;
		res.status(status).json({ msg: message });
	}
};

/**
 * @returns Retorna `Promise<iRequestError>` si acontece una excepción. En caso contrario,
 * retorna `Promise<undefined>`.
 */
const searchUsers = async (
	query: string,
	res: Response,
	showDeleted: boolean
) => {
	try {
		if (isValidObjectId(query)) {
			const user = await User.findById(query);
			res.json({ results: user ? [user] : [] });

			return;
		}
		const regex = new RegExp(query, "i");
		const users = await User.find({
			$or: [{ nombre: regex }, { correo: regex }],
			$and: [showDeleted ? {} : { estado: true }],
		});
		res.json({ results: users });
	} catch (error) {
		return RequestError([500, (error as any).message ?? "Algo salió mal."]);
	}
};

const searchCategories = async (
	query: string,
	res: Response,
	showDeleted: boolean
) => {
	try {
		if (isValidObjectId(query)) {
			const category = await Category.findById(query);
			res.json({ results: category ?? [] });
			return;
		}

		const regex = new RegExp(query, "i");
		const users = await Category.find({
			$or: [{ name: regex }],
			$and: [showDeleted ? {} : { state: true }],
		});

		res.json({ results: users });
	} catch (error) {
		return RequestError([500, (error as any).message ?? "Algo salió mal."]);
	}
};

const searchProducts = async (
	query: string,
	res: Response,
	showDeleted: boolean
) => {
	try {
		if (isValidObjectId(query)) {
			const product = await Product.findById(query);
			if (product) {
				res.json({ results: product ?? [] });
				return;
			}
		}

		const regex = new RegExp(query, "i");
		const products = await Product.find({
			$or: [{ name: regex },{category: query}],
			$and: [showDeleted ? {} : { state: true }],
		}).populate(productPopulateParams);

		res.json({ results: products });
	} catch (error) {
		return RequestError([500, (error as any).message ?? "Algo salió mal."]);
	}
};
