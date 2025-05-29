import { Request, Response } from 'express';
import { Contact } from '../models/Contact';
import { mergeContacts } from '../utils/contactUtils';

export const identifyContact = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ message: 'Email or phoneNumber is required' });
  }

  try {
    const matchedContacts = await Contact.find({
      $or: [{ email }, { phoneNumber }],
    });

    const result = await mergeContacts(matchedContacts, email, phoneNumber);
    return res.status(200).json({ contact: result });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};