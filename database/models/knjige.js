import mongoose from 'mongoose'

const knjige = mongoose.Schema({
    naslov: {type: String, required: true},
    autor: {type: String, required: true},
    GodinaIzdavanja: {type: Number, default: true},
    izdavac: {type: String, default: true},
    cena: {type: Number, default: true}
});

const Knjige = mongoose.model("Knjige", knjige);

export default Knjige;