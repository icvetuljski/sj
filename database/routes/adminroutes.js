import express from "express";
import {addKnjige, getAllKnjige, getKnjige, updateKnjige, deleteKnjige} from "../controlers/knjigeKontroler";
import {addIzdavac, getAllIzdavac, getIzdavac, updateIzdavac, deleteIzdavac} from "../controlers/izdavacKontroler.js";
import {checkIfAdmin, checkIfModerator} from "../middleware/authentication.js";
import {addAutor, deleteAutor, getAllAutor, getAutor, updateAutor} from "../controlers/autorKontroler.js";
import {addAudioKnjige, deleteAudioKnjige, getAllAudioKnjige, getAudioKnjige, updateAudioKnjige} from "../controlers/audioKnjigeKontroler.js";
import {addPloce, deletePloce, getAllPloce, getPloce, updatePloce} from "../controlers/ploceKontroler.js";
import {deleteUser} from "../controlers/userKontroler.js";

const router = express.Router();

router.post("/knjige/add", checkIfAdmin, checkIfModerator, addKnjige);
router.get("/knjige/getOne", checkIfAdmin, checkIfModerator, getKnjige);
router.get("/knjige/getAll", checkIfAdmin, checkIfModerator, getAllKnjige);
router.patch("/knjige/update",checkIfAdmin, checkIfModerator, updateKnjige);
router.delete("/knjige/delete", checkIfAdmin, checkIfModerator, deleteKnjige);

router.post("/izdavac/add", checkIfAdmin, checkIfModerator, addIzdavac);
router.get("/izdavac/getOne",checkIfAdmin, checkIfModerator, getIzdavac);
router.get("/izdavac/getAll", checkIfAdmin, checkIfModerator, getAllIzdavac);
router.patch("/izdavac/update", checkIfAdmin, checkIfModerator, updateIzdavac);
router.delete("/izdavac/delete", checkIfAdmin, checkIfModerator, deleteIzdavac);

router.post("/autor/add", checkIfAdmin, checkIfModerator,addAutor);
router.get("/autor/getOne",checkIfAdmin, checkIfModerator, getAutor);
router.get("/autor/getAll", checkIfAdmin, checkIfModerator, getAllAutor);
router.patch("/autor/update",checkIfAdmin, checkIfModerator, updateAutor);
router.delete("/autor/delete", checkIfAdmin, checkIfModerator, deleteAutor);

router.post("/audioKnjige/add", checkIfAdmin, checkIfModerator, addAudioKnjige);
router.get("/audioKnjige/getOne",checkIfAdmin, checkIfModerator, getAudioKnjige);
router.get("/audioKnjige/getAll", checkIfAdmin, checkIfModerator,getAllAudioKnjige);
router.patch("/audioKnjige/update", checkIfAdmin, checkIfModerator,updateAudioKnjige);
router.delete("/audioKnjige/delete",checkIfAdmin, checkIfModerator, deleteAudioKnjige);

router.post("/ploce/add", checkIfAdmin, checkIfModerator, addPloce);
router.get("/ploce/getOne",checkIfAdmin, checkIfModerator, getPloce);
router.get("/ploce/getAll", checkIfAdmin, checkIfModerator,getAllPloce);
router.patch("/ploce/update", checkIfAdmin, checkIfModerator,updatePloce);
router.delete("/ploce/delete",checkIfAdmin, checkIfModerator, deletePloce);

router.delete("/user/delete", checkIfAdmin, checkIfAdmin, deleteUser);

export default router