const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Настройка хранилища Multer
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Проверка наличия и создание папки для загрузок, если необходимо
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Подключение статических файлов
app.use(express.static('public'));

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Маршрут для обработки загрузки файла
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Файл успешно загружен');
});

// Маршрут для скачивания файла
app.get('/file', (req, res) => {
  const filename = req.query.filename;
  const filepath = path.join(uploadsDir, filename);
  if (fs.existsSync(filepath)) {
    res.download(filepath); // Отправляет файл на скачивание
  } else {
    res.status(404).send('Файл не найден');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});