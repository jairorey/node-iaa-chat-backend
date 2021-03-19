const {Router, response} = require('express');
const { check } = require('express-validator');
const {crearUsuario, login, renewToken} = require('../controllers/auth');
const { validar } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validar
], crearUsuario);

router.post('/', [
    check('email','El email no es valido').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validar
],login);

router.get('/renew',validarJWT,renewToken);

module.exports = router;