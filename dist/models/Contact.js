"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    phoneNumber: String,
    email: String,
    linkedId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    linkPrecedence: { type: String, enum: ['primary', 'secondary'], default: 'primary' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: Date.now }
});
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);
