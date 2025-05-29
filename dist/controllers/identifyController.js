"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyContact = void 0;
const Contact_1 = require("../models/Contact");
const contactUtils_1 = require("../utils/contactUtils");
const identifyContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber) {
        return res.status(400).json({ message: 'Email or phoneNumber is required' });
    }
    try {
        const matchedContacts = yield Contact_1.Contact.find({
            $or: [{ email }, { phoneNumber }],
        });
        const result = yield (0, contactUtils_1.mergeContacts)(matchedContacts, email, phoneNumber);
        return res.status(200).json({ contact: result });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.identifyContact = identifyContact;
