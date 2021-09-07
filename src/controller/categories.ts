import { RequestHandler } from "express";
import { queryErrors, RequestError } from "../errors";
import { Category, User } from "../models";
import { iRequestError } from "../errors/.d";
import {
	fullUrl,
	calculateNextAndLastUrl,
	normalizePagination,
} from "../utils/util";

export const create: RequestHandler = async (req, res) => {
	try {
		console.log(req.body);

		let { name } = req.body;
		name = name.toUpperCase();

		const { ALREADY_EXISTS } = queryErrors;

		if (await Category.exists({ name })) throw RequestError(ALREADY_EXISTS);

		///@ts-ignore
		const category = new Category({ name, createdBy: req.user._id });

		await category.save();

		res.json({
			msg: `La categoria "${name}" fue creada correctamente.`,
			///@ts-ignore
			madeBy: req.user,
			category,
		});
	} catch (error) {
		const { status = 500, message } = error as iRequestError;
		console.log(error);
		res.status(status).json({ msg: message });
	}
};

export const getOne: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const category = await Category.findOne({ _id: id, state: true }).populate(
			"createdBy"
		);
		//await User.populate(category, "createdBy");

		res.json({ category });
	} catch (error) {
		const { message } = error as Error;
		res.status(500).json({ msg: message });
	}
};

export const getMany: RequestHandler = async (req, res) => {
	try {
		const { offset, limit } = normalizePagination({
			offset: req.query.offset,
			limit: req.query.limit,
		});

		const query = { state: true };

		const [total, categories] = await Promise.all([
			Category.count(query),
			Category.find(query)
				.skip(+offset)
				.limit(+limit)
				.populate("createdBy"),
		]);

		const { next, last } = calculateNextAndLastUrl({
			offset: +offset,
			limit: +limit,
			total,
			url: fullUrl(req) + "/api/categorias",
		});

		res.json({ next, last, total, categories });
	} catch (error) {
		const { message } = error as Error;
		res.status(500).json({ msg: message });
	}
};

export const remove: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const category = await Category.findOne({ _id: id, state: true });
		const { DOES_NOT_EXIST } = queryErrors;

		if (!category) throw RequestError(DOES_NOT_EXIST);

		category.state = false;
		category.save();

		res.json({ msg: "Borramos la categoría satisfactoriamente.", category });
	} catch (error) {
		const { message: msg, status: code } = error as iRequestError;
		res.status(code).json({ msg });
	}
};

export const edit: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const { DOES_NOT_EXIST } = queryErrors;
		const category = await Category.findOne({
			_id: id as string,
			state: true,
		});

		if (!category) throw RequestError(DOES_NOT_EXIST);

		category.name = name;
		await category.save();

		res.json({
			msg: "Modificamos la categoría exitosamente.",
			category: category,
		});
	} catch (error) {
		const { status = 500, message } = error as iRequestError;
		res.status(status).json({ msg: message });
	}
};
