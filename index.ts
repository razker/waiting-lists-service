import * as http from "http";
import App from "./app";
import { APILogger } from "./logger/api.logger";
import { configureServer } from "./server.config";
require("dotenv").config();

const port = process.env.PORT || 3080;

App.set("port", port);
configureServer(App);
const server = http.createServer(App);
server.listen(port);

const logger = new APILogger();

server.on("listening", function (): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`, null);
});

module.exports = App;
