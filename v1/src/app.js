const express = require('express')
const app = express()
const config = require("./config")
const { userRoute, productRoute, authRoute } = require("./routes")
const mongoose = require("mongoose")
config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connection successfull"))
.catch(()=> console.log("DB connection failed"))

app.get("/", (req,res) => {
    res.status(200).send("app.js")
})

app.use(express.json())
app.use("/user", userRoute.router)
app.use("/product", productRoute.router)
app.use("/auth", authRoute.router)

app.listen(process.env.APP_PORT, () => {
    console.log("server is running")
})