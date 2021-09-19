import {Model} from "mongoose";

declare namespace Pagination {
	namespace normalizePagination {
		type input = {
			limit?: string | number;
			offset?: string | number;
		}
		type output = {
			limit: number;
			offset: number;
		}
	}
	namespace next_last {
		type input = {
			offset: number;
			limit: number;
			total: number;
			url: string;
		}

		type output = {
			last?: string;
			next?: string;
		}
	}
}

declare namespace db_validator {
	export namespace entryExists {
		interface input {
			/**
			 * Modelo del esquema que se quiere verificar.
			 */
			model: Model<any>;
			/**
			 * Campo por el que se quiere filtrar la existencia de este producto. Por defecto es `_id`.
			 */
			filterBy?: string;
			/**
			 * Se ocupa para especificar campos adicionales estáticos con los que se pueden filtrar. Por
			 * defecto se ocupa un objeto vacío.
			 */
			filter?: { [key: string]: any };
		}
	}
}
