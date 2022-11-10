"use strict";
exports.__esModule = true;
var http = require("http");
var app_1 = require("./app");
var api_logger_1 = require("./logger/api.logger");
require('dotenv').config();
var port = process.env.PORT || 3080;
app_1["default"].set("port", port);
var server = http.createServer(app_1["default"]);
server.listen(port);
var logger = new api_logger_1.APILogger();
server.on("listening", function () {
    var addr = server.address();
    var bind = (typeof addr === "string") ? "pipe ".concat(addr) : "port ".concat(addr.port);
    logger.info("Listening on ".concat(bind), null);
});
module.exports = app_1["default"];
//# sourceMappingURL=index.js.map