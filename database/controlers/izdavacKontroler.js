import Izdavac from "../models/izdavac.js";
import {validateIzdavacInput} from "../validation/validation.js";
import {validateIzdavacUpdate, } from "../validation/validationUpdate.js";



export const addIzdavac = async (request, response) => {
    const {ime , pib, osnivanje } = request.body;

    const validInput = validateIzdavacInput(request, response);
    if (validInput === false) {
        return;
    }

    const izdavac = new Izdavac({
        ime: ime,
        pib: pib,
        osnivanje: osnivanje
    });
    try {
        const newIzdavac = await izdavac.save();
        response.status(200).json({message: `Uspesno dodat: ${newIzdavac.productName}`})
    } catch(error) {
        response.status(400).json({message: error.message});
    }
}

export const getIzdavac = async(request, response) => {
    const {izdavacId} = request.body.izdavacId;
    try {
        const izdavac = await Izdavac.findById(izdavac);
        if (!izdavac) {
            response.status(400).json({ message: `Pogresan ID! Izdavac sa ${izdavacId} ID ne postoji`});
            return;
        }
        response.status(200).json(izdavac);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const getAllIzdavac = async(request, response) => {
    try {
        const izdavac = await Izdavac.find();
        if (!izdavac) {
            response.status(400).json({ message: "Trenutno nema izdavac" });
            return;
        }
        response.status(200).json(izdavac);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const updateIzdavac = async(request, response) => {
    const izdavacId = request.body.izdavacId;
    const updateContent = request.body;
    try {
        const izdavac = await Izdavac.findById(izdavacId);
        if (!izdavac) {
            response.status(400).json({message: `Pogresan ID! Izdavac sa ${izdavac} ne postoji`});
            return;
        }
        const validInput = validateIzdavacUpdate(request, response);
        if (validInput === false) {
            return;
        }
        const newIzdavac = await Izdavac.findByIdAndUpdate(izdavac._id, updateContent);
        response.status(200).json(`Uspesno promenjen izdavac ${newIzdavac.productName}`);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const deleteIzdavac = async(request, response) => {
    const izdavacId = request.body.izdavacId;
    try {
        const izdavac = Izdavac.findById(izdavacId)
        if (!izdavac) {
            response.status(400).json({message: `Pogresan ID! Izdavac sah ${izdavacId} ID ne postoji`})
        }
        await Izdavac.findByIdAndDelete(izdavacId);
        response.status(200).json({ message: `Uspesno obrisan izdavac: ${izdavacId.productName}`});

    } catch (error) {
        response.status(400).json({message: error.details})
    }
}