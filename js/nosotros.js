// JavaScript para la página de Nosotros de UVA
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const navbar = document.querySelector('.navbar');
    
    // Efecto de scroll para la navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const elementsToAnimate = document.querySelectorAll('.founder-card, .mvv-card, .why-card, .timeline-item, .stat-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contador animado para estadísticas
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Activar contadores cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue && !statValue.classList.contains('animated')) {
                    statValue.classList.add('animated');
                    const value = statValue.textContent;
                    const number = parseInt(value.replace(/\D/g, ''));
                    if (!isNaN(number)) {
                        statValue.textContent = '0';
                        setTimeout(() => {
                            animateCounter(statValue, number);
                            // Restaurar el texto original después de la animación
                            setTimeout(() => {
                                statValue.textContent = value;
                            }, 2000);
                        }, 300);
                    }
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => statsObserver.observe(card));

    // Interacción con tarjetas de fundadores
    const founderCards = document.querySelectorAll('.founder-card');
    founderCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Efecto sutil de resaltado
            this.style.borderColor = 'var(--uva-green)';
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = 'transparent';
            } else {
                this.style.borderColor = 'var(--uva-purple)';
            }
        });

        // Click para mostrar más información (futuro)
        card.addEventListener('click', function() {
            console.log(`Clicked on founder ${index + 1}`);
            // Aquí podrías abrir un modal con más información
        });
    });

    // Efecto parallax sutil en el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = `${1 - (scrolled / window.innerHeight) * 0.5}`;
        }
    });

    // Animación de entrada para el badge del hero
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        setTimeout(() => {
            heroBadge.style.animation = 'bounceIn 0.8s ease';
        }, 500);
    }

    // Tooltip para skills
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });

        skill.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Sistema de navegación suave entre secciones
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Destacar timeline item actual mientras scrolleas
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1.05)';
                entry.target.querySelector('.timeline-year').style.background = 'var(--uva-green)';
                
                setTimeout(() => {
                    entry.target.style.transform = '';
                    entry.target.querySelector('.timeline-year').style.background = 'var(--uva-purple)';
                }, 600);
            }
        });
    }, { threshold: 0.8 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Sistema de lectura de progreso
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--uva-purple), var(--uva-green));
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Easter egg: Konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Cambiar temporalmente los íconos de los fundadores
        const founderInitials = document.querySelectorAll('.founder-initial');
        founderInitials.forEach(initial => {
            const originalText = initial.textContent;
            initial.textContent = '🍇';
            initial.style.fontSize = '3rem';
            
            setTimeout(() => {
                initial.textContent = originalText;
                initial.style.fontSize = '';
            }, 3000);
        });

        // Mostrar mensaje divertido
        showNotification('¡Has encontrado las uvas secretas! 🍇🎉');
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--uva-green);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideInRight 0.5s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Función global para compartir en redes sociales
    window.UVA = window.UVA || {};
    window.UVA.shareOnSocial = function(platform) {
        const url = window.location.href;
        const text = 'Conoce a UVA - Cultivamos tu futuro digital';
        
        let shareUrl;
        switch(platform) {
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    // Preload de imágenes (si las tienes)
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Analytics tracking (opcional)
    function trackSectionView(sectionName) {
        console.log(`Section viewed: ${sectionName}`);
        // Aquí podrías enviar a Google Analytics:
        // gtag('event', 'section_view', {
        //     'section_name': sectionName,
        //     'event_category': 'engagement'
        // });
    }

    // Tracking de secciones visibles
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionClass = entry.target.className.split(' ')[0];
                trackSectionView(sectionClass);
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));
});

// Estilos para animaciones adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);
