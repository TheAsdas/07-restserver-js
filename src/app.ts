import dotenv from "dotenv";
import Server from "./models/Server";

export var _LANG: any;

dotenv.config();

const main = async () => {
  console.clear();

  const server = await Server.init();
  server.listen();
  
};

main();