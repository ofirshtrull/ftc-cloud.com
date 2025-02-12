// JavaScript for interactivity will go here
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const nav = document.querySelector('nav ul');

    if (menuIcon) {
        menuIcon.addEventListener('click', function () {
            nav.classList.toggle('active');
            menuIcon.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuIcon.classList.remove('active');
                }

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation to sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // LinkedIn Link Analytics
    var linkedinLink = document.getElementById('linkedin-link');
    if (linkedinLink) {
        linkedinLink.addEventListener('click', function (event) {
            event.preventDefault();
            gtag('event', 'click', {
                'event_category': 'Outbound Link',
                'event_label': 'LinkedIn Profile',
                'event_action': 'click',
                'event_callback': function () {
                    window.open(linkedinLink.href, '_blank');
                }
            });
        });
    }

    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic form validation
            const formData = new FormData(this);
            let isValid = true;
            let errorMessages = [];

            // Validate email
            const email = formData.get('email');
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                errorMessages.push('Please enter a valid email address');
            }

            // Validate message
            const message = formData.get('message');
            if (!message || message.trim().length < 10) {
                isValid = false;
                errorMessages.push('Message must be at least 10 characters long');
            }

            if (!isValid) {
                alert(errorMessages.join('\n'));
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            // Here you would typically send the form data to your server
            // For now, we'll simulate a submission
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent!';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 2000);
            }, 1500);
        });
    }
});
