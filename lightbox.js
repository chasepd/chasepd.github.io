// Lightbox functionality
class Lightbox {
    constructor() {
        this.init();
    }

    init() {
        // Create lightbox element if it doesn't exist
        if (!document.querySelector('.lightbox')) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = '<img src="" alt="" />';
            document.body.appendChild(lightbox);

            // Add click handler to lightbox
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.close();
                }
            });

            // Add escape key handler
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            });
        }

        // Add click handlers to all content images
        this.addImageHandlers();
    }

    addImageHandlers() {
        const images = document.querySelectorAll('.post-content img, .about-content img, figure img');
        images.forEach(img => {
            if (!img.closest('.navbar-container') && !img.closest('.lightbox')) {
                img.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.open(img);
                });
            }
        });
    }

    open(img) {
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        const lightbox = document.querySelector('.lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lightbox = new Lightbox();
});

// Re-initialize handlers when Turbolinks/PJAX loads new content (if applicable)
document.addEventListener('turbolinks:load', () => {
    window.lightbox = new Lightbox();
}); 