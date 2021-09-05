import dotenv from "dotenv";
import { Server } from "./models";


export var _LANG: any;

dotenv.config();

const main = async () => {
	console.clear();

	const server = Server();
	server.listen();
};

main();
