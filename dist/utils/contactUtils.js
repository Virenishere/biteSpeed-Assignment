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
exports.mergeContacts = void 0;
const Contact_1 = require("../models/Contact");
const mergeContacts = (matchedContacts, email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    if (matchedContacts.length === 0) {
        const newContact = yield Contact_1.Contact.create({
            email,
            phoneNumber,
            linkPrecedence: 'primary'
        });
        return {
            primaryContactId: newContact._id,
            emails: [email || ''],
            phoneNumber: [phoneNumber || ''],
            secondaryContactIds: []
        };
    }
    //grouping of all primary and secondary contact
    let allContacts = [...matchedContacts];
    //get primary contacts by filters
    const primaryContacts = matchedContacts.filter(c => c.linkPrecedence === 'primary');
    //determining oldest primary contact
    const primary = primaryContacts.sort((a, b) => a.createdAt - b.createdAt)[0];
    for (const contact of allContacts) {
        if (contact._id.toString() !== primary._id.toString() && contact.linkPrecedence === "primary") {
            contact.linkPrecedence = 'secondary';
            contact.linkedId = primary._id;
            yield contact.save();
        }
    }
    // checking if mail and phone is new
    const alreadyExists = allContacts.some(c => c.email === email && c.phoneNumber === phoneNumber);
    if (!alreadyExists && (email || phoneNumber)) {
        const newSecondary = yield Contact_1.Contact.create({
            email,
            phoneNumber,
            linkPrecedence: 'secondary',
            linkedId: primary._id
        });
        allContacts.push(newSecondary);
    }
    //now gathering final data
    const emails = Array.from(new Set(allContacts.map(c => c.email).filter(Boolean)));
    const phoneNumbers = Array.from(new Set(allContacts.map(c => c.phoneNumber).filter(Boolean)));
    const secondaryIds = allContacts.filter(c => c.linkPrecedence === "secondary").map(c => c._id);
    return {
        primaryContactId: primary._id,
        emails,
        phoneNumbers,
        secondaryContactIds: secondaryIds
    };
});
exports.mergeContacts = mergeContacts;
