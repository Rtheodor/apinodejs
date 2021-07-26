import bcrypt from 'bcryptjs';
import User from '../models/User'


class LoginController { 
    async store(req, res) {

        const { emailTutor } = req.body;

        const userExiste = await User.findOne({ emailTutor: emailTutor });

        if (!userExiste) {
            return res.status(401).json({
                error: true,
                code: 110,
                message: "ERRO:Pet Não encontrado!"
            })
        }

        /*if(! (await bcrypt.compare(password, userExiste.password))){
         return res.status(401).json({
             error: true,
             code: 111,
             message: "Erro: Senha inválida!"
         })*/

            return res.status(401).json({
                user: {
                    id: userExiste._id,
                    emailTutor,
                    //password
                }
            })
    }
}


export default new LoginController();