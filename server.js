import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectToDB from "./database/db.js"
const app = express()

const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())



app.get("/", (req, res) => {
    res.send("Hello Avinash")
})

import UserRoute from "./routes/UserRoute.js"
app.use("/api/user", UserRoute)

app.listen(port, () => {
    connectToDB()
    console.log(`server is running on ${port} number `);
})


