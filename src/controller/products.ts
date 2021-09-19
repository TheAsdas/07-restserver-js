import {RequestHandler} from "express";
import {iRequestError} from "../errors/.d";
import {calculateNextAndLastUrl, fullUrl, normalizePagination,} from "../helpers/pagination";
import {Category, Product, User} from "../models";
import {models} from "../models/.d";
import {queryErrors, RequestError} from "../errors";

const populateParams = [
	{path: "editedBy", select: "nombre", strictPopulate: false},
	{path: "createdBy", select: "nombre"},
	{path: "category", select: "name"},
];

export const getMany = (): RequestHandler => async (
	req,
	res
) => {
	try {
		const {offset, limit} = normalizePagination({
			offset: req.query.offset as string,
			limit: req.query.limit as string,
		});

		const query = {state: true};

		const [total, products] = await Promise.all([
			Product.count(query),
			Product.find(query)
				.skip(+offset)
				.limit(+limit)
				.populate(populateParams),
		]);

		const {next, last} = calculateNextAndLastUrl({
			offset: +offset,
			limit: +limit,
			total,
			url: fullUrl(req) + "/api/productos",
		});

		res.json({next, last, total, products});
	} catch (error) {
		res.status(500).json({msg: (error as Error).message});
	}
};

export const getOne = (): RequestHandler => async (
	req,
	res
) => {
	try {
		const {id} = req.params;
		const product = await Product.findOne({_id: id, state: true}).populate(
			populateParams
		);

		res.json({product});
	} catch (error) {
		const {message} = error as Error;
		res.status(500).json({msg: message});
	}
};

export const remove = (): RequestHandler => async (
	req,
	res
) => {
	try {
		const {id} = req.params;
		const {userId} = (req as any).user._id;
		const product = await Product.findOne({_id: id, state: true});

		product!.state = false;
		product!.editedBy = userId;
		await product!.save();

		res.json({msg: "Eliminamos el producto.", product});
	} catch (error) {
		const {message} = error as Error;
		res.status(500).json({msg: message});
	}
};

export const create = (): RequestHandler => async (
	req,
	res
) => {
	try {
		const {createdBy, editedBy, _id, __v, ...data} = req.body;
		const product = new Product({...data, createdBy: (req as any).user._id});

		await product.save();

		res.json({msg: "Creamos el producto exitosamente.", category: product});
	} catch (error) {
		const {status = 500, message} = error as iRequestError;
		res.status(status).json({msg: message});
	}
};

export const modify = (): RequestHandler => async (
	req,
	res
) => {
	try {
		const {id} = req.params;
		const {_id, _v,  state, createdBy, ...data} = req.body as models.Product;
		const {category, name} = data;
		const {INVALID_REFERENCE, ALREADY_EXISTS} = queryErrors;

		if (category && ! await Category.exists({_id: category as string, state: true}))
			throw RequestError(INVALID_REFERENCE);
		if (name && await Product.exists({name})) throw RequestError(ALREADY_EXISTS);

		data.editedBy = (req as any).user._id;
		data.category = category;

		const product = await Product.findByIdAndUpdate(id, data).populate(populateParams);

		res.json({msg: "Modificamos el producto exitosamente.", product});
	} catch (error){
		const {status = 500, message} = error as iRequestError;
		res.status(status).json({msg: message});
	}
};
