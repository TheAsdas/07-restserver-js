import dotenv from "dotenv";
import { Server } from "./models";

dotenv.config();

const main = async () => {
	console.clear();

	const server = await Server();
	server.listen();
};

main();
