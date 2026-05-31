// Portfolio Enhancement Script
document.addEventListener('DOMContentLoaded', function() {
    // ========== CONFIGURATION ==========
    const projects = [
        {
            title: "Multi Digit Recognition",
            description: "AI GUI app recognizing handwritten multi-digit numbers using CNN and OpenCV with real-time drawing interface.",
            github: "https://github.com/Ashmeet04Singh/multi_digit_recognition",
            tech: ["Python", "CNN", "OpenCV", "Tkinter", "TensorFlow"],
            featured: true
        },
        {
            title: "AI Chess Game",
            description: "Intelligent chess game with AI opponent using Python and Pygame, featuring move validation and checkmate logic.",
            github: "https://github.com/Ashmeet04Singh/chess-pygame",
            tech: ["Python", "Pygame", "AI", "Game Dev"],
            featured: true
        },
        {
            title: "Fruit Recognition App",
            description: "Real-time fruit classifier using image classification that identifies fruit types via GUI/webcam with 95% accuracy.",
            github: "https://github.com/Ashmeet04Singh/Fruit_Recognition_App",
            tech: ["Python", "TensorFlow", "OpenCV", "CNN"],
            featured: true
        },
        {
            title: "Patient Management System",
            description: "Full-stack hospital management platform with Flask, PostgreSQL, and Bootstrap featuring CRUD operations and user roles.",
            github: "https://github.com/Ashmeet04Singh/patient-management-web",
            tech: ["Flask", "PostgreSQL", "Bootstrap", "Python", "REST API"],
            featured: true
        },
        {
            title: "Movie Recommendation System",
            description: "Intelligent web app that recommends movies based on user preferences using collaborative and content-based filtering.",
            github: "https://github.com/Ashmeet04Singh/Movie-Recommendation-Sytem.git",
            tech: ["Python", "Machine Learning", "Flask", "Data Science", "Pandas"],
            featured: true
        },
        {
            title: "MATH_JARVIS",
            description: "Advanced AI-powered math assistant with conversational capabilities, GUI, and complex problem-solving using SymPy.",
            github: "https://github.com/Ashmeet04Singh/MATH_JARVIS",
            tech: ["Python", "Tkinter", "AI/LLM", "SymPy", "Calculus"],
            featured: true
        }
    ];

    const certificates = [
        {
            title: "Generative AI Foundations",
            date: "14th July 2025",
            image: "images/genai_certificate.png",
            pdf: "certificates/Generative AI Foundations Certificate Program.pdf",
            description: "Completed comprehensive course on fundamentals of Generative AI, including GPT models and applications.",
            tech: ["Generative AI", "Deep Learning", "Transformers"]
        },
        {
            title: "Power BI Basic Course",
            date: "31st July 2025",
            image: "images/powerbi_certificate.png",
            pdf: "certificates/certificate (1).pdf",
            description: "Mastered Power BI fundamentals including data visualization, dashboard creation, and DAX formulas.",
            tech: ["Power BI", "Data Visualization", "Dashboard"]
        },
        {
            title: "IBM Python for Data Science",
            date: "2025",
            image: "images/ibm_certificate.png",
            pdf: "certificates/IBM Certificate.pdf",
            description: "Covered Python basics, data analysis, visualization, and machine learning fundamentals for data science.",
            tech: ["Python", "Data Science", "IBM", "Data Analysis"]
        }
    ];

    // ========== INITIALIZE APP ==========
    function initApp() {
        initializeStarfield();
        loadProjects();
        loadCertificates();
        setupEventListeners();
        setupTheme();
        setupTypewriter();
        setupScrollAnimations();
    }

    // ========== STARFIELD BACKGROUND ==========
    function initializeStarfield() {
        const canvas = document.getElementById('starCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let stars = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createStars();
        }

        function createStars() {
            stars = [];
            const starCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000));
            
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    speed: Math.random() * 0.5 + 0.2,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            
            const theme = document.documentElement.getAttribute('data-theme') || 'light';
            if (theme === 'dark') {
                gradient.addColorStop(0, 'rgba(15, 23, 42, 0.3)');
                gradient.addColorStop(1, 'rgba(15, 23, 42, 1)');
            } else {
                gradient.addColorStop(0, 'rgba(248, 250, 252, 0.3)');
                gradient.addColorStop(1, 'rgba(248, 250, 252, 1)');
            }
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw stars
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                
                // Move star
                star.x -= star.speed;
                if (star.x < -10) {
                    star.x = canvas.width + 10;
                    star.y = Math.random() * canvas.height;
                }
            });
            
            // Draw connecting lines
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            animationId = requestAnimationFrame(drawStars);
        }

        // Initialize
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawStars();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }

    // ========== PROJECTS LOADING ==========
    function loadProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-aos="fade-up">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-links">
                        <a href="${project.github}" class="project-link" target="_blank" aria-label="View on GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        <button class="project-link demo-btn" aria-label="View details">
                            <i class="fas fa-external-link-alt"></i>
                        </button>
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // ========== CERTIFICATES LOADING ==========
    function loadCertificates() {
        const certificatesGrid = document.querySelector('.certificates-grid');
        if (!certificatesGrid) return;

        certificatesGrid.innerHTML = certificates.map(cert => `
            <div class="certificate-card" data-aos="fade-up">
                <div class="certificate-header">
                    <h3 class="certificate-title">${cert.title}</h3>
                    <div class="certificate-links">
                        <a href="${cert.pdf}" class="certificate-link" target="_blank" aria-label="View PDF">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
                <a href="${cert.pdf}" target="_blank">
                    <img src="${cert.image}" alt="${cert.title}" class="certificate-image" loading="lazy">
                </a>
                <p class="certificate-description"><strong>Completed:</strong> ${cert.date}</p>
                <p class="certificate-description">${cert.description}</p>
                <div class="certificate-tech">
                    ${cert.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // ========== TYPEWRITER EFFECT ==========
    function setupTypewriter() {
        const typewriter = document.querySelector('.typewriter');
        if (!typewriter) return;

        const texts = [
            "Aspiring Software Engineer",
            "AI & Web Developer",
            "Python Enthusiast",
            "Problem Solver"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function type() {
            if (isPaused) return;

            const currentText = texts[textIndex];
            
            if (!isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    isPaused = true;
                    setTimeout(() => {
                        isPaused = false;
                        isDeleting = true;
                        setTimeout(type, 50);
                    }, 2000);
                    return;
                }
            } else {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
            }
            
            setTimeout(type, isDeleting ? 30 : 80);
        }

        // Start typewriter after a delay
        setTimeout(type, 1000);
    }

    // ========== THEME MANAGEMENT ==========
    function setupTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = themeToggle?.querySelector('i');
        
        // Check for saved theme or prefer color scheme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', initialTheme);
        
        if (themeIcon) {
            themeIcon.className = initialTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        themeToggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (themeIcon) {
                themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            // Show theme change feedback
            showToast(`Switched to ${newTheme} theme`);
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    function setupScrollAnimations() {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        
        function handleScroll() {
            // Navbar effect
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Section animations
            animateOnScroll();
        }
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        // Back to top functionality
        document.querySelector('.back-to-top')?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.85;
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // ========== EVENT LISTENERS ==========
    function setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        
        mobileMenuBtn?.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mobileNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        contactForm?.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            setTimeout(() => {
                showToast('Message sent successfully! I\'ll get back to you soon.');
                this.reset();
            }, 1000);
        });

        // Project demo buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.demo-btn')) {
                const projectCard = e.target.closest('.project-card');
                const projectTitle = projectCard?.querySelector('.project-title')?.textContent;
                const project = projects.find(p => p.title === projectTitle);
                
                if (project) {
                    window.open(project.github, '_blank');
                }
            }
        });
    }

    // ========== UTILITY FUNCTIONS ==========
    function closeMobileMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileNav?.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    function showToast(message) {
        const toast = document.getElementById('successToast');
        if (!toast) return;
        
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ========== INITIALIZE ==========
    initApp();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});