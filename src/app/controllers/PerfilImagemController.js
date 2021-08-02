import User from '../models/User';
import fs from 'fs';

class PerfilImagemController{
    async update(req, res){
        console.log(req.file);

        const dadosImagem = {
            originalName: req.file.originalname,
            fileName: req.file.filename 
        }
        await User.findOne({_id: req.userId}, '_id fileName').then((user)=>{
            console.log(user);
        }).catch((err)=>{
            return res.status(400).json({
                error:true,
                code:128,
                message: "Erro nome da img não encontrada"
            })
        })
        await User.updateOne({_id: req.userId}, dadosImagem,(err)=>{
            if(err) return res.status(400),json({
                error:true,
                code:129,
                message:"Erro imagem do perfil não foi editado com sucesso."
            })
        })

        console.log(dadosImagem)
        return res.json({
            error: false,
            message: "Upload img user"
        })
    }
}
export default new PerfilImagemController();