import { Schema,mongoose } from 'mongoose';

const userSchema = new Schema({
    
    username:{
        type:String,
        index:true,
        required:true,
        unique:true,
        maxlength:20,
        trim:true
    },
    email:{
        type:String,match: /^\S+@\S+\.\S+$/,
        index:true,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
        maxlength:60
    },
});
const User = mongoose.model('User',userSchema);
export default User;
