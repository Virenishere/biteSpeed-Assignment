import { Contact } from "../models/Contact";

export const mergeContacts = async(matchedContacts: any[], email?: string, phoneNumber?: string) =>{
    if(matchedContacts.length === 0){
        const newContact = await Contact.create({
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
    const primaryContacts = matchedContacts.filter(c=>c.linkPrecedence === 'primary');

    //determining oldest primary contact
    const primary = primaryContacts.sort((a,b)=> a.createdAt - b.createdAt)[0];

    for (const contact of allContacts){
        if(contact._id.toString() !== primary._id.toString() && contact.linkPrecedence === "primary"){
            contact.linkPrecedence = 'secondary';
            contact.linkedId = primary._id;
            await contact.save();
        }
    }

    // checking if mail and phone is new
    const alreadyExists = allContacts.some(
        c => c.email === email && c.phoneNumber === phoneNumber
    );

    if(!alreadyExists && (email || phoneNumber)){
        const newSecondary = await Contact.create({
            email,
            phoneNumber,
            linkPrecedence : 'secondary',
            linkedId: primary._id
        });
        allContacts.push(newSecondary);
    }

    //now gathering final data

    const emails = Array.from(new Set(allContacts.map(c=>c.email).filter(Boolean)));
    const phoneNumbers = Array.from(new Set(allContacts.map(c=>c.phoneNumber).filter(Boolean)));
    const secondaryIds = allContacts.filter(c=>c.linkPrecedence === "secondary").map(c=>c._id);

    return{
        primaryContactId: primary._id,
        emails,
        phoneNumbers,
        secondaryContactIds: secondaryIds
    };
};