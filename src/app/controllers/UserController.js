import User from '../models/User';


class UserController {
    async store(req, res) {
        
        const emailExiste = await User.findOne({ emailTutor: req.body.emailTutor });
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: email do Tutor já cadastrado!"
            });
        }
        if(!req.body.namePet || typeof req.body.namePet == undefined || req.body.namePet == null){
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
        }

        
        const rgaExiste = await User.findOne({rgaExiste:req.body.rgaExiste});
        if(rgaExiste){
            return res.status(400).json({
                error:true,
                code:105,
                message:"Erro: RGA já cadastrado!"
            });
        }
        if(!req.body.rgaExiste || typeof req.body.rgaExiste == String || req.body.rgaExiste == null){
            return res.status(400).json({
                error:true,
                code:106,
                message:"Erro: Apenas numeros no campo rga!"
            });
        }

        /*if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
            return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Por favor, preencher o campo senha!"
            });
        }*/

        const user = await User.create(req.body, (err) => {
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

    }
}

export default new UserController();