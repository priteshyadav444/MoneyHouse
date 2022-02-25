const express = require("express")
const router = express.Router();
const File = require("../models/file")

router.get("/:uuid", async (req, res) => {
    const { uuid } = req.params;
    try {
        const file = await File.findOne({ uuid });
        if (!file) {
            return res.render("download", { error: "Something went Wrong ;(" });
        }

        return res.render("download", { uuid: file.uuid, size: file.size, filename: file.filename, link: `${process.env.BASE_URL}/files/download/${file.uuid}` })
    } catch (error) {
        return res.render("download", { error: "Something went Wrong ;(" });
    }

})

module.exports = router