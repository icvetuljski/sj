import Ploce from "../models/ploce.js";
import {validatePloceInput} from "../validation/validation.js";
import {validatePloceUpdate, } from "../validation/validationUpdate.js";



export const addPloce = async (request, response) => {
    const {naslov , autor, GodinaIzdavanja, izdavac, trajanje, cena} = request.body;

    const validInput = validatePloceInput(request, response);
    if (validInput === false) {
        return;
    }

    const ploce = new Ploce({
        naslov: naslov,
        autor: autor,
        GodinaIzdavanja: GodinaIzdavanja,
        izdavac: izdavac,
        trajanje: trajanje,
        cena: cena
    });
    try {
        const newPloce = await ploce.save();
        response.status(200).json({message: `Uspesno dodat: ${newPloce.productName}`})
    } catch(error) {
        response.status(400).json({message: error.message});
    }
}

export const getPloce = async(request, response) => {
    const {ploceId} = request.body.ploceId;
    try {
        const ploce = await Ploce.findById(ploce);
        if (!ploce) {
            response.status(400).json({ message: `Pogresan ID! Ploce sa ${ploceId} ID ne postoji`});
            return;
        }
        response.status(200).json(ploce);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const getAllPloce = async(request, response) => {
    try {
        const ploce = await Knjige.find();
        if (!ploce) {
            response.status(400).json({ message: "Trenutno nema ploce" });
            return;
        }
        response.status(200).json(ploce);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const updatePloce = async(request, response) => {
    const ploceId = request.body.ploceId;
    const updateContent = request.body;
    try {
        const ploce = await Ploce.findById(ploceId);
        if (!ploce) {
            response.status(400).json({message: `Pogresan ID! Ploce sa ${ploce} ne postoji`});
            return;
        }
        const validInput = validatePloceUpdate(request, response);
        if (validInput === false) {
            return;
        }
        const newPloce = await Ploce.findByIdAndUpdate(ploce._id, updateContent);
        response.status(200).json(`Uspesno promenjen ploce ${newPloce.productName}`);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const deletePloce = async(request, response) => {
    const ploceId = request.body.ploceId;
    try {
        const ploce = Ploce.findById(ploceId)
        if (!ploce) {
            response.status(400).json({message: `Pogresan ID! Ploce sa ${ploceId} ID ne postoji`})
        }
        await Ploce.findByIdAndDelete(ploceId);
        response.status(200).json({ message: `Uspesno obrisan ploce: ${ploceId.productName}`});

    } catch (error) {
        response.status(400).json({message: error.details})
    }
}