import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminroutes from "./routes/adminroutes.js"


dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use("/admin", adminroutes);
const PORT = process.env.PORT || 4000;

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,       
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    )
    .catch((error) => console.log(error.message));


