const express = require("express")
const { updateUser, deleteUser, getUser, getAllUsers, userStatus } = require("../controllers/user")
const { verifyToken, userRole } = require("../middlewares/authMiddleware")


const router = express.Router()

router.put("/:id", verifyToken ,userRole("client"), updateUser )
router.delete("/:id", verifyToken ,userRole("admin"), deleteUser)
router.get("/userStatus", verifyToken ,userRole("admin"), userStatus)
router.get("/:id", verifyToken, getUser)
router.get("/", getAllUsers )


module.exports = {
    router
}
