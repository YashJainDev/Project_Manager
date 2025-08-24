import mongoose from 'mongoose';
import "dotenv/config"
const { MONGO_URI } = process.env;
const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    },
    maxPoolSize: 8,
};


export default async function connectToMongo() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('Mongo_DB URI Path environment variable is not set.');
        }
        await mongoose.connect(MONGO_URI, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('You successfully connected to MongoDB!');
    } catch (err) {
        console.log({
            mesage: "Error connecting with mongoDB!",
            Error: err
        });
        process.exit(1); // exit the process with failure (1)
    }

}

