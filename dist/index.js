"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = require("./config/dbConnection");
const identifyRoutes_1 = __importDefault(require("./routes/identifyRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //sending request for json middleware
const PORT = process.env.PORT || 8000;
//calling db 
(0, dbConnection_1.connectDB)();
//testing for / if api is working or not
app.get('/', (req, res) => {
    res.json({
        message: "api is working..."
    });
});
app.use('/api', identifyRoutes_1.default);
//making a server at port 8000 by express listen
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
