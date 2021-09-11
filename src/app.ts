import dotenv from "dotenv";
import { Server } from "./models";

dotenv.config();

const main = async () => {
	console.clear();

	const server = Server();
	server.listen();
};

main();
