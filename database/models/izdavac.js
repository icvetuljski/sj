import mongoose from 'mongoose'

const izdavac = mongoose.Schema({
    ime: {type: String, required: true},
    pib: {type: Number, required: true},
    osnivanje: {type: Number, default: true}
});

const Izdavac = mongoose.model("Izdavac", izdavac);

export default Izdavac;