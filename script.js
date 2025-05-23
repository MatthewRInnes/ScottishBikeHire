function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  const backgroundImages = [
    'images/hw222.jpg',
    'images/pexelsJumpOnbike3.jpg',
    'images/pexelsWalking3.jpg',
    'images/apexelsNew5.jpg',
    'images/bikeTrackPexels1.jpg',
    'images/bikeFix2pexels.jpg'
  ];
  
  let currentImageIndex = 0;
  const articleSection = document.querySelector('.article');
  
  // Function to change the background image with smooth transition
  function changeBackground() {
    articleSection.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length; // Cycle through images
  }
  
  // Set initial background image and start the slideshow
  changeBackground();
  setInterval(changeBackground, 4000); // Change image every 4 seconds (4000 milliseconds)
  
  // Theme toggle functionality
  function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Add click event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Create placeholder graphics for missing images
  function createPlaceholderGraphics() {
    const missingImages = document.querySelectorAll('img[src=""]');
    missingImages.forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-image';
        placeholder.textContent = img.alt || 'Image Placeholder';
        img.parentNode.replaceChild(placeholder, img);
    });
  }

  // Image loading optimization
  function initImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
  }

  // Enhanced animations
  function initAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .service-card, .product-card, .route-card').forEach(card => {
        observer.observe(card);
    });
  }

  // Side Navigation Functionality
  function initSideNav() {
    // Create hamburger button
    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        document.body.appendChild(hamburger);
    }

    // Get side nav and main content
    const sideNav = document.querySelector('.side-nav');
    const mainContent = document.querySelector('.main-content');

    // Create overlay for mobile
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    // Toggle side nav
    function toggleSideNav() {
        const isOpen = sideNav.classList.contains('active');
        if (isOpen) {
            sideNav.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
            if (mainContent) mainContent.classList.remove('menu-open');
        } else {
            sideNav.classList.add('active');
            overlay.classList.add('active');
            hamburger.classList.add('active');
            document.body.classList.add('menu-open');
            if (mainContent) mainContent.classList.add('menu-open');
        }
    }

    // Hamburger click event
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSideNav();
    });

    // Overlay click event
    overlay.addEventListener('click', toggleSideNav);

    // Close menu when clicking a link (for mobile)
    if (sideNav) {
        sideNav.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900 && sideNav.classList.contains('active')) {
                    toggleSideNav();
                }
            });
        });
    }

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideNav.classList.contains('active')) {
            toggleSideNav();
        }
    });

    // Responsive behaviour on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            sideNav.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
            if (mainContent) mainContent.classList.remove('menu-open');
        }
    });
  }

  // Initialize all functionality
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    createPlaceholderGraphics();
    initImageLoading();
    initAnimations();
    initSideNav();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Show success message
            const message = document.createElement('div');
            message.className = 'message success';
            message.textContent = 'Thank you for subscribing!';
            newsletterForm.appendChild(message);
            
            // Clear form
            newsletterForm.reset();
            
            // Remove message after 3 seconds
            setTimeout(() => {
                message.remove();
            }, 3000);
        });
    }

    // Add hover effect to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
  });
