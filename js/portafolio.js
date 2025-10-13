// JavaScript para la página de Portafolio de UVA
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const navbar = document.querySelector('.navbar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const modal = document.getElementById('projectModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');

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

    // Sistema de filtrado de proyectos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos con animación
            filterProjects(filter);
            
            // Analytics
            trackFilterUsage(filter);
        });
    });

    function filterProjects(filter) {
        projectCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                // Mostrar con delay escalonado
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
            } else {
                // Ocultar
                card.classList.add('hidden');
            }
        });
    }

    // Datos detallados de los proyectos
    const projectsData = {
        '1': {
    title: 'Profesor Cheddar - Plataforma Gamificada de Aprendizaje Python',
    client: 'Instituciones Educativas & Estudiantes Autodidactas',
    duration: '6 meses',
    category: 'EdTech Platform',
    challenge: 'Mi institucion educativas enfrento un casi 60% de abandono en la tecnica en programación de software. Los estudiantes se desmotivan con PowerPoints estáticos, no hay seguimiento real del progreso individual, y la enseñanza tradicional falla en mantener el engagement. Los profesores carecen de herramientas para identificar dónde exactamente se atascan sus alumnos, resultando en generaciones que "aprueban" sin dominar el lenguaje.',
    solution: 'Creamos una plataforma revolucionaria que convierte Python en una experiencia RPG adictiva. Sistema de progresión con niveles, XP y 4 fases de edad evolutivas. Incluye 4 especializaciones profesionales (IA, Análisis de Datos, Ciencia de Datos, Desarrollo Software), dos modelos de clase (Tutorial interactivo y Swipe cards móviles), sistema de logros desbloqueables y panel administrativo profesional con analytics educativos avanzados para seguimiento detallado del progreso estudiantil.',
    technologies: ['PHP 8.1', 'MySQL 8.0', 'JavaScript ES6', 'CSS3 Grid/Flexbox', 'SQL Triggers & Procedures'],
    results: [
        { metric: '65%', label: 'Reducción en tasa de abandono' },
        { metric: '85%', label: 'Aumento en completación de módulos' },
        { metric: '3.5x', label: 'Mayor tiempo de permanencia' },
        { metric: '92%', label: 'Satisfacción estudiantil proyectada' }
    ],
    testimonial: '"Intenté aprender Python tres veces antes y siempre lo dejaba a las dos semanas. Con Profesor Cheddar llevo 3 meses y ya elegí mi especialización en IA. Ver mi avatar evolucionar de niño a adolescente fue increíblemente motivador. Esto debería existir en todas las universidades." - Samantha Usma Rodas, Estudiante de la institucion'
    },
        '2': {
            title: 'Sistema de Gestión - Consultorio Médico',
            client: 'Consultorio Médico Integral',
            duration: '8 semanas',
            category: 'Web App & Gestión',
            challenge: 'El consultorio manejaba citas en papel, historias clínicas físicas dispersas y no tenía forma eficiente de comunicarse con pacientes para recordatorios. El personal perdía horas buscando documentos y coordinando citas.',
            solution: 'Creamos una plataforma web completa para gestión de pacientes, historias clínicas digitales, agendamiento inteligente de citas con recordatorios automáticos por WhatsApp y email, y módulo de facturación. Todo cumpliendo con normativas de protección de datos médicos.',
            technologies: ['Vue.js', 'Python Django', 'PostgreSQL', 'Twilio', 'AWS S3'],
            results: [
                { metric: '60%', label: 'Reducción en tiempo administrativo' },
                { metric: '90%', label: 'Satisfacción de pacientes' },
                { metric: '85%', label: 'Reducción en no-shows' },
                { metric: '100%', label: 'Cumplimiento normativo' }
            ],
            testimonial: '"El sistema nos permitió enfocarnos en lo importante: nuestros pacientes. Ya no perdemos tiempo buscando papeles." - Dra. Carolina Díaz'
        }
    };

    // Mostrar detalles del proyecto en modal
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-project');
            showProjectModal(projectId);
        });
    });

    function showProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <h2 style="font-size: 2rem; color: var(--uva-dark); margin-bottom: 1rem;">${project.title}</h2>
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <span style="background: var(--uva-light); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                    ${project.client}
                </span>
                <span style="background: var(--uva-green); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                    ${project.duration}
                </span>
                <span style="background: var(--uva-purple); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                    ${project.category}
                </span>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--uva-dark); margin-bottom: 1rem;">El Desafío</h3>
                <p style="color: var(--gray-medium); line-height: 1.8;">${project.challenge}</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--uva-dark); margin-bottom: 1rem;">La Solución</h3>
                <p style="color: var(--gray-medium); line-height: 1.8;">${project.solution}</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--uva-dark); margin-bottom: 1rem;">Tecnologías Utilizadas</h3>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${project.technologies.map(tech => `
                        <span style="background: var(--gray-light); color: var(--uva-purple); padding: 0.5rem 1rem; border-radius: 15px; font-size: 0.85rem; font-weight: 500;">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--uva-dark); margin-bottom: 1.5rem;">Resultados Medibles</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem;">
                    ${project.results.map(result => `
                        <div style="background: var(--gray-light); padding: 1.5rem; border-radius: 12px; text-align: center;">
                            <div style="font-size: 2rem; font-weight: 700; color: var(--uva-green); margin-bottom: 0.5rem;">
                                ${result.metric}
                            </div>
                            <div style="font-size: 0.85rem; color: var(--gray-medium);">
                                ${result.label}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, var(--uva-light), var(--uva-medium)); padding: 2rem; border-radius: 15px; color: white;">
                <p style="font-style: italic; line-height: 1.8; margin: 0;">
                    ${project.testimonial}
                </p>
            </div>
            
            <div style="margin-top: 2rem; text-align: center;">
                <a href="contacto.html" style="background: var(--uva-purple); color: white; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; display: inline-block; transition: all 0.3s ease;">
                    Quiero un proyecto así
                </a>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Analytics
        trackProjectView(projectId);
    }

    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
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
    const elementsToAnimate = document.querySelectorAll('.project-card, .testimonial-card, .process-step, .tech-category');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contador animado para estadísticas
    function animateCounter(element, target, duration = 2000) {
        const isPercentage = target.toString().includes('%') || target.toString().includes('+');
        const numericTarget = parseInt(target.toString().replace(/\D/g, ''));
        const increment = numericTarget / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                let displayValue = Math.floor(current);
                if (isPercentage && target.toString().includes('%')) {
                    element.textContent = displayValue + '%';
                } else if (target.toString().includes('+')) {
                    element.textContent = displayValue + '+';
                } else {
                    element.textContent = displayValue;
                }
            }
        }, 16);
    }

    // Activar contadores cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        const target = stat.textContent;
                        stat.textContent = '0';
                        setTimeout(() => {
                            animateCounter(stat, target);
                        }, 300);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Efecto parallax sutil en el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = `${1 - (scrolled / window.innerHeight) * 0.5}`;
        }
    });

    // Interacción con tarjetas de proyectos
    projectCards.forEach(card => {
        // Efecto de tilt sutil al mover el mouse
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Lazy loading para imágenes (si las tienes)
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

    // Sistema de búsqueda de proyectos (opcional)
    function createSearchBar() {
        const filtersSection = document.querySelector('.filters-section .container');
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            margin-top: 2rem;
            text-align: center;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar proyectos...';
        searchInput.style.cssText = `
            padding: 1rem 1.5rem;
            border: 2px solid var(--gray-light);
            border-radius: 50px;
            font-size: 1rem;
            width: 100%;
            max-width: 400px;
            transition: all 0.3s ease;
        `;
        
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterProjectsBySearch(searchTerm);
        });
        
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = 'var(--uva-purple)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = 'var(--gray-light)';
        });
        
        searchContainer.appendChild(searchInput);
        filtersSection.appendChild(searchContainer);
    }

    function filterProjectsBySearch(searchTerm) {
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const shouldShow = title.includes(searchTerm) || description.includes(searchTerm);
            
            if (shouldShow) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Activar búsqueda (comentado por defecto)
    // createSearchBar();

    // Sistema de compartir proyectos
    window.UVA = window.UVA || {};
    window.UVA.shareProject = function(projectId, platform) {
        const project = projectsData[projectId];
        if (!project) return;
        
        const url = window.location.href;
        const text = `Mira este proyecto de UVA: ${project.title}`;
        
        let shareUrl;
        switch(platform) {
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    // Analytics tracking
    function trackFilterUsage(filter) {
        console.log(`Filter used: ${filter}`);
        // Aquí podrías enviar a Google Analytics:
        // gtag('event', 'filter_click', {
        //     'filter_type': filter,
        //     'event_category': 'portfolio'
        // });
    }

    function trackProjectView(projectId) {
        console.log(`Project viewed: ${projectId}`);
        // Aquí podrías enviar a Google Analytics:
        // gtag('event', 'project_view', {
        //     'project_id': projectId,
        //     'event_category': 'portfolio'
        // });
    }

    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--uva-green)' : 'var(--uva-purple)'};
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

    // Detectar si el usuario está interesado (tiempo en página)
    let timeOnPage = 0;
    const timeInterval = setInterval(() => {
        timeOnPage++;
        
        // Si el usuario pasa más de 30 segundos, mostrar CTA
        if (timeOnPage === 30) {
            showEngagementCTA();
        }
        
        // Si pasa más de 2 minutos, ofrecer ayuda
        if (timeOnPage === 120) {
            showNotification('¿Necesitas ayuda para elegir? Contáctanos por WhatsApp', 'info');
        }
    }, 1000);

    function showEngagementCTA() {
        const existingCTA = document.getElementById('engagement-cta');
        if (existingCTA) return;
        
        const cta = document.createElement('div');
        cta.id = 'engagement-cta';
        cta.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; background: var(--uva-purple); color: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 8px 30px rgba(107, 44, 135, 0.4); max-width: 300px; z-index: 9999; animation: bounceIn 0.6s ease;">
                <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">×</button>
                <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">¿Te gusta lo que ves?</h4>
                <p style="font-size: 0.9rem; margin-bottom: 1rem; opacity: 0.9;">Conversemos sobre tu proyecto</p>
                <a href="contacto.html" style="background: white; color: var(--uva-purple); padding: 0.75rem 1.5rem; border-radius: 50px; text-decoration: none; font-weight: 600; display: inline-block;">
                    Iniciar conversación
                </a>
            </div>
        `;
        
        document.body.appendChild(cta);
    }

    // Limpiar intervalo al salir
    window.addEventListener('beforeunload', () => {
        clearInterval(timeInterval);
    });

    // Navegación suave
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

    // Precargar contenido del modal para mejor rendimiento
    Object.keys(projectsData).forEach(projectId => {
        const btn = document.querySelector(`[data-project="${projectId}"]`);
        if (btn) {
            btn.addEventListener('mouseenter', function() {
                // Precarga de datos
                console.log(`Preloading project ${projectId}`);
            });
        }
    });
});

// Estilos para animaciones adicionales
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);
