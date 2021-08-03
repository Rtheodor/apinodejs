import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import config from '../../config/config';

class PerfilController{
    async show(req, res){
        User.findOne({_id: req.userId }, '_id emailTutor namePet  createdAt updatedAt fileName').then((user) => {
            var url = config.url + "/files/users/" + user.fileName;
            return res.json({
                error: false,
                user: user,
                url:url
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 115,
                message: "Erro: Pet não encontrado!"
            });
        });
    };

    async update(req,res){
        const schema = Yup.object().shape({
            emailTutor: Yup.string()
            .email(),
            password: Yup.string()
            .min(6),
            namePet: Yup.string(),
            rga: Yup.number(),
            raca: Yup.string(),
            sexPet: Yup.string()
            
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code:108,
                message: "Erro: Dados do formulario invalido"
            });
        };

        const { emailTutor } = req.body;

        const usuarioExiste = await User.findOne({_id: req.userId});

        if(!usuarioExiste){
            return res.status(400).json({
                error:true,
                code:109,
                message: "Erro: Usuário nao encontrado!"
            })
        }

        if(emailTutor != usuarioExiste.emailTutor){
            const emailExiste = await User.findOne({emailTutor})
            if (emailExiste){
                return res.status(400).json({
                    error:true,
                    code:110,
                    message: "Erro: este e-mail ja esta cadastrado!"
                });
            };
        };
        var dados = req.body;
        if(dados.password){
            dados.password = await bcrypt.hash(dados.password, 8)
        };

        await User.updateOne({_id: dados._id}, dados, (err)=>{
            if(err) return res.status(400).json({
                error: true,
                code:111,
                message: "Erro: Usuário nao foi editado com sucesso! "
            });
            
            return res.json({
                error:false,
                message: "Usuário editado com sucesso e muito frio."
            })
        });
        
        

    }
};

export default new PerfilController();