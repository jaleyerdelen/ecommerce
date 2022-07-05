const express = require("express")
const {  createProduct, deleteProduct, getProduct, getAllProduct, updateProduct} = require("../controllers/productController")
const { verifyToken, userRole } = require("../middlewares/authMiddleware")


const router = express.Router()
router.post("/", verifyToken, userRole("admin"), createProduct )
 router.put("/:id", verifyToken ,userRole("admin"), updateProduct)
router.delete("/:id", verifyToken ,userRole("admin"), deleteProduct)
router.get("/:id", getProduct)
router.get("/", getAllProduct )



module.exports = {
    router
}
