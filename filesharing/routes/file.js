const express = require('express')
const router = express.Router();
const multer = require('multer')
const File = require("../models/file")
const { v4: uuid4 } = require("uuid")
const path = require("path");
const { CompareArrowsOutlined } = require('@material-ui/icons');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.random() * 1E9}-${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

let upload = multer({
    storage,
    limit: { fileSize: 100000 * 100 }
}).single('myFile');


router.post("/", (req, res) => {

    //store into file
    upload(req, res, async (err) => {
        //validate file

        if (!req.file) {
            return res.status(400).json({ error: "Please Select File" });
        }
        if (err) {
            return res.status(500).send({ err: err.message })
        }
        //store into database

        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size,
        })

        const response = await file.save();

        console.log(req.method + "  " + req.file.mimetype + "  " + req.file.size)
        return res.json({ file: `${process.env.BASE_URL}/files/${response.uuid}` })

    })
})

module.exports = router