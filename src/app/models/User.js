import mongoose from 'mongoose';

const User = new mongoose.Schema({
    
    emailTutor:{
        type:String,
        required:true
    },
    namePet:{
      type:String,
      required: true
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
    /*password:{
        type:String,
        require: true
    }*/
},{
    timestamps: true,
});

export default mongoose.model('user', User);