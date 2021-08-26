import dotenv from "dotenv";
import Server from "./models/Server";

dotenv.config();

const main = async () => {
    const server = await Server.init();
    server.listen();
}

main();