const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
    return new Promise((resolve, reject) =>
    {
        const payload = {uid}
        jwt.sign(payload, process.env.JWT_KEY,{
            expiresIn:'24h'
        }, (err, token) => {
            err ? reject('no se pudo crear el token')
            : resolve(token);
        });
    });
}

module.exports = {
    generarJWT
};