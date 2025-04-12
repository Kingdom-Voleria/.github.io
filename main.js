
// index
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    
    function checkVisibility() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8) && 
                              (rect.bottom >= window.innerHeight * 0.2);
            
            if (isVisible) {
                section.classList.add('visible');
            }
        });
    }

    checkVisibility();

    window.addEventListener('scroll', checkVisibility);
});

document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// elections
document.addEventListener('DOMContentLoaded', function() {
    const electionBlocks = document.querySelectorAll('.selection-block, .title-active, .title-inactive');
    
    function checkElectionVisibility() {
        electionBlocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8) && 
                              (rect.bottom >= window.innerHeight * 0.2);
            
            if (isVisible) {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });
    }

    electionBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    checkElectionVisibility();
    window.addEventListener('scroll', checkElectionVisibility);
});

// vote
document.querySelectorAll('.vote-option').forEach(option => {
    option.addEventListener('click', function() {
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            
            document.querySelectorAll('.vote-option').forEach(opt => {
                opt.classList.remove('selected');
            });

            this.classList.add('selected');
        }
    });

    const radio = option.querySelector('input[type="radio"]');
    if (radio && radio.checked) {
        option.classList.add('selected');
    }
});

// profile
document.addEventListener('DOMContentLoaded', function () {
    // Получаем текущий URL страницы
    const currentPage = window.location.pathname.split('/').pop();

    // Проверка для profile.html
    if (currentPage === 'profile.html') {
        // Получаем данные пользователя из LocalStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // Если пользователь не найден, перенаправляем на страницу регистрации
        if (!user) {
            console.log('Пользователь не найден, перенаправляем на регистрацию');
            window.location.href = 'registration.html';
            return;
        }

        // Заполняем данные профиля
        const fullnameElement = document.getElementById('userFullname');
        const civilnumberElement = document.getElementById('userCivilnumber');
        const avatarPreview = document.getElementById('avatarPreview');
        const avatarInput = document.getElementById('avatarInput');

        // Проверим существование элементов перед манипуляциями
        if (fullnameElement && civilnumberElement && avatarPreview) {
            fullnameElement.textContent = user.fullname;
            civilnumberElement.textContent = user.civilnumber;

            // Отображаем аватар, если он есть, иначе используем изображение по умолчанию
            if (user.avatar) {
                avatarPreview.src = user.avatar;
            } else {
                avatarPreview.src = 'image/profile-empty.png'; // Путь к изображению по умолчанию
            }

            // Обработчик для обновления аватарки
            if (avatarInput) {
                avatarInput.addEventListener('change', function () {
                    const file = avatarInput.files[0];
                    if (!file) {
                        alert('Пожалуйста, выберите файл');
                        return;
                    }

                    // Создаем URL для изображения
                    const reader = new FileReader();
                    reader.onloadend = function () {
                        // Обновляем аватар в localStorage
                        user.avatar = reader.result;
                        localStorage.setItem('user', JSON.stringify(user));

                        // Обновляем аватар на странице
                        avatarPreview.src = reader.result;
                    };
                    reader.readAsDataURL(file);
                });
            }
        } else {
            console.error('Одного из элементов нет на странице');
        }
    }

    // Проверка для registration.html
    if (currentPage === 'registration.html') {
        // Получаем данные пользователя из LocalStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // Если пользователь существует и мы на странице регистрации, перенаправляем на профиль
        if (user) {
            console.log('Пользователь найден, перенаправляем на профиль');
            window.location.href = 'profile.html';
            return;
        }

        const registerForm = document.querySelector('.register-form');

        if (registerForm) {
            registerForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const fullname = document.getElementById('fullname').value;
                const civilnumber = document.getElementById('civilnumber').value;

                if (!fullname || !civilnumber) {
                    showError('Все поля обязательны для заполнения.');
                    return;
                }

                // Отправка данных на правильный маршрут
                fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: fullname,
                        civilnumber: civilnumber
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        showError(data.message || 'Произошла ошибка при регистрации.');
                    } else {
                        // Сохраняем пользователя в LocalStorage
                        localStorage.setItem('user', JSON.stringify(data.user));

                        // Перенаправление на страницу профиля
                        window.location.href = 'profile.html';
                    }
                })
                .catch(error => {
                    console.error('Ошибка при отправке данных:', error);
                    showError('Не удалось подключиться к серверу. Попробуйте позже.');
                });
            });
        }

        // Функция отображения ошибки
        function showError(message) {
            const existingError = document.querySelector('.error-message');
            if (existingError) existingError.remove();

            const errorBox = document.createElement('div');
            errorBox.className = 'error-message';
            errorBox.textContent = message;

            // Применим стили
            Object.assign(errorBox.style, {
                backgroundColor: '#ffe5e5',
                color: '#cc0000',
                padding: '10px',
                borderRadius: '8px',
                marginTop: '12px',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                userSelect: 'text',
                textAlign: 'center',
                maxWidth: '100%',
                transition: 'opacity 0.5s ease',
            });

            const registrationForm = document.querySelector('.register-form');
            registrationForm.parentNode.insertBefore(errorBox, registrationForm.nextSibling);

            setTimeout(() => {
                errorBox.style.opacity = '0';
                setTimeout(() => {
                    errorBox.remove();
                }, 500);
            }, 5000);
        }
    }
});

// Анимация появления формы
const registrationForm = document.querySelector('.registration-form');
if (registrationForm) {
    registrationForm.style.opacity = '0';
    registrationForm.style.transform = 'translateY(20px)';
    registrationForm.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    requestAnimationFrame(() => {
        registrationForm.style.opacity = '1';
        registrationForm.style.transform = 'translateY(0)';
    });
}