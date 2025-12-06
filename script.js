// JavaScript Melhorado para o Portfólio
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const heroSubtitle = document.getElementById('rotating-profession');
    const ctaBtn = document.querySelector('.cta-btn');
    const hireBtns = document.querySelectorAll('.hire-btn');
    const aboutBtn = document.querySelector('.about-btn');
    const socialIcons = document.querySelectorAll('.social-icon');

    // Profissões para o efeito de máquina de escrever
    const professions = [
        'Desenvolvedor Front-end', 
        'UI/UX Designer',
        'Especialista em Landing Pages',
        'Criador de experiências digitais'
    ];

    // Efeito de Máquina de Escrever
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
        if (!heroSubtitle) return;
        
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            heroSubtitle.innerHTML = "Eu sou " + currentProfession.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
            charIndex--;
            typingSpeed = 75;
        } else {
            heroSubtitle.innerHTML = "Eu sou " + currentProfession.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentProfession.length) {
            typingSpeed = 2000; // Pausa no final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500; // Pausa antes da próxima palavra
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Menu Mobile
    function toggleMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        }
    }

    // Scroll Suave
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 80;
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (navMenu && navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }

                updateActiveNavLink(targetId);
            }
        }
    }

    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Efeitos de Scroll no Header
    function handleScroll() {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }

    // Animações ao Rolar (Intersection Observer)
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                const siblings = entry.target.parentElement?.querySelectorAll('.animate-on-scroll');
                if (siblings && siblings.length > 1) {
                    siblings.forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.style.opacity = '1';
                            sibling.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    function setupAnimations() {
        const animatedElements = document.querySelectorAll(
            '.hero-stats .stat, .about-highlights .highlight, .floating-card, .social-icon, .service-card, .project-card'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            // Pequeno delay para efeito cascata
            let delay = (index % 3) * 0.1; 
            el.style.transitionDelay = `${delay}s`;
            
            animationObserver.observe(el);
        });
    }

    // Sistema de Notificação
    function showNotification(message, type = 'info') {
        // Remove notificação anterior se existir
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px', // Abaixo do header
            right: '20px',
            background: type === 'error' ? '#ff4444' : 'var(--accent-primary)', // Usa o dourado ou vermelho
            color: type === 'error' ? '#fff' : '#000', // Texto preto no dourado fica melhor
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            zIndex: '10000',
            fontWeight: '600',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto remover
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }

    // ---------------------------------------------------------
    //  ⚡ AQUI ESTÁ A PARTE DO WHATSAPP (INTEGRADA CORRETAMENTE)
    // ---------------------------------------------------------
   // ---------------------------------------------------------
//  ⚡ WHATSAPP INTEGRADO (Corrigido para seu HTML)
// ---------------------------------------------------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede a página de recarregar

        // 1. Pega os valores dos campos que EXISTEM no seu HTML
        const nameElement = document.getElementById('name');
        const emailElement = document.getElementById('email');
        const messageElement = document.getElementById('message');

        // Garante que os elementos existem antes de pegar o valor
        const name = nameElement ? nameElement.value : '';
        const email = emailElement ? emailElement.value : '';
        const message = messageElement ? messageElement.value : '';

        // 2. Validação simples
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // --- CONFIGURAÇÃO ---
        // Coloque seu número aqui (apenas números, com DDD)
        // Exemplo: 5538998304003
        const seuNumero = "5538998304003"; 

        // 3. Monta o texto da mensagem (Sem o campo 'Assunto')
        const textoZap = `Olá! Vim pelo seu Portfólio. 🚀\n\n` +
            `Nome: ${name}\n` +
            `Email: ${email}\n\n` +
            `Mensagem:\n${message}`;

        // 4. Cria o link e abre
        const linkWhatsApp = `https://wa.me/${seuNumero}?text=${encodeURIComponent(textoZap)}`;
        window.open(linkWhatsApp, '_blank');

        // 5. Feedback visual e limpa o formulário
        if (typeof showNotification === "function") {
            showNotification('Abrindo WhatsApp...', 'success');
        } else {
            alert('Abrindo WhatsApp...');
        }
        this.reset();
    });
}

    // Event Listeners Globais
    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Inicialização
    function init() {
        if (heroSubtitle) typeWriter();
        setupAnimations();
        handleScroll();
        
        // Remove loading class se existir
        document.body.classList.add('loaded');
        console.log('Site carregado com sucesso! 🚀');
    }

    // Iniciar tudo
    init();

    // Listeners de Janela
    window.addEventListener('scroll', () => {
        requestAnimationFrame(handleScroll);
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu?.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});