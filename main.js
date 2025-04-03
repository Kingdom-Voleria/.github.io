// main

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



// ЭТО ПРИМЕР - нужно будет адаптировать под вашу систему профилей
/*
document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные пользователя
    const userProfile = getUserProfile(); 
    
    // Находим все возможные блоки статусов
    const pendingStatus = document.querySelector('.status-pending');
    const approvedStatus = document.querySelector('.status-approved');
    const rejectedStatus = document.querySelector('.status-rejected');
    
    // Сначала скрываем все статусы
    pendingStatus.style.display = 'none';
    approvedStatus.style.display = 'none';
    rejectedStatus.style.display = 'none';
    
    // Показываем только нужный статус в зависимости от verificationStatus
    switch(userProfile.verificationStatus) {
        case 'approved':
            approvedStatus.style.display = 'flex';
            break;
        case 'rejected':
            rejectedStatus.style.display = 'flex';
            break;
        case 'pending':
        default:
            pendingStatus.style.display = 'flex';
    }
});

function getUserProfile() {
    // Здесь будет запрос к API или получение данных из хранилища
    return {
        verificationStatus: "pending" // или "approved", или "rejected"
    };
}
*/