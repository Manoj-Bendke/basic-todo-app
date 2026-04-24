import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
import { dbconnecturl } from "./src/config/config.js"
import { UserRouter } from "./src/Routes/UserRoutes.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/user", UserRouter)

async function startServer() {
  try {
    await mongoose.connect(dbconnecturl)
    console.log("db connection successful")
  } catch (error) {
    console.log("Could not connect to db", error)
  }
}
startServer()
app.listen(3000, () => {
  console.log("Listening on port 3000")
})
