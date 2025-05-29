import express, { Request, Response, NextFunction } from 'express';
import  {identifyContact}  from '../controllers/identifyController';

const router = express.Router();

router.post('/identify', (req: Request, res: Response, next: NextFunction) => {
  identifyContact(req, res).catch(next);
});

export default router;
