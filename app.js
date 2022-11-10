"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var bodyParser = require("body-parser");
var path = require("path");
var express = require("express");
var api_logger_1 = require("./logger/api.logger");
var event_controller_1 = require("./controller/event.controller");
var waitingList_controller_1 = require("./controller/waitingList.controller");
var App = /** @class */ (function () {
    /* Swagger files start */
    // private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    // private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    // private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    // private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new api_logger_1.APILogger();
        this.eventController = new event_controller_1.EventController();
        this.waitingListController = new waitingList_controller_1.WaitingListController();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, "../ui/build")));
    };
    App.prototype.routes = function () {
        var _this = this;
        this.express.get("/api/events", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("GET /api/events ");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.eventController.getEvents()];
                    case 2:
                        response = _a.sent();
                        res.json(response);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.logger.error(error_1);
                        res.status(500).json(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.express.post("/api/event", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info("POST /api/event | body: ", req.body);
                        return [4 /*yield*/, this.eventController.createEvent(req.body)];
                    case 1:
                        response = _a.sent();
                        if (response === null || response === void 0 ? void 0 : response.error) {
                            res.status(409).json(response === null || response === void 0 ? void 0 : response.error);
                        }
                        else {
                            res.json(response);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        this.logger.error(error_2);
                        res.status(500).json(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.express.get("/api/waiting-list/:eventId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info("GET /api/waitng-list/".concat(req.params.eventId));
                        return [4 /*yield*/, this.waitingListController.getWaitingList(req.params.eventId)];
                    case 1:
                        response = _a.sent();
                        if (response === null || response === void 0 ? void 0 : response.error) {
                            res.status(404).json(response === null || response === void 0 ? void 0 : response.error);
                        }
                        else {
                            res.json(response);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        this.logger.error(error_3);
                        res.status(500).json(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.express.post("/api/waiting-list/:eventId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info("POST /api/waitng-list/".concat(req.params.eventId));
                        return [4 /*yield*/, this.waitingListController.createWaitingListNode(__assign(__assign({}, req.body), { eventId: req.params.eventId }))];
                    case 1:
                        response = _a.sent();
                        if (response === null || response === void 0 ? void 0 : response.error) {
                            res.status(500).json(response === null || response === void 0 ? void 0 : response.error);
                        }
                        else {
                            res.json(response);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        this.logger.error(error_4);
                        res.status(500).json(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.express.put("/api/waiting-list/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("PUT /api/waiting-list/:id | body: ", req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.waitingListController.updateWaitingListNode(req.params.id, req.body)];
                    case 2:
                        response = _a.sent();
                        if (response === null || response === void 0 ? void 0 : response.error) {
                            res.status(500).json(response === null || response === void 0 ? void 0 : response.error);
                        }
                        else {
                            res.json(response);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        this.logger.error(error_5);
                        res.status(500).json(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.express.get("/", function (req, res, next) {
            res.sendFile(path.join(__dirname, "../ui/build/index.html"));
        });
        // swagger docs
        //this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));
        // handle undefined routes
        this.express.use("*", function (req, res, next) {
            res.status(404).send("Make sure url is correct!!!");
        });
    };
    return App;
}());
exports["default"] = new App().express;
//# sourceMappingURL=app.js.map