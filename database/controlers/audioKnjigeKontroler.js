import AudioKnjige from "../models/audioKnjige";
import {validateAudioKnjigeInput} from "../validation/validation.js";
import {validateAudioKnjigeUpdate, } from "../validation/validationUpdate.js";



export const addAudioKnjige = async (request, response) => {
    const {naslov , autor, GodinaIzdavanja, izdavac, trajanje, cena} = request.body;

    const validInput = validateAudioKnjigeInput(request, response);
    if (validInput === false) {
        return;
    }

    const audioKnjige = new AudioKnjige({
        naslov: naslov,
        autor: autor,
        GodinaIzdavanja: GodinaIzdavanja,
        izdavac: izdavac,
        trajanje: trajanje,
        cena: cena
    });
    try {
        const newAudioKnjige = await audioKnjige.save();
        response.status(200).json({message: `Uspesno dodat: ${newAudioKnjige.productName}`})
    } catch(error) {
        response.status(400).json({message: error.message});
    }
}

export const getAudioKnjige = async(request, response) => {
    const {audioKnjigeId} = request.body.audioKnjigeId;
    try {
        const audioKnjige = await AudioKnjige.findById(audioKnjige);
        if (!audioKnjige) {
            response.status(400).json({ message: `Pogresan ID! AudioKnjige sa ${audioKnjigeId} ID ne postoji`});
            return;
        }
        response.status(200).json(audioKnjige);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const getAllAudioKnjige = async(request, response) => {
    try {
        const audioKnjige = await Knjige.find();
        if (!audioKnjige) {
            response.status(400).json({ message: "Trenutno nema audioKnjige" });
            return;
        }
        response.status(200).json(audioKnjige);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const updateAudioKnjige = async(request, response) => {
    const audioKnjigeId = request.body.audioKnjigeId;
    const updateContent = request.body;
    try {
        const audioKnjige = await AudioKnjige.findById(audioKnjigeId);
        if (!audioKnjige) {
            response.status(400).json({message: `Pogresan ID! AudioKnjige sa ${audioKnjige} ne postoji`});
            return;
        }
        const validInput = validateAudioKnjigeUpdate(request, response);
        if (validInput === false) {
            return;
        }
        const newAudioKnjige = await AudioKnjige.findByIdAndUpdate(audioKnjige._id, updateContent);
        response.status(200).json(`Uspesno promenjen audioKnjige ${newAudioKnjige.productName}`);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const deleteAudioKnjige = async(request, response) => {
    const audioKnjigeId = request.body.audioKnjigeId;
    try {
        const audioKnjige = AudioKnjige.findById(audioKnjigeId)
        if (!audioKnjige) {
            response.status(400).json({message: `Pogresan ID! AudioKnjige sa ${audioKnjigeId} ID ne postoji`})
        }
        await AudioKnjige.findByIdAndDelete(audioKnjigeId);
        response.status(200).json({ message: `Uspesno obrisan audioKnjige: ${audioKnjigeId.productName}`});

    } catch (error) {
        response.status(400).json({message: error.details})
    }
}