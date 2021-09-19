import { RequestHandler } from "express";
import { queryErrors, RequestError } from "../errors";
import { Category } from "../models";
import { iRequestError } from "../errors/.d";
import {
	fullUrl,
	calculateNextAndLastUrl,
	normalizePagination,
} from "../helpers/pagination";

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
			"createdBy",
			"nombre"
		);

		res.json({ category });
	} catch (error) {
		const { message } = error as Error;
		res.status(500).json({ msg: message });
	}
};

export const getMany: RequestHandler = async (req, res) => {
	try {
		const { offset, limit } = normalizePagination({
			offset: req.query.offset as string,
			limit: req.query.limit as string,
		});

		const query = { state: true };

		const [total, categories] = await Promise.all([
			Category.count(query),
			Category.find(query)
				.skip(+offset)
				.limit(+limit)
				.populate("createdBy", "nombre"),
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

		category!.state = false;
		category!.save();

		res.json({ msg: "Borramos la categoría satisfactoriamente.", category });
	} catch (error) {
		console.error(error);
		const { message, status = 500 } = error as iRequestError;
		res.status(status).json({ msg: message });
	}
};

export const edit: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const category = await Category.findOne({
			_id: id as string,
			state: true,
		});

		category!.name = name.toUpperCase();
		category!.editedBy = (req as any).user._id;
		await category!.save();

		res.json({
			msg: "Modificamos la categoría exitosamente.",
			category: category,
		});
	} catch (error) {
		const { status = 500, message } = error as iRequestError;
		res.status(status).json({ msg: message });
	}
};
