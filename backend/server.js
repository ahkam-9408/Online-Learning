let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require("crypto");

// Express Route
const studentRoute = require('../backend/routes/student.routes')
const adminRoute = require('../backend/routes/admin.routes')
const lecturerRoute = require('../backend/routes/lecturer.routes')

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connecting mongoDB Database
const mongoURI =
    "mongodb://localhost:27017/abc_institute_database";

const conn = mongoose.createConnection(mongoURI);

mongoose.connect(mongoURI, { useNewUrlParser: true });

let gfs;

conn.once("open",()=> {
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection("images");
    console.log("Database successfully connected")
})

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/student', studentRoute)
app.use('/admin', adminRoute)
app.use('/lecturer', lecturerRoute)

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: "images"
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

app.post("/image/upload-image/", upload.single("img"), (req, res, err) => {
    res.send(req.files);
});

app.get("/image/get-image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            console.log("No file exists");
            return res.status(404).json({
                err: "No file exists"
            });
        }

        // Check if image
        if (file.contentType === "image/jpeg" || file.contentType === "image/png" || file.contentType === "image/jpg") {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            console.log("Not an image");
            res.status(404).json({
                err: "Not an image"
            });
        }
    });
});

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});