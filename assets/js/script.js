(function () {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {
                    const isMatch = link.getAttribute('href') === `#${entry.target.id}`;
                    link.classList.toggle('active', isMatch);
                });
            });
        },
        {
            rootMargin: '-45% 0px -45% 0px' // triggers when a section crosses the vertical middle of the viewport
        }
    );

    sections.forEach(section => sectionObserver.observe(section));
})();

(function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    function closeMenu() {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // prevents this click from immediately triggering the outside-click listener below
        navMenu.classList.toggle('is-open');
        hamburger.classList.toggle('is-active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close when clicking anywhere outside the menu or hamburger button
    document.addEventListener('click', (e) => {
        const isOpen = navMenu.classList.contains('is-open');
        const clickedInsideMenu = navMenu.contains(e.target);
        const clickedHamburger = hamburger.contains(e.target);

        if (isOpen && !clickedInsideMenu && !clickedHamburger) {
            closeMenu();
        }
    });

    // Close on scroll (main content scrolling behind the open menu)
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!navMenu.classList.contains('is-open')) return;
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                closeMenu();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
})();

(function () {
    const cards = document.querySelectorAll('.is-collapsible');
    if (!cards.length) return;

    function openCard(card) {
        card.classList.add('is-open');
        card.setAttribute('aria-expanded', 'true');
        const icon = card.querySelector('.toggle-icon');
        icon.classList.remove('bi-caret-down-fill');
        icon.classList.add('bi-caret-up-fill');
    }

    function closeCard(card) {
        card.classList.remove('is-open');
        card.setAttribute('aria-expanded', 'false');
        const icon = card.querySelector('.toggle-icon');
        icon.classList.remove('bi-caret-up-fill');
        icon.classList.add('bi-caret-down-fill');
    }

    function toggleCard(card) {
        if (card.classList.contains('is-open')) {
            closeCard(card);
        } else {
            openCard(card);
        }
    }

    function closeAllCards() {
        cards.forEach(card => {
            if (card.classList.contains('is-open')) {
                closeCard(card);
            }
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCard(card);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(card);
            }
        });
    });

    // Close when clicking anywhere outside all collapsible cards
    document.addEventListener('click', (e) => {
        cards.forEach(card => {
            if (card.classList.contains('is-open') && !card.contains(e.target)) {
                closeCard(card);
            }
        });
    });

    // Close on scroll
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                closeAllCards();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
})();
(function () {
    const cards = document.querySelectorAll('.project-card');
    const overlay = document.getElementById('projectOverlay');
    if (!cards.length || !overlay) return;

    const overlayImg = overlay.querySelector('.project-overlay-img');
    const overlayTitle = overlay.querySelector('.project-overlay-title');
    const overlayDesc = overlay.querySelector('.project-overlay-desc');
    const overlayGithub = overlay.querySelector('.project-overlay-github');
    const overlayLive = overlay.querySelector('.project-overlay-live');
    const closeBtn = overlay.querySelector('.project-overlay-close');
    const backdrop = overlay.querySelector('.project-overlay-backdrop');

    function openOverlay(card) {
        const img = card.querySelector('.project-card-img');
    
        overlayImg.src = img.src;
        overlayImg.alt = img.alt;
        overlayTitle.textContent = card.dataset.title || '';
        overlayDesc.textContent = card.dataset.desc || '';
    
        overlayGithub.href = card.dataset.github || '#';
        overlayGithub.style.display = card.dataset.github ? 'inline-flex' : 'none';
    
        overlayLive.href = card.dataset.live || '#';
        overlayLive.style.display = card.dataset.live ? 'inline-flex' : 'none';
    
        overlay.classList.add('is-open');
    
        // Lock scroll on both html and body, and compensate for the
        // scrollbar disappearing so the page doesn't jump sideways
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    function closeOverlay() {
        overlay.classList.remove('is-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    cards.forEach(card => {
        card.addEventListener('click', () => openOverlay(card));
    });

    closeBtn.addEventListener('click', closeOverlay);
    backdrop.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
            closeOverlay();
        }
    });
})();

(function () {
    const timeline = document.getElementById('timeline');
    const timelineFill = document.getElementById('timelineFill');
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timeline || !timelineFill || !timelineItems.length) return;

    let ticking = false;

    function updateTimeline() {
        ticking = false;

        const rect = timeline.getBoundingClientRect();
        const viewportMiddle = window.innerHeight * 0.5;

        // How far the viewport's middle has traveled through the timeline's height
        const progress = (viewportMiddle - rect.top) / rect.height;
        const clamped = Math.min(Math.max(progress, 0), 1);

        timelineFill.style.height = `${clamped * 100}%`;

        // Light up each dot once the fill line has reached it
        timelineItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemOffset = itemRect.top - rect.top;
            const itemProgress = itemOffset / rect.height;
            item.classList.toggle('is-active', clamped >= itemProgress);
        });
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateTimeline);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateTimeline();
})();

(function () {
    const cards = document.querySelectorAll('.certificate-card');
    const overlay = document.getElementById('certificateOverlay');
    if (!cards.length || !overlay) return;

    const overlayImg = overlay.querySelector('.certificate-overlay-img');
    const overlayTitle = overlay.querySelector('.certificate-overlay-title');
    const overlayMeta = overlay.querySelector('.certificate-overlay-meta');
    const closeBtn = overlay.querySelector('.certificate-overlay-close');
    const backdrop = overlay.querySelector('.certificate-overlay-backdrop');

    function openOverlay(card) {
        overlayImg.src = card.dataset.image || '';
        overlayImg.alt = card.dataset.title || '';
        overlayTitle.textContent = card.dataset.title || '';
        overlayMeta.textContent = `${card.dataset.issuer || ''} · ${card.dataset.date || ''}`;

        overlay.classList.add('is-open');

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    function closeOverlay() {
        overlay.classList.remove('is-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    cards.forEach(card => {
        card.addEventListener('click', () => openOverlay(card));
    });

    closeBtn.addEventListener('click', closeOverlay);
    backdrop.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
            closeOverlay();
        }
    });
})();

(function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
        name: {
            input: document.getElementById('contactName'),
            error: document.getElementById('nameError'),
            validate: (value) => {
                if (!value.trim()) return 'Please enter your name.';
                if (value.trim().length < 2) return 'Name must be at least 2 characters.';
                return '';
            }
        },
        email: {
            input: document.getElementById('contactEmail'),
            error: document.getElementById('emailError'),
            validate: (value) => {
                if (!value.trim()) return 'Please enter your email.';
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value.trim())) return 'Please enter a valid email address.';
                return '';
            }
        },
        subject: {
            input: document.getElementById('contactSubject'),
            error: document.getElementById('subjectError'),
            validate: (value) => {
                if (!value.trim()) return 'Please enter a subject.';
                return '';
            }
        },
        message: {
            input: document.getElementById('contactMessage'),
            error: document.getElementById('messageError'),
            validate: (value) => {
                if (!value.trim()) return 'Please enter a message.';
                if (value.trim().length < 10) return 'Message should be at least 10 characters.';
                return '';
            }
        }
    };

    const formStatus = document.getElementById('formStatus');

    function showError(field, message) {
        field.input.closest('.form-group').classList.add('has-error');
        field.error.textContent = message;
    }

    function clearError(field) {
        field.input.closest('.form-group').classList.remove('has-error');
        field.error.textContent = '';
    }

    function validateField(key) {
        const field = fields[key];
        const message = field.validate(field.input.value);
        if (message) {
            showError(field, message);
            return false;
        }
        clearError(field);
        return true;
    }

    // Validate on blur (as the user leaves each field) for immediate feedback
    Object.keys(fields).forEach(key => {
        fields[key].input.addEventListener('blur', () => validateField(key));
        fields[key].input.addEventListener('input', () => {
            // Clear error as soon as they start correcting it
            if (fields[key].input.closest('.form-group').classList.contains('has-error')) {
                validateField(key);
            }
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        Object.keys(fields).forEach(key => {
            if (!validateField(key)) isValid = false;
        });

        if (!isValid) {
            formStatus.textContent = 'Please fix the errors above before sending.';
            formStatus.className = 'form-status error';
            return;
        }

        // Submit to Formspree via fetch — no page reload, keeps our own validation UI
        const submitBtn = form.querySelector('.contact-submit-btn');
        submitBtn.disabled = true;
        formStatus.textContent = 'Sending...';
        formStatus.className = 'form-status';

        fetch('https://formspree.io/f/xojgkrve', {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    form.reset();
                } else {
                    return response.json().then(data => {
                        const errorMsg = (data.errors || []).map(e => e.message).join(', ');
                        formStatus.textContent = errorMsg || 'Something went wrong. Please try again.';
                        formStatus.className = 'form-status error';
                    });
                }
            })
            .catch(() => {
                formStatus.textContent = 'Something went wrong. Please check your connection and try again.';
                formStatus.className = 'form-status error';
            })
            .finally(() => {
                submitBtn.disabled = false;
            });
    });
})();


(function () {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const backToTop = document.getElementById('backToTop');
    const hero = document.getElementById('home');
    const about = document.getElementById('about');
    const footerBottom = document.querySelector('.footer-bottom');
    const footerBottomInner = document.querySelector('.footer-bottom-inner');
    const floatingHome = document.body;
    if (!backToTop || !hero) return;

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const aboutObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!backToTop.classList.contains('in-footer')) {
                    backToTop.classList.toggle('is-visible', entry.boundingClientRect.top <= 0 || entry.isIntersecting);
                }
            });
        },
        { threshold: 0 }
    );

    if (about) {
        aboutObserver.observe(about);
    } else {
        aboutObserver.observe(hero);
    }

    if (footerBottom && footerBottomInner) {
        let isInFooter = false; 

        const footerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const shouldBeInFooter = entry.isIntersecting;

                    if (shouldBeInFooter === isInFooter) return; 

                    isInFooter = shouldBeInFooter;

                    if (isInFooter) {
                        backToTop.classList.add('in-footer', 'is-visible');
                        footerBottomInner.appendChild(backToTop);
                    } else {
                        backToTop.classList.remove('in-footer');
                        document.body.appendChild(backToTop);
                    }
                });
            },
            {
                threshold: 0.6,
                rootMargin: '0px 0px -10% 0px' 
            }
        );

        footerObserver.observe(footerBottom);
    }
})();