import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const User = new mongoose.Schema({
    
    emailTutor:{
        type:String,
        required:true
    },
    password:{
       type:String,
       required: true
    },
    namePet:{
      type:String,
    },
    rga:{
        type:Number
    },
    raca:{
        type:String
    },
    sexPet:{
        type:String,
        required: true
    }
    
},{
    timestamps: true,
});

User.plugin(mongoosePaginate);
export default mongoose.model('user', User);