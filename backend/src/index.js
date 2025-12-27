import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/ENV.js";

connectDB()
.then(()=> {
    const PORT = ENV.PORT ?? 3000;
    app.listen(PORT, ()=> {
        console.log(`Server is running at PORT: ${PORT}`)
    })
})
.catch((error)=> {
    console.log(`ERROR: ${error.message}`);
})
