import express, {Request,Response} from "express";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8000;

dotenv.config();
const app = express();
app.use(express.json());


app.get('/', (req:Request, res: Response)=>{
    res.json({
        message: "api is working..."
    })
});


app.listen(PORT , ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})