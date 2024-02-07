const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Mascota = require('../models/animales');


const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`)
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El id ${ id } no se encuentra`);
    }
}


/*para mascotas */


const existeMascotaId = async (id = '') => {
    const existeMascota = await Mascota.findOne({id});
    if(existeMascota){
        throw new Error(`El id ${ id } no se encuentra`);
    }
}

module.exports = {
    existeMascotaId
}