import Knjige from "../models/knjige";
import {validateKnjigeInput} from "../validation/validation.js";
import {validateKnjigeUpdate, } from "../validation/validationUpdate.js";



export const addKnjige = async (request, response) => {
    const {naslov , autor, GodinaIzdavanja, izdavac, cena} = request.body;

    const validInput = validateKnjigeInput(request, response);
 //   if (validInput === false) {
  //      return;
  //  }

    const knjige = new Knjige({
        naslov: naslov,
        autor: autor,
        GodinaIzdavanja: GodinaIzdavanja,
        izdavac: izdavac,
        cena: cena
    });
    try {
        const newKnjige = await knjige.save();
        response.status(201).json({message: `Uspesno dodat: ${newKnjige.productName}`})
    } catch(error) {
        response.status(400).json({message: error.message});
    }
}

export const getKnjige = async(request, response) => {
    const {knjigeId} = request.body.knjigeId;
    try {
        const knjige = await Knjige.findById(knjige);
        if (!knjige) {
            response.status(400).json({ message: `Pogresan ID! Knjige sa ${knjigeId} ID ne postoji`});
            return;
        }
        response.status(200).json(knjige);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const getAllKnjige = async(request, response) => {
    try {
        const knjige = await Knjige.find();
        if (!knjige) {
            response.status(400).json({ message: "Trenutno nema knjige" });
            return;
        }
        response.status(200).json(knjige);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const updateKnjige = async(request, response) => {
    const knjigeId = request.body.knjigeId;
    const updateContent = request.body;
    try {
        const knjige = await Knjige.findById(knjigeId);
        if (!knjige) {
            response.status(400).json({message: `Pogresan ID! Knjige sa ${knjige} ne postoji`});
            return;
        }
        const validInput = validateKnjigeUpdate(request, response);
        if (validInput === false) {
            return;
        }
        const newKnjige = await Knjige.findByIdAndUpdate(knjige._id, updateContent);
        response.status(200).json(`Uspesno promenjen knjige ${newKnjige.productName}`);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const deleteKnjige = async(request, response) => {
    const knjigeId = request.body.knjigeId;
    try {
        const knjige = Knjige.findById(knjigeId)
        if (!knjige) {
            response.status(400).json({message: `Pogresan ID! Knjige sa ${knjigeId} ID ne postoji`})
        }
        await Knjige.findByIdAndDelete(knjigeId);
        response.status(200).json({ message: `Uspesno obrisan knjige: ${knjigeId.productName}`});

    } catch (error) {
        response.status(400).json({message: error.details})
    }
}