import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import configAuth from '../../config/auth';


class LoginController {
    async store(req, res) {

        const { emailTutor, password } = req.body;

        const userExiste = await User.findOne({ emailTutor: emailTutor });


        if (!userExiste) {
            return res.json({
                error: true,
                code: 110,
                message: "ERRO:Pet Não encontrado!"
            })
        }

        if (!(await bcrypt.compare(password, userExiste.password))) {
            return res.json({
                error: true,
                code: 111,
                message: "Erro: Senha inválida!"
            })

        }

        return res.json({
            user: {
                id: userExiste._id,
                emailTutor
            },
            token: jwt.sign({ id: userExiste._id }, configAuth.secret, { expiresIn: configAuth.expiresIn }),
        })
    }
}
export default new LoginController();