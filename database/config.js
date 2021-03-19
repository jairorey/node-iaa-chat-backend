const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useCreateIndex: true,
            useUnifiedTopology:true,
            useNewUrlParser:true,
        });
        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('Error con la base de datos.');
    }
}

module.exports = {
    dbConnection
}