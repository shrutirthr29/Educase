import dotenv from "dotenv";
import express from "express"
import mysql from "mysql2"
import bodyParser from "body-parser";

dotenv.config({
    path: './env'
})

const app = express();
app.use(bodyParser.json());


// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log('MySQL connected...');
// });

// export default db;


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



//routes import
import userRouter from "./routes/routes.js"

//routes declaration
app.use('/api',userRouter)

export {app}