const express = require("express")
const { updateUser, deleteUser } = require("../controllers/user")
const { verifyToken, userRole } = require("../middlewares/authMiddleware")


const router = express.Router()

router.put("/:id", verifyToken ,userRole("client"), updateUser )
router.delete("/:id", verifyToken ,userRole("admin"), deleteUser)
module.exports = {
    router
}
