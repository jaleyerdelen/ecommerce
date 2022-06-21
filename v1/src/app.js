const express = require('express')
const app = express()
const config = require("./config")
const { userRoute } = require("./routes")

config()

app.get("/", (req,res) => {
    res.status(200).send("app.js")
})

app.use(express.json())
app.use("/user", userRoute.router)

app.listen(process.env.APP_PORT, () => {
    console.log("server is running")
})