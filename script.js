// ===== Scroll to Top Button =====
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão scroll to top
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollToTopBtn);

    // Mostrar/ocultar botão ao fazer scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top ao clicar
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ===== Smooth Scroll para Links Internos =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Animação de Cards ao Entrar na Viewport =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards
document.querySelectorAll('.featured-card, .category-card, .resource-item, .timeline-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== Contador de Artigos =====
document.addEventListener('DOMContentLoaded', function() {
    const featuredCards = document.querySelectorAll('.featured-card').length;
    const categoryCards = document.querySelectorAll('.category-card').length;
    const resourceItems = document.querySelectorAll('.resource-item').length;
    
    console.log(`Página carregada com ${featuredCards} artigos em destaque, ${categoryCards} categorias e ${resourceItems} recursos.`);
});

// ===== Validação de Links Externos =====
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
            console.warn('Link externo inválido:', href);
        }
    });
});

// ===== Dark Mode Toggle (Opcional) =====
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.setAttribute('aria-label', 'Alternar modo escuro');
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 98;
    `;

    darkModeToggle.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'var(--primary-dark)';
        this.style.transform = 'translateY(-4px)';
    });

    darkModeToggle.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Verificar preferência salva
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }

    // document.body.appendChild(darkModeToggle);
}

// ===== Analytics Simples =====
function trackPageView() {
    const pageData = {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    console.log('Página visualizada:', pageData);
}

// Rastrear visualização de página
trackPageView();

// ===== Tratamento de Erros =====
window.addEventListener('error', function(event) {
    console.error('Erro na página:', event.error);
});

// ===== Inicializar ao carregar =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('IBM Cloud News - Página carregada com sucesso');
    
    // Adicionar classe de carregamento concluído
    document.body.classList.add('loaded');
});

// ===== Função para Compartilhar Artigos =====
function shareArticle(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Confira esta notícia sobre IBM Cloud',
            url: url
        }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        // Fallback para navegadores que não suportam Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
    }
}

// ===== Melhorias de Acessibilidade =====
document.addEventListener('keydown', function(event) {
    // Atalho: Pressionar 'S' para voltar ao topo
    if (event.key === 's' || event.key === 'S') {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// ===== Preload de Imagens =====
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}

preloadImages();

// ===== Performance Monitoring =====
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Tempo de carregamento da página:', pageLoadTime, 'ms');
    }
});

