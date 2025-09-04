// JavaScript para la página de servicios de UVA
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const navbar = document.querySelector('.navbar');
    const planCards = document.querySelectorAll('.plan-card');
    const serviceItems = document.querySelectorAll('.service-item');

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

    // Navegación suave entre secciones
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para navbar fija
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Tracking de interacciones con planes
    planCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Si es el botón, no hacemos nada (ya tiene su función)
            if (e.target.classList.contains('plan-btn')) return;
            
            // Destacar temporalmente el plan seleccionado
            card.style.transform = 'translateY(-8px) scale(1.05)';
            card.style.boxShadow = '0 20px 60px rgba(107, 44, 135, 0.25)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 300);
            
            // Analytics (opcional)
            trackPlanInteraction(index);
        });
    });

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
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
    const elementsToAnimate = document.querySelectorAll('.plan-card, .service-item, .story-card, .process-step, .faq-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Funcionalidad para la tabla comparativa
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(107, 44, 135, 0.08)';
            this.style.transform = 'scale(1.02)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = '';
        });
    });

    // Contador animado para estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .result-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 16);
        });
    }

    // Activar contadores cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Funcionalidad para servicios adicionales
    serviceItems.forEach((item, index) => {
        const serviceLink = item.querySelector('.service-link');
        serviceLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animación de clic
            item.style.transform = 'translateY(-10px) scale(1.05)';
            
            setTimeout(() => {
                // Redirigir a contacto con parámetro del servicio
                const serviceName = item.querySelector('h3').textContent;
                window.location.href = `contacto.html?servicio=${encodeURIComponent(serviceName)}`;
            }, 200);
        });
    });

    // Sistema de comparación visual de planes
    let selectedPlans = [];
    
    function togglePlanComparison(planElement, planName) {
        if (selectedPlans.includes(planName)) {
            selectedPlans = selectedPlans.filter(p => p !== planName);
            planElement.classList.remove('comparing');
        } else {
            if (selectedPlans.length < 2) {
                selectedPlans.push(planName);
                planElement.classList.add('comparing');
            }
        }
        
        updateComparisonUI();
    }

    function updateComparisonUI() {
        const compareButton = document.getElementById('compare-button');
        if (selectedPlans.length > 1) {
            if (!compareButton) {
                createCompareButton();
            }
        } else {
            if (compareButton) {
                compareButton.remove();
            }
        }
    }

    function createCompareButton() {
        const button = document.createElement('button');
        button.id = 'compare-button';
        button.textContent = `Comparar ${selectedPlans.length} planes`;
        button.className = 'compare-btn';
        button.onclick = showComparison;
        
        document.body.appendChild(button);
    }

    function showComparison() {
        // Scroll a la tabla de comparación
        document.querySelector('.comparison-section').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Destacar columnas seleccionadas
        highlightSelectedPlans();
    }

    function highlightSelectedPlans() {
        const planColumns = document.querySelectorAll('.plan-column');
        planColumns.forEach((col, index) => {
            if (selectedPlans.includes(col.textContent.trim())) {
                col.style.background = 'rgba(107, 44, 135, 0.15)';
                setTimeout(() => {
                    col.style.background = '';
                }, 3000);
            }
        });
    }

    // Función para tracking de analytics
    function trackPlanInteraction(planIndex) {
        const planNames = ['Inicial', 'Profesional', 'Enterprise'];
        console.log(`Plan interaction: ${planNames[planIndex]}`);
        
        // Aquí podrías enviar a Google Analytics:
        // gtag('event', 'plan_view', {
        //     'plan_name': planNames[planIndex],
        //     'event_category': 'engagement'
        // });
    }

    // Efecto parallax sutil en hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
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

    // Función para cambiar precios dinámicamente (útil para promociones)
    function updatePricing(discountPercentage = 0) {
        const priceElements = document.querySelectorAll('.amount');
        const originalPrices = [399, 799, 1499];
        
        priceElements.forEach((element, index) => {
            if (originalPrices[index]) {
                const originalPrice = originalPrices[index];
                const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
                element.textContent = discountedPrice;
                
                if (discountPercentage > 0) {
                    // Mostrar precio original tachado
                    const originalSpan = document.createElement('span');
                    originalSpan.style.textDecoration = 'line-through';
                    originalSpan.style.fontSize = '1.5rem';
                    originalSpan.style.opacity = '0.7';
                    originalSpan.textContent = `${originalPrice}`;
                    element.parentNode.insertBefore(originalSpan, element);
                }
            }
        });
    }

    // Función para mostrar notificaciones de promociones
    function showPromoNotification(message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = 'promo-notification';
        notification.innerHTML = `
            <div class="promo-content">
                <span class="promo-icon">🎉</span>
                <span class="promo-text">${message}</span>
                <button class="promo-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--uva-green);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            max-width: 300px;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover después del tiempo especificado
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }
        }, duration);
    }

    // Función global para usar desde otros scripts
    window.UVA = window.UVA || {};
    window.UVA.selectPlan = function(planName) {
        window.location.href = `contacto.html?plan=${planName}`;
    };
    
    window.UVA.requestQuote = function(serviceName) {
        window.location.href = `contacto.html?servicio=${serviceName}`;
    };
});

// CSS para las animaciones de notificaciones
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
    
    .promo-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .promo-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    .compare-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--uva-purple);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(107, 44, 135, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    }
    
    .compare-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(107, 44, 135, 0.6);
    }
    
    .plan-card.comparing {
        border-color: var(--uva-green) !important;
        box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.3) !important;
    }
`;
document.head.appendChild(style); tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(107, 44, 135, 0.08)';
            this.style.transform = 'scale(1.02)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = '';
        });
    });

    // Contador animado para estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .result-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 16);
        });
    }

    // Activar contadores cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Funcionalidad para servicios adicionales
    serviceItems.forEach((item, index) => {
        const serviceLink = item.querySelector('.service-link');
        serviceLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animación de clic
            item.style.transform = 'translateY(-10px) scale(1.05)';
            
            setTimeout(() => {
                // Redirigir a contacto con parámetro del servicio
                const serviceName = item.querySelector('h3').textContent;
                window.location.href = `contacto.html?servicio=${encodeURIComponent(serviceName)}`;
            }, 200);
        });
    });

    // Sistema de comparación visual de planes
    let selectedPlans = [];
    
    function togglePlanComparison(planElement, planName) {
        if (selectedPlans.includes(planName)) {
            selectedPlans = selectedPlans.filter(p => p !== planName);
            planElement.classList.remove('comparing');
        } else {
            if (selectedPlans.length < 2) {
                selectedPlans.push(planName);
                planElement.classList.add('comparing');
            }
        }
        
        updateComparisonUI();
    }

    function updateComparisonUI() {
        const compareButton = document.getElementById('compare-button');
        if (selectedPlans.length > 1) {
            if (!compareButton) {
                createCompareButton();
            }
        } else {
            if (compareButton) {
                compareButton.remove();
            }
        }
    }

    function createCompareButton() {
        const button = document.createElement('button');
        button.id = 'compare-button';
        button.textContent = `Comparar ${selectedPlans.length} planes`;
        button.className = 'compare-btn';
        button.onclick = showComparison;
        
        document.body.appendChild(button);
    }

    function showComparison() {
        // Scroll a la tabla de comparación
        document.querySelector('.comparison-section').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Destacar columnas seleccionadas
        highlightSelectedPlans();
    }

    function highlightSelectedPlans() {
        const planColumns = document.querySelectorAll('.plan-column');
        planColumns.forEach((col, index) => {
            if (selectedPlans.includes(col.textContent.trim())) {
                col.style.background = 'rgba(107, 44, 135, 0.15)';
                setTimeout(() => {
                    col.style.background = '';
                }, 3000);
            }
        });
    }

    // Función para tracking de analytics
    function trackPlanInteraction(planIndex) {
        const planNames = ['Inicial', 'Profesional', 'Enterprise'];
        console.log(`Plan interaction: ${planNames[planIndex]}`);
        
        // Aquí podrías enviar a Google Analytics:
        // gtag('event', 'plan_view', {
        //     'plan_name': planNames[planIndex],
        //     'event_category': 'engagement'
        // });
    }

    // Efecto parallax sutil en hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
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

    // Función para cambiar precios dinámicamente (útil para promociones)
    function updatePricing(discountPercentage = 0) {
        const priceElements = document.querySelectorAll('.amount');
        const originalPrices = [399, 799, 1499];
        
        priceElements.forEach((element, index) => {
            if (originalPrices[index]) {
                const originalPrice = originalPrices[index];
                const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
                element.textContent = discountedPrice;
                
                if (discountPercentage > 0) {
                    // Mostrar precio original tachado
                    const originalSpan = document.createElement('span');
                    originalSpan.style.textDecoration = 'line-through';
                    originalSpan.style.fontSize = '1.5rem';
                    originalSpan.style.opacity = '0.7';
                    originalSpan.textContent = `${originalPrice}`;
                    element.parentNode.insertBefore(originalSpan, element);
                }
            }
        });
    }

    // Función para mostrar notificaciones de promociones
    function showPromoNotification(message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = 'promo-notification';
        notification.innerHTML = `
            <div class="promo-content">
                <span class="promo-icon">🎉</span>
                <span class="promo-text">${message}</span>
                <button class="promo-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--uva-green);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            max-width: 300px;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover después del tiempo especificado
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }
        }, duration);
    }

    // Ejemplo de uso de promoción (comentado)
    // setTimeout(() => {
    //     showPromoNotification('¡Descuento del 20% en tu primer mes! Válido hasta fin de mes.');
    //     updatePricing(20);
    // }, 5000);

    // Función global para usar desde otros scripts
    window.UVA = window.UVA || {};
    window.UVA.selectPlan = function(planName) {
        window.location.href = `contacto.html?plan=${planName}`;
    };
    
    window.UVA.requestQuote = function(serviceName) {
        window.location.href = `contacto.html?servicio=${serviceName}`;
    };
});

// CSS para las animaciones de notificaciones
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
    
    .promo-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .promo-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    .compare-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--uva-purple);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(107, 44, 135, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    }
    
    .compare-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(107, 44, 135, 0.6);
    }
    
    .plan-card.comparing {
        border-color: var(--uva-green) !important;
        box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.3) !important;
    }
`;
document.head.appendChild(style);// JavaScript para la página de servicios de UVA
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const navbar = document.querySelector('.navbar');
    const planCards = document.querySelectorAll('.plan-card');
    const serviceItems = document.querySelectorAll('.service-item');

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

    // Navegación suave entre secciones
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para navbar fija
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Tracking de interacciones con planes
    planCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Si es el botón, no hacemos nada (ya tiene su función)
            if (e.target.classList.contains('plan-btn')) return;
            
            // Destacar temporalmente el plan seleccionado
            card.style.transform = 'translateY(-8px) scale(1.05)';
            card.style.boxShadow = '0 20px 60px rgba(107, 44, 135, 0.25)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 300);
            
            // Analytics (opcional)
            trackPlanInteraction(index);
        });
    });

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
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
    const elementsToAnimate = document.querySelectorAll('.plan-card, .service-item, .story-card, .process-step, .faq-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Funcionalidad para la tabla comparativa
    const