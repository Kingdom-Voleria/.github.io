const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Подключаем middleware
app.use(cors());
app.use(express.json());

// Временное хранилище пользователей (вместо базы данных)
let users = [];

// Маршрут для регистрации
app.post('/api/register', (req, res) => {
    const { fullname, civilnumber } = req.body;

    // Проверка на пустые поля
    if (!fullname || !civilnumber) {
        return res.status(400).json({ success: false, message: 'Все поля обязательны' });
    }

    // Проверка на уникальность civilnumber
    const existing = users.find(u => u.civilnumber === civilnumber);
    if (existing) {
        return res.status(400).json({ success: false, message: 'Пользователь уже зарегистрирован' });
    }

    // Добавляем пользователя в массив
    const newUser = { fullname, civilnumber, avatar: null };
    users.push(newUser);

    // Логирование с полным выводом ФИО и гражданского номера
    console.log(`Зарегистрирован: ${newUser.fullname}, Гражданский номер: ${newUser.civilnumber}`);

    // Ответ с информацией о пользователе
    res.json({ success: true, message: 'Регистрация прошла успешно', user: newUser });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

// Маршрут для удаления всех пользователей
app.delete('/api/users', (req, res) => {
    users = [];  // Очистить массив пользователей
    console.log('Все пользователи удалены.');
    res.json({ success: true, message: 'Все пользователи были удалены.' });
});
