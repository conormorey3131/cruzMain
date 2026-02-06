/**
 * Cruz Ireland Website JavaScript
 * Enhanced with modern gallery features and performance optimizations
 */

// Throttle function to limit how often a function can fire
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && !event.target.closest('nav')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Gallery Filtering with animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const gallerySections = document.querySelectorAll('.gallery-section');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide gallery sections based on filter
                if (filter === 'all') {
                    gallerySections.forEach(section => {
                        section.style.display = 'block';
                    });
                } else {
                    gallerySections.forEach(section => {
                        if (section.id === filter) {
                            section.style.display = 'block';
                        } else {
                            section.style.display = 'none';
                        }
                    });
                }
                
                // Scroll to the top of the gallery after filtering
                const galleryTop = document.querySelector('.gallery-filters');
                if (galleryTop) {
                    window.scrollTo({
                        top: galleryTop.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Gallery Image Overlay and Download Functionality
    const galleryImageItems = document.querySelectorAll('.gallery-item');
    
    if (galleryImageItems.length > 0) {
        galleryImageItems.forEach(item => {
            const container = item.querySelector('.image-container');
            const img = container.querySelector('img');
            const overlay = container.querySelector('.overlay');
            const downloadBtn = container.querySelector('.download-btn');
            
            // Prevent the image from being a clickable link
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            
            // Prevent the container from being a clickable link
            container.addEventListener('click', function(e) {
                // Only prevent default if not clicking on the download button
                if (!e.target.closest('.download-btn')) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
            
            // Download button uses default behavior via download attribute
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real implementation, you would send this to a server
                // For now, just show a success message
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    navLinks2.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (currentPage === linkHref || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Enhanced Lazy Loading for Images with fade-in effect
    const lazyLoadImages = () => {
        // For images with data-src, use intersection observer for true lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');

        if (lazyImages.length > 0) {
            const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.classList.add('lazy-load-fade');
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute('data-src');
                        lazyImage.addEventListener('load', () => {
                            lazyImage.classList.add('loaded');
                        });
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(img => {
                lazyImageObserver.observe(img);
            });
        }

        // For images with loading="lazy" that already have src, just add fade effect
        const nativeLazyImages = document.querySelectorAll('img[loading="lazy"]:not([data-src])');
        nativeLazyImages.forEach(img => {
            if (img.complete) {
                img.classList.add('lazy-load-fade', 'loaded');
            } else {
                img.classList.add('lazy-load-fade');
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    };

    // Initialize lazy loading
    lazyLoadImages();
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', throttle(animateOnScroll, 100));

    // Add class to header on scroll
    const header = document.querySelector('header');

    // Back to top button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    // Combined scroll handler for header and back-to-top button (throttled)
    const handleScroll = throttle(function() {
        const scrollY = window.scrollY;

        // Header scroll effect
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add lightbox functionality for gallery images
    const galleryImageContainers = document.querySelectorAll('.gallery-item .image-container');
    
    if (galleryImageContainers.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img class="lightbox-image" src="" alt="Lightbox Image">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeLightbox = lightbox.querySelector('.close-lightbox');
        
        // Open lightbox when clicking on an image
        galleryImageContainers.forEach(container => {
            container.addEventListener('click', function(e) {
                // Don't open lightbox if clicking on download button
                if (!e.target.closest('.download-btn')) {
                    const img = container.querySelector('img');
                    const caption = container.querySelector('.overlay-content h3')?.textContent || '';
                    
                    lightboxImage.src = img.src;
                    lightboxCaption.textContent = caption;
                    lightbox.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
                    
                    // Add animation class
                    setTimeout(() => {
                        lightbox.classList.add('active');
                    }, 10);
                }
            });
        });
        
        // Close lightbox when clicking on close button or outside the image
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }, 300);
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox.click();
            }
        });
        
        // Close lightbox with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox.click();
            }
        });
    }
});
