import { server } from "./utils/Socket.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

connectDB()
.then(()=> {
    const PORT = process.env.PORT ?? 3000;
    server.listen(PORT, ()=> {
        console.log(`Server is running at PORT: ${PORT}`)
    })
})
.catch((error)=> {
    console.log(`ERROR: ${error.message}`);
})
