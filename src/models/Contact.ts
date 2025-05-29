import {Schema, model, Document } from "mongoose";

export interface IContact extends Document {
   phoneNumber?: string;
   email?: string;
   linkedId?: Schema.Types.ObjectId | null;
   linkPrecedence: 'primary' | 'secondary';
   createdAt: Date;
   updatedAt: Date;
   deletedAt: Date | null;
}

const contactSchema = new Schema<IContact>({
   phoneNumber: String,
   email: String,
   linkedId: {type: Schema.Types.ObjectId, default: null},
   linkPrecedence: {type: String, enum: ['primary', 'secondary'] , default : 'primary'},
   createdAt: {type: Date, default: Date.now},
   updatedAt: {type: Date, default: Date.now},
   deletedAt: {type: Date, default: Date.now}
});


export const Contact = model<IContact>('Contact', contactSchema);