import { Schema,mongoose } from 'mongoose';

const taskSchema = new Schema({
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
        status:{
            type:String,
            enum:['todo', 'in-progress', 'done'],
            default:'todo',
            required : true
        },
        deadline:{
            type : Date,
            required:true
        },
        project_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Project',
            required:true
        }
    },
    { 
        timestamps : true 
    },
);

const Task = mongoose.model('Task',taskSchema);
export default Task;