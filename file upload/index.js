const express = require('express');
const app = express();
const multer = require('multer')
const path = require('path')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { 
        cb(null, true)
    } else {
        cb(new Error('only images are allowed'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter
})

app.get('/', (req, res) => {
    res.render("myform");
});

app.post('/submitform', upload.single('userfile'), (req, res) => {
    res.send(req.file)
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
