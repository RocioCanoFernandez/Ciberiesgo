document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // 2. Scroll Reveal Animation setup using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Mobile Sticky CTA visibility
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.querySelector('.hero');
    const footerSection = document.querySelector('.footer');

    if (stickyCta) {
        window.addEventListener('scroll', () => {
            // Show sticky CTA only when passed hero section, hide near footer
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const footerTop = footerSection.offsetTop;
            const scrollBottom = window.scrollY + window.innerHeight;

            if (window.scrollY > heroBottom && scrollBottom < footerTop) {
                stickyCta.classList.add('show');
            } else {
                stickyCta.classList.remove('show');
            }
        });
    }

    // 4. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Basic form handling demonstration
    const leadForm = document.getElementById('leadForm');
    if(leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect minimal data logic just for DEMO purpose
            const btn = leadForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Procesando...';
            btn.disabled = true;

            // Simular petición
            setTimeout(() => {
                btn.innerHTML = '<i class="ri-check-line"></i> ¡Solicitud enviada!';
                btn.style.backgroundColor = '#27c93f';
                setTimeout(() => {
                    leadForm.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // 6. Quiz Logic
    const quizChecks = document.querySelectorAll('.quiz-check');
    const quizResult = document.getElementById('quizResult');
    
    if(quizChecks.length > 0 && quizResult) {
        quizChecks.forEach(check => {
            check.addEventListener('change', () => {
                const checkedCount = document.querySelectorAll('.quiz-check:checked').length;
                if (checkedCount >= 2) {
                    quizResult.style.display = 'block';
                } else {
                    quizResult.style.display = 'none';
                }
            });
        });
    }
});
