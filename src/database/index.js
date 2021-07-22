import mongoose from 'mongoose';

class DataBase {
    constructor() {
        this.mongoDataBase();

    } mongoDataBase() {
        // conexão com o MONGODB
        mongoose.connect('mongodb://localhost/novaera', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("conexão com Mongodb, sucesso!");

        }).catch((erro) => {
            console.log("erro: Não conseguiu acessar o Mongo db." + erro);
        });
    }
}


export default new DataBase();