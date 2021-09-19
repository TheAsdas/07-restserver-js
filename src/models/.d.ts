import {Express} from "express-serve-static-core";


declare namespace models {
	interface Server {
		app: Express;
		port?: string;
		listen: () => void;
	}

	interface Model {
		_id: string,
		_v: number
	}

	interface User extends Model{
		nombre: string;
		correo: string;
		clave: string;
		img?: string;
		rol: string;
		estado: boolean;
		google: boolean;
		uid?: string;
	}

	interface Role extends Model{
		rol: string;
	}

	interface Category extends Model{
		name: string;
		state: boolean;
		createdBy: iUser | PersonShort;
		editedBy?: iUser | PersonShort;
	}

	interface PersonShort {
		name: string;
		_id: string;
	}

	interface Product extends Model{
		name: string;
		state: boolean;
		createdBy: PersonShort | string;
		editedBy?: PersonShort | string;
		price?: number;
		category: string | PersonShort;
		description?: string;
		available: boolean;
	}
}