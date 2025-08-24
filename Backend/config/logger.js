import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Stream for all Logs
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "../logs/access.log"),
    { flags: "a" }
);
// Stream for Error Logs
const errorLogStream = fs.createWriteStream(
    path.join(__dirname, "../logs/error.log"),
    { flags: "a" }
);

export default {
    access:{
        stream : accessLogStream, 
        skip : (req,res) => res.statusCode >= 400
    },
    error:{
        stream : errorLogStream,
        skip : (req,res)=> res.statusCode < 400
    }
};
