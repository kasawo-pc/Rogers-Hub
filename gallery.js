
document.addEventListener('DOMContentLoaded', () => {
    // === DOM Element Selections ===
    const themeToggleBtn = document.getElementById('toggleBtn');
    const htmlElement = document.documentElement;
    const filterButtons = document.querySelectorAll('.filter-btn');
    const imageSection = document.getElementById('images-section');
    const videoSection = document.getElementById('videos-section');
    const galleryCards = document.querySelectorAll('.gallery-card');

    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // ==========================================================================
    // 1. Theme Configuration Module (Dark / Light Mode)
    // ==========================================================================
    const updateThemeButtonUI = (theme) => {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '☀️ Light Mode';
        } else {
            themeToggleBtn.innerHTML = '🌙 Dark Mode';
        }
    };

    // Initialize from local storage preference or markup baseline
    const savedTheme = localStorage.getItem('kpc-theme') || htmlElement.getAttribute('data-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonUI(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('kpc-theme', newTheme);
        updateThemeButtonUI(newTheme);
    });

    // ==========================================================================
    // 2. Portfolio / Media Content Filtering Module
    // ==========================================================================
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update structural active button class state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Handle sections and individual cards based on filter intent
            if (filterValue === 'all') {
                imageSection.style.display = 'block';
                videoSection.style.display = 'block';
                galleryCards.forEach(card => card.style.display = 'block');
            } else if (filterValue === 'images') {
                imageSection.style.display = 'block';
                videoSection.style.display = 'none';
                galleryCards.forEach(card => {
                    card.getAttribute('data-category') === 'images' ? card.style.display = 'block' : card.style.display = 'none';
                });
            } else if (filterValue === 'videos') {
                imageSection.style.display = 'none';
                videoSection.style.display = 'block';
                galleryCards.forEach(card => {
                    card.getAttribute('data-category') === 'videos' ? card.style.display = 'block' : card.style.display = 'none';
                });
            }
        });
    });

    // ==========================================================================
    // 3. Interactive Image Lightbox Modal Module
    // ==========================================================================
    const imgWrappers = document.querySelectorAll('.gallery-media-wrapper:not(.video-wrapper)');

    imgWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const imgElement = wrapper.querySelector('img');
            const cardTitle = wrapper.querySelector('.gallery-overlay h3');

            if (imgElement) {
                lightboxImage.src = imgElement.src;
                lightboxImage.alt = imgElement.alt;
                lightboxCaption.textContent = cardTitle ? cardTitle.textContent : imgElement.alt;

                lightboxModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    const closeLightbox = () => {
        lightboxModal.style.display = 'none';
        lightboxImage.src = ''; // Flush image source buffer
        document.body.style.overflow = ''; // Restore structural window scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);

    // Close modal window if background surface layer clicked directly
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Keyboard configuration controls mapping (ESC terminates view)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.style.display === 'flex') {
            closeLightbox();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Toggle Script
    const toggleBtn = document.getElementById("toggleBtn");
    const htmlElement = document.documentElement;

    // Check saved theme preference
    const currentTheme = localStorage.getItem("theme") || "dark";
    htmlElement.setAttribute("data-theme", currentTheme);
    updateToggleButtonText(currentTheme);

    toggleBtn.addEventListener("click", () => {
        let theme = htmlElement.getAttribute("data-theme");
        let newTheme = theme === "dark" ? "light" : "dark";

        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateToggleButtonText(newTheme);
    });

    function updateToggleButtonText(theme) {
        toggleBtn.innerHTML = theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode";
    }

    // 2. Welcome Overlay & Simple Fireworks Effect
    const overlay = document.getElementById("welcomeOverlay");
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Simple particle system for fireworks celebration on load
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 3 + 1;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05; // gravity
            this.alpha -= this.decay;
        }
    }

    let particles = [];
    function launchFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height / 2);
        const colors = ["#38bdf8", "#818cf8", "#22c55e", "#f43f5e", "#fbbf24"];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 40; i++) {
            particles.push(new Particle(x, y, chosenColor));
        }
    }

    let fireworkInterval = setInterval(launchFirework, 400);

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) {
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(animateFireworks);
    }
    animateFireworks();

    // Hide overlay after 2.5 seconds
    setTimeout(() => {
        clearInterval(fireworkInterval);
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
        }, 500);
    }, 2500);

    // 3. Scroll Reveal Animation Observer
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});

/* ==========================================================================
   KPC Portal - Marquee Loop & Fireworks Canvas Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMarqueeDuplication();
    initWelcomeOverlayEngine();
});

/**
 * Multiplies marquee spans dynamically to prevent gaps during wide transitions
 */
function initMarqueeDuplication() {
    const container = document.querySelector('.marquee-content');
    if (!container) return;

    // Clone items once to create a seamless infinite loop background wrap
    const items = container.innerHTML;
    container.innerHTML = items + items;
}

/**
 * Initializes canvas dimensional adjustments, firework creation loops, and cleanup transitions
 */
function initWelcomeOverlayEngine() {
    const overlay = document.getElementById('welcomeOverlay');
    const canvas = document.getElementById('fireworksCanvas');
    if (!overlay || !canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Set structural dimension sizes
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Component Generation Blueprints
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 8;
            this.speedY = (Math.random() - 0.5) * 8;
            // KPC Brand Accent Palette: Blues, Purples, and White sparks
            const colors = ['#38bdf8', '#818cf8', '#ffffff', '#60a5fa'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += 0.05; // Light weight gravitational pull vector
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    // Create isolated structural burst groups
    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.6) + (canvas.height * 0.1);
        for (let i = 0; i < 40; i++) {
            particles.push(new Particle(x, y));
        }
    }

    // Frame Rendering Loop
    function animate() {
        ctx.fillStyle = 'rgba(10, 15, 29, 0.2)'; // Leaves trailing paths behind moving items
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });

        animationId = requestAnimationFrame(animate);
    }

    // Run generation engines
    animate();
    const fireworkTimer = setInterval(createFirework, 700);

    // Safely trigger fade transitions after 3.5 seconds
    setTimeout(() => {
        clearInterval(fireworkTimer);
        cancelAnimationFrame(animationId);
        overlay.classList.add('fade-out');
    }, 3500);
}


/* ==========================================================================
   KPC Portal - Theme Engine Core Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThemeEngine();
});

/**
 * Monitors user theme requests and updates browser LocalStorage properties
 */
function initThemeEngine() {
    const toggleBtn = document.getElementById('toggleBtn');
    if (!toggleBtn) return;

    // Read saved preference or default to dark scheme
    const currentTheme = localStorage.getItem('kpc-theme') || 'dark';

    // Initialize state settings
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleButtonUI(toggleBtn, currentTheme);

    // Click interaction monitoring setup
    toggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';

        // Commit adjustments structural system-wide
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('kpc-theme', targetTheme);

        // Refresh structural visual indicator label details
        updateToggleButtonUI(toggleBtn, targetTheme);
    });
}

/**
 * Handles icon and label asset strings inside button text wrapper containers
 */
function updateToggleButtonUI(btnElement, activeTheme) {
    if (activeTheme === 'dark') {
        btnElement.innerHTML = '☀️ Light Mode';
        btnElement.setAttribute('aria-label', 'Switch to light layout mode');
    } else {
        btnElement.innerHTML = '🌙 Dark Mode';
        btnElement.setAttribute('aria-label', 'Switch to dark layout mode');
    }
}
