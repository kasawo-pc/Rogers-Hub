document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------------------------
    // 1. Unified Dark/Light Theme Switching Engine
    // --------------------------------------------------------------------------
    const toggleBtn = document.getElementById("globalThemeToggle");
    const htmlTag = document.documentElement;

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersLight) {
        applyTheme("light");
    } else {
        applyTheme("dark");
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const currentTheme = htmlTag.getAttribute("data-theme") || "dark";
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            applyTheme(newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    function applyTheme(theme) {
        htmlTag.setAttribute("data-theme", theme);
        if (toggleBtn) {
            const labelText = toggleBtn.querySelector(".theme-btn-text");
            const icon = toggleBtn.querySelector("i");

            if (theme === "light") {
                if (labelText) labelText.textContent = "Dark Mode";
                if (icon) icon.className = "fa-solid fa-moon";
            } else {
                if (labelText) labelText.textContent = "Light Mode";
                if (icon) icon.className = "fa-solid fa-sun";
            }
        }
    }

    // --------------------------------------------------------------------------
    // 2. Client-Side Form Validation & Async Submission Simulation
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById("kpcContactForm");
    const feedbackMsg = document.getElementById("formStatusFeedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let isValid = true;

            // Input elements
            const nameInput = document.getElementById("visitorName");
            const emailInput = document.getElementById("visitorEmail");
            const messageInput = document.getElementById("messageContent");

            // Validate Name
            if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
                showError(nameInput);
                isValid = false;
            } else {
                clearError(nameInput);
            }

            // Validate Email
            if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
                showError(emailInput);
                isValid = false;
            } else {
                clearError(emailInput);
            }

            // Validate Message
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                showError(messageInput);
                isValid = false;
            } else {
                clearError(messageInput);
            }

            // If valid, submit form
            if (isValid) {
                feedbackMsg.className = "form-feedback-message success";
                feedbackMsg.textContent = "Transmission received! Our system architecture team will get back to you shortly.";
                contactForm.reset();

                setTimeout(() => {
                    feedbackMsg.className = "form-feedback-message";
                    feedbackMsg.textContent = "";
                }, 5000);
            }
        });
    }

    function showError(inputEl) {
        const parent = inputEl.parentElement;
        parent.classList.add("error");
    }

    function clearError(inputEl) {
        const parent = inputEl.parentElement;
        parent.classList.remove("error");
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

document.querySelector('.btn-submit-form').addEventListener('click', function (event) {
    // 1. Prevent immediate navigation/download
    event.preventDefault();

    // 2. Collect your form data (replace selectors with your actual input IDs)
    const userData = {
        name: document.getElementById('name')?.value || '',
        message: document.getElementById('message')?.value || '',
        timestamp: new Date().toISOString()
    };

    // 3. Process data (e.g., save to localStorage or send to a server)
    localStorage.setItem('savedMemberDetails', JSON.stringify(userData));
    console.log('Details saved:', userData);

    // 4. Trigger the original link destination after saving
    const link = this.querySelector('a');
    if (link) {
        window.location.href = link.href;
    }
});