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

