import express from "express";
import multer from "multer";

const router = express.Router();

const base = "https://NeedToFill.cs.colman.ac.il/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').slice(1).join('.');
        cb(null, Date.now() + "." + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single("file"), function (req, res) { 
    if (req.file) {
        console.log("router.post(/file: " + base + req.file.path);
        res.status(200).send({ url: base + req.file.path });
    } else {
        res.status(400).send("No file uploaded");
    }
});

export default router;
