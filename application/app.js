import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import path from 'path'

const __dirname = path.resolve();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", routes);

app.use(express.static(path.join(__dirname, "static")));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
