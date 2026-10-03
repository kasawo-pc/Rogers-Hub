document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const globalThemeToggle = document.getElementById('globalThemeToggle');
    const tabSignIn = document.getElementById('tabSignIn');
    const tabSignUp = document.getElementById('tabSignUp');
    const authMainTitle = document.getElementById('authMainTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const nameInputGroup = document.getElementById('nameInputGroup');
    const submitBtnText = document.getElementById('submitBtnText');
    const authForm = document.getElementById('authForm');
    const linkSwitchMode = document.getElementById('linkSwitchMode');
    const passwordInput = document.getElementById('password');
    const passwordToggleBtn = document.getElementById('passwordToggleBtn');
    const eyeIcon = document.getElementById('eyeIcon');
    const authStatusFeedback = document.getElementById('authStatusFeedback');

    const authCard = document.getElementById('authCard');
    const verifyCard = document.getElementById('verifyCard');
    const accountCard = document.getElementById('accountCard');

    let isSignUpMode = false;

    // Theme Toggle
    globalThemeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        globalThemeToggle.querySelector('.theme-btn-text').textContent =
            newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });

    // Password Visibility Toggle
    passwordToggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        eyeIcon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    });

    // Mode Switchers
    function setMode(signUp) {
        isSignUpMode = signUp;
        if (isSignUpMode) {
            tabSignUp.classList.add('active');
            tabSignIn.classList.remove('active');
            authMainTitle.textContent = 'Register (Sign Up)';
            authSubtitle.textContent = 'Create your official KPC Engineering account.';
            nameInputGroup.classList.remove('hidden');
            submitBtnText.textContent = 'Register Account';
            document.getElementById('fullName').setAttribute('required', 'true');
        } else {
            tabSignIn.classList.add('active');
            tabSignUp.classList.remove('active');
            authMainTitle.textContent = 'Sign In';
            authSubtitle.textContent = 'Welcome back! Please enter your authentication details.';
            nameInputGroup.classList.add('hidden');
            submitBtnText.textContent = 'Authenticate Securely';
            document.getElementById('fullName').removeAttribute('required');
        }
    }

    tabSignIn.addEventListener('click', () => setMode(false));
    tabSignUp.addEventListener('click', () => setMode(true));
    linkSwitchMode.addEventListener('click', (e) => {
        e.preventDefault();
        setMode(!isSignUpMode);
    });

    // Form Submission
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        authStatusFeedback.textContent = '';
        authStatusFeedback.className = 'form-feedback-dialog';

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const fullName = document.getElementById('fullName').value.trim();

        // Local Storage Database implementation
        let users = JSON.parse(localStorage.getItem('kpc_users')) || [];

        if (isSignUpMode) {
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                authStatusFeedback.textContent = 'User with this email already exists.';
                authStatusFeedback.classList.add('error');
                return;
            }

            const newUser = {
                id: 'KPC-' + Math.floor(100000 + Math.random() * 900000),
                fullName,
                email,
                password, // Note: Production builds should hash passwords
                joinedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                status: 'Verified'
            };

            users.push(newUser);
            localStorage.setItem('kpc_users', JSON.stringify(users));

            // Redirect view to Verification or Account
            document.getElementById('verifyTargetEmail').textContent = email;
            authCard.classList.add('hidden');
            verifyCard.classList.remove('hidden');

        } else {
            const foundUser = users.find(u => u.email === email && u.password === password);
            if (foundUser) {
                showAccountView(foundUser);
            } else {
                authStatusFeedback.textContent = 'Invalid email or password credentials.';
                authStatusFeedback.classList.add('error');
            }
        }
    });

    // Verification Form Handler
    document.getElementById('verifyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('verifyTargetEmail').textContent;
        const users = JSON.parse(localStorage.getItem('kpc_users')) || [];
        const currentUser = users.find(u => u.email === email);

        verifyCard.classList.add('hidden');
        showAccountView(currentUser);
    });

    function showAccountView(user) {
        authCard.classList.add('hidden');
        verifyCard.classList.add('hidden');
        accountCard.classList.remove('hidden');

        document.getElementById('accFullName').textContent = user ? user.fullName : 'KPC Member';
        document.getElementById('accEmail').textContent = user ? user.email : 'N/A';
        document.getElementById('accStatus').textContent = user ? user.status : 'Active';
        document.getElementById('accLink').href = 'database.html';
        document.getElementById('accLink').textContent = 'View Central Database Registry';
    }

    document.getElementById('btnLogout').addEventListener('click', () => {
        accountCard.classList.add('hidden');
        authCard.classList.remove('hidden');
        authForm.reset();
    });
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

// registry.js - Manages KPC Registry Database & Downloads
document.getElementById('btnSubmitAction').addEventListener('click', function (e) {
    e.preventDefault();

    const btn = this;
    const btnText = document.getElementById('submitBtnText');
    const btnIcon = document.getElementById('submitIcon');

    // Capture form values
    const fullNameInput = document.getElementById('memberFullName')?.value.trim();
    const emailInput = document.getElementById('memberEmail')?.value.trim();
    const classInput = document.getElementById('memberClass')?.value.trim();
    const trackInput = document.getElementById('memberTrack')?.value.trim();

    if (!fullNameInput || !emailInput) {
        alert("Please fill in the required fields (Name and Email).");
        return;
    }

    // UI Loading State
    btn.disabled = true;
    btnText.textContent = "Saving Registry...";
    btnIcon.className = "fa-solid fa-spinner fa-spin";

    setTimeout(() => {
        // Retrieve existing registry or initialize with your starting seed data
        let registry = JSON.parse(localStorage.getItem('kpc_registry'));

        if (!registry || registry.length === 0) {
            registry = [
                { id: "KPC-2026-001", fullName: "Rogers Richard", email: "rogerrichardpark744@gmail.com", class: "Senior 2 (2026)", track: "Software Engineering", joinedDate: "1/15/2026" },
                { id: "KPC-2026-002", fullName: "Jonathan M.", email: "jonathan@kasawoss.com", class: "Senior 6 (2026)", track: "Web Development", joinedDate: "1/18/2026" },
                { id: "KPC-2026-003", fullName: "Dalton K.", email: "dalton@kasawoss.com", class: "Senior 5", track: "Cyber Security", joinedDate: "2/1/2026" },
                { id: "KPC-2026-004", fullName: "Rogers Richard", email: "ROGERRICHARD744@GMAIL.COM", class: "S6", track: "HACKING", joinedDate: "2/6/2026" }
            ];
        }

        // Generate incremental ID sequence
        const nextIdNumber = registry.length + 1;
        const generatedId = `KPC-2026-${String(nextIdNumber).padStart(3, '0')}`;
        const currentDate = new Date().toLocaleDateString('en-US');

        // Append new registry object
        const newMemberRow = {
            id: generatedId,
            fullName: fullNameInput,
            email: emailInput,
            class: classInput || 'N/A',
            track: trackInput || 'N/A',
            joinedDate: currentDate
        };

        registry.push(newMemberRow);
        localStorage.setItem('kpc_registry', JSON.stringify(registry));

        // Build CSV Content Blob
        const headers = ["ID", "Full Name", "Email", "Class", "Track", "Joined Date"];
        const csvRows = [headers.join(",")];

        registry.forEach(member => {
            const row = [
                `"${member.id}"`,
                `"${member.fullName}"`,
                `"${member.email}"`,
                `"${member.class}"`,
                `"${member.track}"`,
                `"${member.joinedDate}"`
            ];
            csvRows.push(row.join(","));
        });

        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

        // Programmatic download link compilation
        const downloadLink = document.createElement("a");
        const url = URL.createObjectURL(blob);
        downloadLink.setAttribute("href", url);
        downloadLink.setAttribute("download", "kpc_members_registry_2026-08-04.csv");
        downloadLink.style.visibility = 'hidden';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // UI Success State
        btnText.textContent = "Saved & Downloaded!";
        btnIcon.className = "fa-solid fa-check";

        document.querySelector('form')?.reset();

        setTimeout(() => {
            btn.disabled = false;
            btnText.textContent = "Authenticate Securely";
            btnIcon.className = "fa-solid fa-right-to-bracket";
        }, 2000);

    }, 1200);
});
