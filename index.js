document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Mobile Hamburger Menu Toggle ---
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navActions = document.getElementById("navActions");

    if (mobileMenuBtn && navActions) {
        mobileMenuBtn.addEventListener("click", () => {
            navActions.classList.toggle("active");
            
            // Switch icon between bars and close (X)
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
                if (navActions.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // Close mobile menu when clicking any nav link
    const navLinks = document.querySelectorAll(".nav-link-btn");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navActions.classList.contains("active")) {
                navActions.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    });

    // --- 2. Back to Top Button Logic ---
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- 3. Simple Scroll Reveal Animation ---
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    };

    const hideScrollElement = (element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
    };

    // Initialize initial state for hidden scroll elements
    scrollElements.forEach((el) => {
        el.style.transition = "all 0.6s ease-in-out";
        hideScrollElement(el);
    });

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // Trigger once on page load
    handleScrollAnimation();
});

 document.getElementById('linkedinBtn').addEventListener('click', function() {
            window.open('https://linkedin.com', '_blank');
        });