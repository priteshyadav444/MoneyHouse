const express = require("express")
const router = express.Router();
const File = require("../models/file")


router.get("/", (req, res) => {
    res.render("upload")
})
module.exports = router;