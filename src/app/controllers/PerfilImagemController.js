import User from '../models/User';
import fs from 'fs';

class PerfilImagemController{
    async update(req, res){
       

        const dadosImagem = {
            originalName: req.file.originalname,
            fileName: req.file.filename 
        }
        await User.findOne({_id: req.userId}, '_id fileName').then((user)=>{
            
            req.dadosImgUser = user.fileName;
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

        const ImgAntiga = req.file.destination + "/" + req.dadosImgUser;
        

        fs.access(ImgAntiga, (err)=>{
            if(!err){
                fs.unlink(ImgAntiga, err =>{

                })
            }
        })

      
        return res.json({
            error: false,
            message: "Imagem do perfil editada com sucesso!"
        })
    }
}
export default new PerfilImagemController();