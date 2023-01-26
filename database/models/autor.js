import mongoose from 'mongoose'

const autor = mongoose.Schema({
    ime: {type: String, required: true},
    prezime: {type: String, required: true},
    godiste: {type: Number, default: true},
    brKnjiga: {type: Number, default: true},
    brNagrada: {type: Number, default: true},
});

const Autor = mongoose.model("Autor", autor);

export default Autor;