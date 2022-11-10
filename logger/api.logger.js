"use strict";
exports.__esModule = true;
exports.APILogger = void 0;
var pine = require("pine");
var logger = pine();
var APILogger = /** @class */ (function () {
    function APILogger() {
    }
    APILogger.prototype.info = function (message, data) {
        logger.info("".concat(message, "   ").concat(undefined != data ? JSON.stringify(data) : ""));
    };
    APILogger.prototype.error = function (message) {
        logger.error(message);
    };
    return APILogger;
}());
exports.APILogger = APILogger;
//# sourceMappingURL=api.logger.js.map