import Joi from "joi";

const knjigeSchema = Joi.object({
    naslov: Joi.string().required(),
    autor: Joi.string().required(),
    GodinaIzdavanja: Joi.number().required(),
    izdavac: Joi.string().required(),
    cena: Joi.number().required()
});

export const validateKnjigeInput = (request, response) => {
    return knjigeSchema.validate(request.body, knjigeSchema, (error) => { //ovamo sam promeniio da probam dal ce da radi bilo je obicno Joi.validate
        if (error) {
            response.status(400).json({message: error.details});
            return false;
        } else {
            return true;
        }
    });
}

const autorSchema = Joi.object({
    ime: Joi.string().required(),
    prezime: Joi.string().required(),
    godiste: Joi.number().required(),
    brKnjiga: Joi.number().integer().required(),
    brNagrada: Joi.number().required()
});

export const validateAutorInput = (request, response) => {
    return Joi.validate(request.body, autorSchema, (error) => {
        if (error) {
            response.status(400).json({message: error.details});
            return false;
        } else {
            return true;
        }
    });
}

const audioKnjigeSchema = Joi.object({
    naslov: Joi.string().required(),
    autor: Joi.string().required(),
    GodinaIzdavanja: Joi.number().required(),
    izdavac: Joi.string().required(),
    trajanje: Joi.number().required(),
    cena: Joi.number().required()
});

export const validateAudioKnjigeInput = (request, response) => {
    return Joi.validate(request.body, audioKnjigeSchema, (error) => {
        if (error) {
            response.status(400).json({message: error.details});
            return false;
        } else {
            return true;
        }
    });
}

const ploceSchema = Joi.object({
    naslov: Joi.string().required(),
    autor: Joi.string().required(),
    GodinaIzdavanja: Joi.number().required(),
    izdavac: Joi.string().required(),
    trajanje: Joi.number().required(),
    cena: Joi.number().required()
});

export const validatePloceInput = (request, response) => {
    return Joi.validate(request.body, ploceSchema, (error) => {
        if (error) {
            response.status(400).json({message: error.details});
            return false;
        } else {
            return true;
        }
    });
}

const izdavacSchema = Joi.object({
    ime: Joi.string().required(),
    pib: Joi.number().required(),
    osnivanje: Joi.number().required(),
});

export const validateIzdavacInput = (request, response) => {
    return Joi.validate(request.body, izdavacSchema, (error) => {
        if (error) {
            response.status(400).json({message: error.details});
            return false;
        } else {
            return true;
        }
    });
}