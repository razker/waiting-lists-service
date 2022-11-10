"use strict";
exports.__esModule = true;
exports.WaitingListNode = void 0;
var mongoose_1 = require("mongoose");
var WaitingListNodeSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true },
    exchangeName: { type: String }
});
exports.WaitingListNode = (0, mongoose_1.model)("waitinglists", WaitingListNodeSchema);
//# sourceMappingURL=WaitingListNode.model.js.map