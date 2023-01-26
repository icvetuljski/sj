import mongoose from 'mongoose'

const audioKnjige = mongoose.Schema({
    naslov: {type: String, required: true},
    autor: {type: String, required: true},
    GodinaIzdavanja: {type: Number, default: true},
    izdavac: {type: String, default: true},
    trajanje: {type: Number, default: true},
    cena: {type: Number, default: true}
});

const AudioKnjige = mongoose.model("AudioKnjige", audioKnjige);

export default AudioKnjige;