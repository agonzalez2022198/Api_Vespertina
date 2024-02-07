const bcryptjs = require('bcryptjs');
const Mascotas = require('../models/animales');
const {response} = require('express');

const animalesGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};


    const [total, animales] = await Promise.all([
        Mascotas.countDocuments(query),
        Mascotas.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.status(200).json({
        total,
        animales
    });
}

const getMascotasById = async (req, res) => {
    const {id} = req.params;
    const animales = await Mascotas.findOne({_id: id});

    res.status(200).json({
        animales
    });
}

const putMascotas = async (req, res = response) =>{
    const {id} = req.params;
    const { _id, raza, edad, condicion, resgistro, sexo, ...resto} = req.body;

    const animales = await Mascotas.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Has actualizado los datos de la mascota',
        animales
    });
}

const delteMascotas = async (req, res) => {
    const {id} = req.params;
    const {animales} = await Mascotas.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Has eliminado los datos de una mascota',
        animales
    });
}

const postMascotas = async (req, res) => {
    const {raza, edad, condicion, registro, sexo} = req.body;
    const animal = new Mascotas({raza,edad,condicion,registro,sexo});

    await animal.save();
    res.status(202).json({
        animal
    });
}

module.exports = {
    animalesGet,
    postMascotas,
    getMascotasById,
    putMascotas,
    delteMascotas
}