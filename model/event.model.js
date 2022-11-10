"use strict";
exports.__esModule = true;
exports.EventModel = void 0;
var mongoose_1 = require("mongoose");
var EventSchema = new mongoose_1.Schema({
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true }
});
exports.EventModel = (0, mongoose_1.model)("events", EventSchema);
//# sourceMappingURL=event.model.js.map