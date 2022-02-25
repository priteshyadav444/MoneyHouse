const express = require("express")
const app = express()
const PORT = process.PORT || 3000
const connectDb = require('./config/dbconnection')
const file = require('./routes/file')
const path = require("path")
app.use(express.static(path.join("public")))
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use("/", require("./routes/upload"))
app.use("/api/uploads/", file)
app.use("/files/", require("./routes/showfile"))
app.use("/files/download/", require("./routes/download"))


connectDb();
app.listen(PORT, () => {
    console.log("Server running on:" + PORT)
})