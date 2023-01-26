    import express from "express";
    import mongoose from "mongoose";
    import cors from "cors";
    import dotenv from "dotenv";
    import userRoutes from "./routes/user.js";
    
    // mozemo da koristimo import zato sto smo ubacil "type": "module" u package.json
    
    dotenv.config();
    const app = express();
    
    app.use(cors()); // nzm cemu sluzi
    
    app.use(express.json({ limit: "30mb", extended: true }));
    
    app.use("/admin", userRoutes);
    
    const PORT = process.env.PORT || 5000; // na kom portu slusamo
    // konektovanje na bazu - ima na internetu kako se radi i ovo DATABASE_CONNECTION je link ka nasoj mongo bazi
    mongoose
        .connect(process.env.CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() =>
            // ako se konektovao onda slusa na portu i ispisuje
            app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
        )
        .catch((error) => console.log(error.message));
    