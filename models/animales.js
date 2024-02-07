const { Schema, model } = require('mongoose');

const AnimalesSchema = Schema({
    raza:{
        type: String,
        required: [true, 'Ingresar el tipo']
    },

    edad:{
        type: String,
        required: [true, 'Ingresar la edad del animal']
    },

    condicion:{
        type: String,
        required: [true, 'Ingresa su condicion']
    },

    registro:{
        type: String,
        required: [true, 'Fecha de ingreso al centro']
    },

    sexo:{
        type: String,
        required: [true, 'Macho, hembra']
    },

    estado:{
        type: Boolean,
        default: true
    }

});


module.exports = model('Animales', AnimalesSchema);