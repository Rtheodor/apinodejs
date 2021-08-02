import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { string } from 'yup/lib/locale';

class UserController {
    async index(req, res) {
        const { page = 1 } = req.query.page;
        const { limit = 40 } = req.query;
        await User.paginate({}, { select: 'emailTutor namePet rga', page, limit }).then((users) => {
            return res.json({
                erro: false,
                users: users
            })
        }).catch((erro) => {
            return res.status(400).json({
                erro: true,
                code: 106,
                message: "Erro: Não foi possivel executar a solicitação!"
            })
        })
    }

    async show(req, res) {
        User.findOne({ _id: req.params.id }, '_id emailTutor namePet rga raca sexPet createdAt  updatedAt originalName fileName ').then((user) => {
            return res.json({
                error: false,
                user:user
            })
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possivel executar a solicitação!"
            })
        })
    }

    async store(req, res) {

        //validando com Yup
        const schema = Yup.object().shape({
            emailTutor: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
            namePet: Yup.string(),
            rga: Yup.number(),
            raca: Yup.string(),
            sexPet: Yup.string()

        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Campos Email do Tutor e Senha são obrigatorios! (Senha minima de 6 digitos)"
            });
        }

        const emailExiste = await User.findOne({ emailTutor: req.body.emailTutor });
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: email do Tutor já cadastrado!"
            });
        }
        var dados = req.body;
        dados.password = await bcrypt.hash(dados.password, 7);

        const user = await User.create(dados, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: O Pet Não foi cadastrados com sucesso"
            });

            return res.status(200).json({
                error: false,
                message: "Pet cadastrado com sucesso!",
                dados: user
            })
        });


    };
    
    async update(req,res){
        const schema = Yup.object().shape({
            _id: Yup.string()
            .required(),
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

        const { _id, emailTutor } = req.body;

        const usuarioExiste = await User.findOne({_id});

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

    async delete(req, res) {

        const usuarioExiste = await User.findOne({ _id: req.params.id });
        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 121,
                messagem: "Erro: Usuário não encontrado!"
            })
        }

        const user = await User.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 122,
                message: "Erro: Usuário nao foi apagado com sucesso!"

            })
        });

        return res.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        });
    }
}

export default new UserController();