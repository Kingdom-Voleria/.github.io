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

// Маршрут для обновления аватарки
app.post('/api/update-avatar', (req, res) => {
    const { civilnumber, avatar } = req.body;

    const user = users.find(u => u.civilnumber === civilnumber);
    if (!user) {
        return res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }

    user.avatar = avatar;
    console.log(`Аватарка пользователя ${user.fullname} обновлена`);

    res.json({ success: true, message: 'Аватарка обновлена', user });
});

// Маршрут для отображения списка пользователей
app.get('/api/users', (req, res) => {
    console.log('Список зарегистрированных пользователей:');
    users.forEach(user => {
        console.log(`ФИО: ${user.fullname}, Гражданский номер: ${user.civilnumber}, Аватар: ${user.avatar || 'не задан'}`);
    });

    res.json({ success: true, users });
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
