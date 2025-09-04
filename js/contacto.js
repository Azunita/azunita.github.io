// JavaScript para la página de contacto de UVA
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
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

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });

    // Función para validar campos individuales
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Limpiar validaciones anteriores
        clearFieldValidation(field);

        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo es obligatorio');
            return false;
        }

        // Validación específica por tipo de campo
        switch (field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    showFieldError(field, 'Por favor ingresa un email válido');
                    return false;
                }
                break;
            case 'tel':
                if (value && !isValidPhone(value)) {
                    showFieldError(field, 'Por favor ingresa un teléfono válido');
                    return false;
                }
                break;
        }

        // Validación del campo mensaje
        if (field.name === 'mensaje' && value.length < 10) {
            showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }

        return true;
    }

    // Función para limpiar validación
    function clearValidation(e) {
        clearFieldValidation(e.target);
    }

    function clearFieldValidation(field) {
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
        field.style.borderColor = '';
    }

    // Función para mostrar errores
    function showFieldError(field, message) {
        field.style.borderColor = 'var(--error)';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--error)';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    // Validaciones auxiliares
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,}$/;
        return phoneRegex.test(phone);
    }

    // Manejo del envío del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validar todos los campos
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });

        // Verificar checkbox de términos
        const checkbox = document.getElementById('acepto');
        if (!checkbox.checked) {
            showMessage('Debes aceptar los términos y condiciones', 'error');
            isValid = false;
        }

        if (!isValid) {
            showMessage('Por favor corrige los errores antes de enviar', 'error');
            return;
        }

        // Mostrar estado de carga
        setLoadingState(true);

        try {
            // Simular envío (aquí iría la llamada real a tu API)
            await simulateFormSubmission();
            
            // Éxito
            showMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            contactForm.reset();
            
            // Opcional: redirigir a página de agradecimiento
            // window.location.href = 'gracias.html';

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            showMessage('Hubo un error al enviar el mensaje. Inténtalo de nuevo.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    // Función para simular envío del formulario
    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular éxito (90% de las veces)
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Error simulado'));
                }
            }, 2000);
        });
    }

    // Función para mostrar estado de carga
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.querySelector('span').textContent = 'Enviando...';
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('span').textContent = 'Enviar mensaje';
        }
    }

    // Función para mostrar mensajes de éxito/error
    function showMessage(message, type) {
        // Remover mensaje anterior si existe
        const existingMessage = contactForm.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Insertar al inicio del formulario
        contactForm.insertBefore(messageDiv, contactForm.firstChild);

        // Auto-remover después de 5 segundos para mensajes de éxito
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }

        // Scroll suave hasta el mensaje
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Función para mejorar UX con autocompletado inteligente
    const empresaField = document.getElementById('empresa');
    const servicioField = document.getElementById('servicio');
    const presupuestoField = document.getElementById('presupuesto');

    // Auto-sugerencias simples para empresa
    empresaField.addEventListener('input', function(e) {
        const value = e.target.value.toLowerCase();
        // Aquí podrías implementar autocompletado con empresas conocidas
    });

    // Lógica para mostrar/ocultar campos basado en el tipo de servicio
    servicioField.addEventListener('change', function(e) {
        const selectedService = e.target.value;
        
        // Mostrar sugerencias de presupuesto basadas en el servicio
        updateBudgetSuggestions(selectedService);
    });

    function updateBudgetSuggestions(service) {
        const budgetOptions = presupuestoField.querySelectorAll('option');
        
        // Lógica para sugerir rangos de presupuesto según el servicio
        const budgetRanges = {
            'plan-inicial': ['0-500', '500-1000'],
            'plan-profesional': ['500-1000', '1000-2500'],
            'plan-enterprise': ['1000-2500', '2500-5000', '5000+'],
            'desarrollo-custom': ['1000-2500', '2500-5000', '5000+'],
            'consultoria': ['0-500', '500-1000'],
            'auditoria': ['0-500', '500-1000']
        };

        // Resetear estilos
        budgetOptions.forEach(option => {
            option.style.backgroundColor = '';
            option.style.fontWeight = '';
        });

        // Resaltar opciones recomendadas
        if (budgetRanges[service]) {
            budgetRanges[service].forEach(range => {
                const option = presupuestoField.querySelector(`option[value="${range}"]`);
                if (option) {
                    option.style.backgroundColor = 'rgba(107, 44, 135, 0.1)';
                    option.style.fontWeight = 'bold';
                }
            });
        }
    }

    // Analytics simples (si necesitas tracking)
    function trackFormInteraction(action, field = null) {
        // Aquí podrías enviar eventos a Google Analytics, etc.
        console.log(`Form interaction: ${action}`, field);
    }

    // Track cuando el usuario empieza a llenar el formulario
    let formStarted = false;
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (!formStarted) {
                trackFormInteraction('form_started');
                formStarted = true;
            }
        });
    });

    // Prevenir pérdida de datos con confirmación
    let formModified = false;
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            formModified = true;
        });
    });

    window.addEventListener('beforeunload', function(e) {
        if (formModified && !contactForm.submitted) {
            e.preventDefault();
            e.returnValue = 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?';
        }
    });

    // Marcar como enviado cuando se envía exitosamente
    contactForm.addEventListener('submit', function() {
        contactForm.submitted = true;
    });
});

// Función global para integración con sistemas de CRM (opcional)
window.UVA = window.UVA || {};
window.UVA.sendToRM = function(formData) {
    // Aquí podrías integrar con HubSpot, Salesforce, etc.
    console.log('Sending to CRM:', formData);
};