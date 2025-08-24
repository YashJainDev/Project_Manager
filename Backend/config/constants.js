import "dotenv/config";
const corsOption = {
    origin : process.env.FRONTEND_URL
}

export default {
    corsOption,
}