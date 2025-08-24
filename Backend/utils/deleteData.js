import { connect, disconnect } from 'mongoose';
import User from '../models/User.js';
import Project from '../models/Project.js';
import "dotenv/config";


// Database connection
connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB for seeding...'))
    .catch(err => console.error('Connection error:', err));

const deleteData = async () => {
    try {
        await User.deleteMany({ username: { $ne: 'test_user' } });
        await Project.deleteMany({});
        console.log('Users Deleted Succesfully');
    } catch (error) {
        console.error(error);
    } finally {
        disconnect();
    }

}

deleteData();