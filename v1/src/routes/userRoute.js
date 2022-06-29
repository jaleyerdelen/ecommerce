const express = require("express")
const { updateUser } = require("../controllers/user")
const { verifyToken, userRole } = require("../middlewares/authMiddleware")


const router = express.Router()

router.put("/:id", verifyToken ,userRole("client"), updateUser )


module.exports = {
    router
}
