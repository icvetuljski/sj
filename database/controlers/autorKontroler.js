import Autor from "../models/autor.js";
import {validateAutorInput} from "../validation/validation.js";
import {validateAutorUpdate, } from "../validation/validationUpdate.js";



export const addAutor = async (request, response) => {
    const {ime , prezime, godiste, brKnjiga, brNagrada} = request.body;

    const validInput = validateAutorInput(request, response);
    if (validInput === false) {
        return;
    }

    const autor = new Autor({
        ime: ime,
        prezime: prezime,
        godiste: godiste,
        brKnjiga: brKnjiga,
        brNagrada: brNagrada
    });
    try {
        const newAutor = await autor.save();
        response.status(200).json({message: `Uspesno dodat: ${newAutor.productName}`})
    } catch(error) {
        response.status(400).json({message: error.message});
    }
}

export const getAutor = async(request, response) => {
    const {autorId} = request.body.autorId;
    try {
        const autor = await Autor.findById(autor);
        if (!autor) {
            response.status(400).json({ message: `Pogresan ID! Autor sa ${autorId} ID ne postoji`});
            return;
        }
        response.status(200).json(autor);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const getAllAutor = async(request, response) => {
    try {
        const autor = await Autor.find();
        if (!autor) {
            response.status(400).json({ message: "Trenutno nema autor" });
            return;
        }
        response.status(200).json(autor);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const updateAutor = async(request, response) => {
    const autorId = request.body.autorId;
    const updateContent = request.body;
    try {
        const autor = await Autor.findById(autorId);
        if (!autor) {
            response.status(400).json({message: `Pogresan ID! Autor sa ${autor} ne postoji`});
            return;
        }
        const validInput = validateAutorUpdate(request, response);
        if (validInput === false) {
            return;
        }
        const newAutor = await Autor.findByIdAndUpdate(autor._id, updateContent);
        response.status(200).json(`Uspesno promenjen autor ${newAutor.productName}`);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export const deleteAutor = async(request, response) => {
    const autorId = request.body.autorId;
    try {
        const autor = Autor.findById(autorId)
        if (!autor) {
            response.status(400).json({message: `Pogresan ID! Autor sa ${autorId} ID ne postoji`})
        }
        await Autor.findByIdAndDelete(autorId);
        response.status(200).json({ message: `Uspesno obrisana autor: ${autorId.productName}`});

    } catch (error) {
        response.status(400).json({message: error.details})
    }
}