import { Schema,mongoose } from 'mongoose';

const projectSchema = new Schema({

    title:{
        required:true,
        type:String,
        maxLength:35
    },
    description:{
        type:String,
        maxLength:150
    },
    status:{
        type:String,
        enum: ['active','completed'],
        default:'active',
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    },
    { timestamps: true }
);

const Project = mongoose.model('Project',projectSchema);
export default Project;