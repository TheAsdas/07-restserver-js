import { Request } from "express";

type KeyVal = { [key: string]: any };

/**
 * # Ice Ice Baby
 * Congela de forma recursiva todos los objetos dentro de un objeto, además del objeto entregado.
 * @param obj Objeto a congelar.
 */
export const fullFreeze = (obj: KeyVal) => {
	Object.keys(obj).forEach((key) => {
		const current = obj[key];
		const objects = hasAnyObjects(current);

		if (objects) objects.forEach((obj) => fullFreeze(obj));
	});

	Object.freeze(obj);
};

/**
 * # ¿Objeto tiene objetos?
 * Chequea si un objeto contiene más objetos dentro.
 * @param obj Objeto a revisar.
 * @returns `false`, si el objeto solo contiene entradas simples.
 * @returns `KeyVal[]`, Si el objeto contiene uno o más objetos, retorna un arreglo con estos objetos.
 */
const hasAnyObjects = (obj: KeyVal): false | KeyVal[] => {
	const foundObjects: KeyVal[] = [];

	Object.keys(obj).forEach((key) => {
		const current = obj[key];
		typeof current === "object" && foundObjects.push(current);
	});

	return foundObjects.length === 0 ? false : foundObjects;
};

interface iUrlParams {
	offset: number;
	limit: number;
	total: number;
	url: string;
}

interface iUrlReturnData {
	last?: string | boolean;
	next?: string | boolean;
}

export const calculateNextAndLastUrl = ({
	offset,
	limit,
	total,
	url,
}: iUrlParams) => {
	const urls: iUrlReturnData = {};

	if (limit + offset < total!)
		urls.next = `${url}?offset=${offset + limit}&limit=${limit}`;

	if (offset !== 0)
		urls.last = `${url}?offset=${
			offset - limit < 0 ? 0 : offset - limit
		}&limit=${limit}`;

	return urls;
};

export const fullUrl = (req: Request) => req.protocol + "://" + req.get("host");

interface iPaginationInput {
	limit: any;
	offset: any;
}
interface iPaginationOutput {
	limit: number;
	offset: number;
}

export const normalizePagination = ({
	limit,
	offset,
}: iPaginationInput): iPaginationOutput => {
	if (isNaN(Number(offset)) || Number(offset) < 0) offset = 0;
	else offset = Number(offset);
	if (isNaN(Number(limit)) || Number(limit) < 0) limit = 5;
	else limit = Number(limit);

	return { limit, offset };
};
