import express from "express";
import {getAllUsers} from "../controlers/userKontroler.js";
import {login} from "../controlers/userKontroler.js";
import {register} from "../controlers/userKontroler.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getAll", getAllUsers);

export default router;
