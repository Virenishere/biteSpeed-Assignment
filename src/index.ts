import express, {Request,Response} from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnection";
import identityRoutes from './routes/identifyRoutes';
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json()); //sending request for json middleware

const PORT = process.env.PORT || 8000;

//calling db 
connectDB();

//testing for / if api is working or not
app.get('/', (req:Request, res: Response)=>{
    res.json({
        message: "api is working..."
    })
});

app.use('/api', identityRoutes); 


//making a server at port 8000 by express listen
app.listen(PORT , ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})