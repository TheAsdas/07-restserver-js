import {Request} from "express";
//import {pagination} from "./.d"

import {Pagination} from "./index";
import input1 = Pagination.next_last.input;
import output1 = Pagination.next_last.output;
import input2 = Pagination.normalizePagination.input;
import output2 = Pagination.normalizePagination.output;

export const calculateNextAndLastUrl = (data: input1) => {
	const {offset, limit, url, total} = data;
	const urls: output1 = {};

	if (limit + offset < total!)
		urls.next = `${url}?offset=${offset + limit}&limit=${limit}`;

	if (offset !== 0)
		urls.last = `${url}?offset=${
			offset - limit < 0 ? 0 : offset - limit
		}&limit=${limit}`;

	return urls;
};

export const fullUrl = (req: Request) => req.protocol + "://" + req.get("host");


export const normalizePagination = (data: input2): output2 => {
	let {offset, limit} = data;

	if (isNaN(Number(offset)) || Number(offset) < 0) offset = 0;
	else offset = Number(offset);
	if (isNaN(Number(limit)) || Number(limit) < 0) limit = 5;
	else limit = Number(limit);

	return {limit, offset};
};
