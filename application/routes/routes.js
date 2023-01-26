import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", (request, response) => {
    response.sendFile("index.html", { root: "./static" });
});

router.get("/login", (request, response) => {
    response.sendFile("login.html", { root: "./static/pages/login" });
});

router.get("/knjige", (request, response) => {
    response.sendFile("knjige.html", { root: "./static/pages/knjige" });
});

router.get("/izdavac", (request, response) => {
    response.sendFile("izdavac.html", { root: "./static/pages/izdavac" });
});

router.get("/autor", (request, response) => {
    response.sendFile("autor.html", { root: "./static/pages/autor" });
});

router.get("/audioKnjige", (request, response) => {
    response.sendFile("audioKnjige.html", { root: "./static/pages/audioKnjige" });
});

router.get("/ploce", (request, response) => {
    response.sendFile("ploce.html", { root: "./static/pages/ploce" });
});

router.get("/user", (request, response) => {
    response.sendFile("user.html", { root: "./static/pages/user" });
});

export default router;
