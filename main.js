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
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const civilnumber = document.getElementById('civilnumber').value;

            
        });
    }

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
});