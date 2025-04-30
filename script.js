document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animated Counters
    const counters = document.querySelectorAll('.counter h1');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Start counters when counters section is visible
                if (entry.target.classList.contains('counters')) {
                    animateCounters();
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Live Chat Functionality
    const chatButton = document.getElementById('chatButton');
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            alert('Live chat connection is being established...');
        });
    }

    // Doctor Search Modal
    const doctorModal = document.getElementById('doctorModal');
    const doctorSearchBtn = document.querySelector('.nav-links li:nth-child(2) a');
    const closeModal = document.querySelector('.close');

    if (doctorSearchBtn && doctorModal) {
        doctorSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            doctorModal.style.display = 'block';
            document.body.classList.add('modal-open');
        });

        closeModal.addEventListener('click', function() {
            doctorModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });

        window.addEventListener('click', function(e) {
            if (e.target == doctorModal) {
                doctorModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    }

    // Doctor Search Functionality
    const doctorSearchForm = document.getElementById('doctorSearch');
    if (doctorSearchForm) {
        doctorSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const resultsDiv = document.getElementById('searchResults');
            
            const doctors = [
                {
                    name: "Dr. Priya Sharma",
                    specialty: "Cardiologist",
                    distance: "2 km away",
                    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200",
                    experience: "12 years experience"
                },
                {
                    name: "Dr. Rajesh Patel",
                    specialty: "General Physician",
                    distance: "1.5 km away",
                    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200",
                    experience: "8 years experience"
                }
            ];
            
            resultsDiv.innerHTML = doctors.map(doctor => `
                <div class="doctor-card">
                    <img src="${doctor.image}" alt="${doctor.name}">
                    <div class="doctor-info">
                        <h3>${doctor.name}</h3>
                        <p>${doctor.specialty}</p>
                        <p>${doctor.experience}</p>
                        <p>${doctor.distance}</p>
                        <button class="btn-primary">Book Appointment</button>
                    </div>
                </div>
            `).join('');
        });
    }

    // FAQ Accordion
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length > 0) {
            const firstItem = faqItems[0];
            const firstAnswer = firstItem.querySelector('.faq-answer');
            const firstQuestion = firstItem.querySelector('.faq-question');
            
            firstItem.classList.add('active');
            firstQuestion.classList.add('active');
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    question.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    question.classList.remove('active');
                    answer.style.maxHeight = null;
                }
            });
        });
    }
    
    initFAQAccordion();

    // Emergency Contact Animation
    const emergencyBtn = document.querySelector('.emergency-btn');
    if (emergencyBtn) {
        const originalText = emergencyBtn.innerHTML;
        
        emergencyBtn.addEventListener('mouseover', function() {
            this.innerHTML = '<i class="fas fa-phone"></i> Call Now: 123-456-7890';
        });

        emergencyBtn.addEventListener('mouseout', function() {
            this.innerHTML = originalText;
        });
    }

    // ===== THEME SWITCHING SYSTEM =====
    const defaultThemes = {
        light: {
            'primary-color': '#0077ff',
            'bg-color': '#ffffff',
            'text-color': '#333333',
            'nav-bg': '#ffffff',
            'nav-text': '#333333',
            'card-bg': '#ffffff',
            'footer-bg': '#222222',
            'footer-text': '#ffffff'
        },
        dark: {
            'primary-color': '#0d6efd',
            'bg-color': '#121212',
            'text-color': '#f8f9fa',
            'nav-bg': '#121212',
            'nav-text': '#f8f9fa',
            'card-bg': '#1e1e1e',
            'footer-bg': '#000000',
            'footer-text': '#f8f9fa'
        }
        
    };

    const themeSelector = document.getElementById('theme-selector');
    const customControls = document.getElementById('custom-theme-controls');
    
    const colorInputs = {
        'primary-color': document.getElementById('primary-color'),
        'bg-color': document.getElementById('bg-color'),
        'text-color': document.getElementById('text-color'),
        'nav-bg': document.getElementById('nav-bg-color')
    };

    function setCSSVar(name, value) {
        document.documentElement.style.setProperty(`--${name}`, value);
    }

    function resetToDefault(theme) {
        Object.entries(defaultThemes[theme]).forEach(([name, value]) => {
            setCSSVar(name, value);
        });
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedColors = JSON.parse(localStorage.getItem('customColors')) || {};
        
        document.body.setAttribute('data-theme', savedTheme);
        themeSelector.value = savedTheme;
        
        if (savedTheme === 'custom') {
            customControls.classList.remove('hidden');
            Object.entries(colorInputs).forEach(([name, input]) => {
                if (savedColors[name]) {
                    input.value = savedColors[name];
                    setCSSVar(name, savedColors[name]);
                }
            });
        } else {
            customControls.classList.add('hidden');
            resetToDefault(savedTheme);
        }
    }

    themeSelector.addEventListener('change', function() {
        const theme = this.value;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'custom') {
            customControls.classList.remove('hidden');
            Object.entries(colorInputs).forEach(([name, input]) => {
                setCSSVar(name, input.value);
            });
        } else {
            customControls.classList.add('hidden');
            resetToDefault(theme);
        }
    });

    Object.entries(colorInputs).forEach(([name, input]) => {
        input.addEventListener('input', function() {
            setCSSVar(name, this.value);
            if (themeSelector.value === 'custom') {
                const colors = {};
                Object.entries(colorInputs).forEach(([key, input]) => {
                    colors[key] = input.value;
                });
                localStorage.setItem('customColors', JSON.stringify(colors));
            }
        });
    });

    loadTheme();
});