const { Router } = require('express');

const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { existeMascotaId } = require('../hellpers/db-validator');

/*Los metodos para el crud en este lugar*/

const router = Router();

const {
    animalesGet,
    postMascotas,
    getMascotasById,
    putMascotas,
    delteMascotas} = require('../controllers/mascotas.controller');

router.get("/", animalesGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaId),
        validarCampos
    ], getMascotasById
);

router.post(
    "/",
    [
        check("raza", "La raza no puede ir vacia").not().isEmpty(),
        check("edad", "La edad no puede ir vacia").not().isEmpty(),
        check("condicion", "No puede estar vacia").not().isEmpty(),
        check("registro", "No puede estar vacio").not().isEmpty(),
        check("sexo", "No puede estar vacio").not().isEmpty(),
        validarCampos,     
    ], postMascotas
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaId),
        validarCampos
    ], putMascotas
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaId),
        validarCampos
    ],delteMascotas
);

module.exports = router;

