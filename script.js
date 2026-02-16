// ============================================
// HOLLYWOOD CINEMATIC ANIMATIONS
// Powered by GSAP + Lenis Smooth Scroll
// ============================================

// Registrar GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// LOADING SCREEN ANIMATION
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    
    // Animación de salida del loading
    gsap.to('.loader-circle', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        delay: 1.5
    });
    
    gsap.to('.loader-letter', {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
        delay: 1.7
    });
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        body.classList.remove('loading');
        initAnimations();
    }, 2300);
});

// ============================================
// SMOOTH SCROLL CON LENIS
// ============================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sincronizar Lenis con GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    
    init() {
        if (window.innerWidth < 768) return;
        
        document.addEventListener('mousemove', (e) => {
            this.dot.style.left = e.clientX + 'px';
            this.dot.style.top = e.clientY + 'px';
            
            gsap.to(this.outline, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .magnetic, .magnetic-light, .check-item');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }
};

// ============================================
// PARTICLE EFFECT
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// MAGNETIC EFFECT
// ============================================
function initMagneticEffect() {
    if (window.innerWidth < 768) return;
    
    const magneticElements = document.querySelectorAll('.magnetic, .magnetic-light');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const strength = el.classList.contains('magnetic-light') ? 0.3 : 0.5;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// ============================================
// 3D TILT EFFECT ON CARDS
// ============================================
function init3DTilt() {
    if (window.innerWidth < 768) return;
    
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// ============================================
// HERO ANIMATIONS
// ============================================
function animateHero() {
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Top tag
    tl.to('.top-tag', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Title lines - stagger effect
    tl.from('.hero-title .line', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.4');
    
    // Description
    tl.to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5');
    
    // Buttons
    tl.from('.hero-actions .btn', {
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.4');
    
    // Badges
    tl.to('.badge-item', {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3');
}

// ============================================
// TEXT SPLIT ANIMATION
// ============================================
function splitTextAnimation() {
    const splitTexts = document.querySelectorAll('.split-text');
    
    splitTexts.forEach(text => {
        const chars = text.textContent.split('');
        text.textContent = '';
        
        chars.forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            text.appendChild(span);
        });
        
        ScrollTrigger.create({
            trigger: text,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(text.querySelectorAll('span'), {
                    opacity: 1,
                    y: 0,
                    stagger: 0.03,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }
        });
    });
}

// ============================================
// REVEAL ANIMATIONS
// ============================================
function revealAnimations() {
    // Reveal text
    gsap.utils.toArray('.reveal-text').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Reveal slide
    gsap.utils.toArray('.reveal-slide').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
}

// ============================================
// CARDS STAGGER ANIMATION
// ============================================
function cardsAnimation() {
    const cardsGrids = document.querySelectorAll('.conditions-grid, .testimonials-slider');
    
    cardsGrids.forEach(grid => {
        const cards = grid.querySelectorAll('.condition-card, .testimonial-item');
        
        gsap.from(cards, {
            scrollTrigger: {
                trigger: grid,
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 60,
            scale: 0.9,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function parallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
            ease: 'none'
        });
    });
    
    // Parallax backgrounds
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    parallaxBgs.forEach(bg => {
        gsap.to(bg, {
            scrollTrigger: {
                trigger: bg.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -100,
            ease: 'none'
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function counterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                const target = parseInt(counter.dataset.target);
                
                gsap.to(counter, {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        counter.textContent = Math.ceil(counter.textContent);
                    }
                });
            }
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function headerScrollEffect() {
    const header = document.querySelector('.header-cinematic');
    
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            targets: header,
            className: 'scrolled'
        }
    });
}

// ============================================
// MENU MOBILE
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLL TO SECTION
// ============================================
function smoothScrollToSection() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });
}

// ============================================
// WHATSAPP FUNCTION
// ============================================
function enviarWhatsApp() {
    const checks = document.querySelectorAll('#checklistForm input[type="checkbox"]:checked');
    
    if(checks.length === 0) {
        // Animación de shake en el botón
        gsap.to('.checklist-footer .btn', {
            x: [-10, 10, -10, 10, 0],
            duration: 0.4,
            ease: 'power2.inOut'
        });
        
        alert("Por favor, selecciona al menos un síntoma para que pueda ayudarte mejor.");
        return;
    }
    
    let text = "Hola Dra. Lupe, completé la autoevaluación en su sitio web y estos son los síntomas que he experimentado últimamente:\n\n";
    checks.forEach(c => {
        text += "✓ " + c.value + "\n";
    });
    text += "\nMe gustaría agendar una consulta para hablar sobre esto. ¿Cuándo tiene disponibilidad?";
    
    // Animación de éxito
    gsap.to('.checklist-footer .btn', {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
            window.open(`https://wa.me/573116870095?text=${encodeURIComponent(text)}`, '_blank');
        }
    });
}

// ============================================
// FEATURE ITEMS ANIMATION
// ============================================
function animateFeatureItems() {
    const features = document.querySelectorAll('.feature-item');
    
    features.forEach((feature, index) => {
        gsap.to(feature, {
            scrollTrigger: {
                trigger: feature,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
}

// ============================================
// BENEFIT LIST ANIMATION
// ============================================
function animateBenefitList() {
    const benefits = document.querySelectorAll('.benefit-list li');
    
    benefits.forEach((benefit, index) => {
        gsap.to(benefit, {
            scrollTrigger: {
                trigger: benefit,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.08,
            ease: 'power3.out'
        });
    });
}

// ============================================
// SCROLL INDICATOR
// ============================================
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const especialidadesSection = document.querySelector('#especialidades');
            lenis.scrollTo(especialidadesSection, {
                offset: -80,
                duration: 1.5
            });
        });
        
        // Ocultar scroll indicator después de scroll
        ScrollTrigger.create({
            start: 'top -100',
            onEnter: () => {
                gsap.to(scrollIndicator, {
                    opacity: 0,
                    duration: 0.3
                });
            },
            onLeaveBack: () => {
                gsap.to(scrollIndicator, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
    }
}

// ============================================
// INIT ALL ANIMATIONS
// ============================================
function initAnimations() {
    console.log('🎬 Iniciando animaciones cinematográficas...');
    
    // Inicializar efectos
    cursor.init();
    createParticles();
    initMagneticEffect();
    init3DTilt();
    initMobileMenu();
    smoothScrollToSection();
    initScrollIndicator();
    
    // Animaciones de entrada
    animateHero();
    splitTextAnimation();
    revealAnimations();
    cardsAnimation();
    parallaxEffects();
    counterAnimation();
    headerScrollEffect();
    animateFeatureItems();
    animateBenefitList();
    
    console.log('✅ Animaciones cinematográficas activadas!');
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency < 4) {
    gsap.globalTimeline.timeScale(1.5); // Acelerar animaciones
}

// ============================================
// RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ============================================
// CONSOLE SIGNATURE
// ============================================
console.log(
    '%c🎬 HOLLYWOOD CINEMATIC EXPERIENCE 🎬',
    'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; font-size: 16px; font-weight: bold; border-radius: 8px;'
);

console.log(
    '%cPowered by GSAP + Lenis • Designed for Dra. Lupe Fonseca',
    'color: #10b981; font-size: 12px; font-weight: 600;'
);
