import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { string } from 'yup/lib/locale';

class UserController {
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

        if(!(await schema.isValid(req.body))){
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

        //abaixo esta a forma de validação sem o yup

        /*if(!req.body.namePet || typeof req.body.namePet == undefined || req.body.namePet == null){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Por favor, preencher o campo nome do Pet!"
            });
        }
        if(!req.body.emailTutor || typeof req.body.emailTutor == undefined || req.body.emailTutor == null){
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Error: Por favor, preencher o campo email do tutor!"
            });
        }*/

        
        /*const rgaExiste = await User.findOne({rgaExiste:req.body.rgaExiste});
        if(rgaExiste){
            return res.status(400).json({
                error:true,
                code:105,
                message:"Erro: RGA já cadastrado!"
            });
        }
        if(!req.body.rgaExiste || typeof req.body.rgaExiste == undefined || req.body.rgaExiste == null){
            return res.status(400).json({
                error:true,
                code:106,
                message:"Erro:Por favor preencher o campo rga!"
            });
        }


        
        /*if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
            return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Por favor, preencher o campo senha!"
            });
        }*/

        
        };
        async delete(req,res){

            const usuarioExiste = await User.findOne({_id: req.params.id});
            if(!usuarioExiste){
                return res.status(400).json({
                    error: true,
                    code:121,
                    messagem: "Erro: Usuário não encontrado!"
                })
            }

            const user = await User.deleteOne({_id: req.params.id},(err) =>{
                if(err) return res.status(400).json({
                    error:true,
                    code:122,
                    message:"Erro: Usuário nao foi apagado com sucesso!"

                })
            });

            return res.json({
                error:false,
                message:"Usuáriio apagado com sucesso!"
            });        
        }
}

export default new UserController();