const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Настройка multer для сохранения файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Папка для хранения загруженных файлов
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Раздача статических файлов
app.use(express.static('public'));

// Маршрут для загрузки файлов
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'Файл успешно загружен' });
});

// Маршрут для скачивания файлов
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);
    if (fs.existsSync(filepath)) {
        res.download(filepath);
    } else {
        res.status(404).send('Файл не найден');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});