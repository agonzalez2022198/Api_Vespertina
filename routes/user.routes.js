const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usuariosPost,
    usuariosGet, 
    getUsuarioById,
    putUsuarios,
    usuarioDelete} = require('../controllers/usuario.controller');
const { existenteEmail, esRoleValido, existeUsuarioById } = require('../hellpers/db-validator');

const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('ic').custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioById),
        check("role").custom(esRoleValido),
        validarCampos
    ], putUsuarios
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo Valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], usuariosPost);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ],usuarioDelete
);

    module.exports = router;