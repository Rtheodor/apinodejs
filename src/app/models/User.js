import mongoose from 'mongoose';

const User = new mongoose.Schema({
  nome:{
      type:String,
      required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require: true
    },
},{
    timestamps: true,
});

export default mongoose.model('user', User);