const user = (req, res) => {
      res.status(200).json({
        message: "success"
      })
}

const userpost = (req, res) => {
    const name = req.body.name
    console.log(name)
    res.status(200).json({
        message:"name created",
        status: "success"
    })      
}
 
module.exports = {
    user,
    userpost
}