const express = require("express")
const app = express()
const cors = require("cors")
const { connectDB } = require("./config/db")
require("dotenv").config()

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors({
    origin: ["http://localhost:5173", 'https://eatoes-frontend.onrender.com/'],
    credentials: true
}))
app.use(express.json())

app.use("/menu", menuRoutes)
app.use("/order", orderRoutes)
app.get("/", (req, res) => {
    res.send("API is running...")
})

// console.log("working")

connectDB()
.then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
        console.log(`Server is sucessfully running on PORT ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("DATABASE can not be connected")
});