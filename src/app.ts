import dotenv from "dotenv";
import Server from './models/Server';

dotenv.config();

Server.init();
Server.listen();






