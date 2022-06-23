const express = require("express")
const { user, userpost } = require("../controllers/user")

const router = express.Router()

router.get("/", user)
router.post("/userpost", userpost)

module.exports = {
    router
}
