/* ═══════════════════════════════════════════════════════
   MODAL LIGHTBOX JAVASCRIPT
   Add this to a new file: modal-lightbox.js
   Or add to your existing slideshow.js
   ═══════════════════════════════════════════════════════ */

// Modal Lightbox System for Concept Images
(function() {
    'use strict';
    
    // Create modal HTML and inject into page
    function createModal() {
        const modalHTML = `
            <div class="image-modal" id="imageModal">
                <div class="modal-content">
                    <button class="modal-close" id="modalClose" aria-label="Close">×</button>
                    <div class="modal-slideshow" id="modalSlideshow">
                        <!-- Slides will be injected here -->
                    </div>
                    <button class="modal-prev" id="modalPrev" aria-label="Previous">&#10094;</button>
                    <button class="modal-next" id="modalNext" aria-label="Next">&#10095;</button>
                    <div class="modal-counter" id="modalCounter">1 / 3</div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Modal state
    let currentModalSlide = 0;
    let modalSlides = [];
    let modal = null;
    
    // Initialize modal when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Create modal element
        createModal();
        
        modal = document.getElementById('imageModal');
        const modalClose = document.getElementById('modalClose');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        
        // Add click handlers to all product slideshows
        const slideshows = document.querySelectorAll('.product-slideshow');
        
        slideshows.forEach(function(slideshow) {
            slideshow.addEventListener('click', function(e) {
                // Don't open modal if clicking on navigation arrows
                if (e.target.classList.contains('slide-prev') || 
                    e.target.classList.contains('slide-next')) {
                    return;
                }
                
                openModal(slideshow);
            });
        });
        
        // Close modal handlers
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Navigation handlers
        modalPrev.addEventListener('click', function() {
            navigateModal(-1);
        });
        
        modalNext.addEventListener('click', function() {
            navigateModal(1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
        });
    });
    
    // Open modal with images from clicked slideshow
    function openModal(slideshow) {
        const slides = slideshow.querySelectorAll('.product-slide img');
        const modalSlideshowContainer = document.getElementById('modalSlideshow');
        
        // Clear previous slides
        modalSlideshowContainer.innerHTML = '';
        modalSlides = [];
        
        // Create modal slides from original images
        slides.forEach(function(img, index) {
            const modalSlide = document.createElement('div');
            modalSlide.className = 'modal-slide';
            if (index === 0) modalSlide.classList.add('active');
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            
            modalSlide.appendChild(modalImg);
            modalSlideshowContainer.appendChild(modalSlide);
            modalSlides.push(modalSlide);
        });
        
        currentModalSlide = 0;
        updateModalCounter();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Navigate between modal slides
    function navigateModal(direction) {
        // Hide current slide
        modalSlides[currentModalSlide].classList.remove('active');
        
        // Calculate new slide index
        currentModalSlide += direction;
        
        // Wrap around
        if (currentModalSlide >= modalSlides.length) {
            currentModalSlide = 0;
        } else if (currentModalSlide < 0) {
            currentModalSlide = modalSlides.length - 1;
        }
        
        // Show new slide
        modalSlides[currentModalSlide].classList.add('active');
        updateModalCounter();
    }
    
    // Update counter display
    function updateModalCounter() {
        const counter = document.getElementById('modalCounter');
        counter.textContent = `${currentModalSlide + 1} / ${modalSlides.length}`;
    }
    
})();
