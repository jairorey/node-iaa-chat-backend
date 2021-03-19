const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async (req, res = response) => {
    
    const {email, password} = req.body;

    try {
        const existeEmail = await Usuario.findOne({email:email});
        if(existeEmail) {
            // respuesta entregada al consumidor
            return res.status(400).json({
                ok:false,
                msg:'El correo ya se encuentra registrado'
            });
        }
        // se crea nuevo usuario con models/usuario (body de la peticion)
        const usuario = new Usuario(req.body)
        

        // respuesta entregada al consumidor
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();


        //Generar JWT
        const token = await generarJWT(usuario.id);


        
        res.json({
            ok:true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        // respuesta entregada al consumidor
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con administración'
        });
    }

}

const login = async (req,res=response) => {
    const {email, password} = req.body;
    try {
        const usuarioDB = await Usuario.findOne({email:email});
        if(usuarioDB) {
            // verificar ahora si passowrd correspondeal email existente
            // iniciar sesion

            const validPassword = bcrypt.compareSync(password, usuarioDB.password);

            if(!validPassword){
                return res.status(400).json({
                    ok:false,
                    msg:'La contraseña no es valida'
                });
            }

            //Generar Token
            const token = await generarJWT(usuarioDB.id);
            res.json({
                ok:true,
                usuario: usuarioDB,
                token
            });
        } else {
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });
        }

    } catch (error) {
        console.log(error);
        // respuesta entregada al consumidor
        return res.status(500).json({
            ok:false,
            msg:'Comuniquese con administración'
        });
    }
}

const renewToken = async (req, res = response) => {

    
    const token = await generarJWT(req.uid);
    const usuarioDB = await Usuario.findById(req.uid);

    const {uid} = 
    res.json({
        ok:true,
        usuario: usuarioDB,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}