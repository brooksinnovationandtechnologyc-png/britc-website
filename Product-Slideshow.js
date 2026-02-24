// Product Slideshow JavaScript
// Handles multiple independent slideshows in the products table

// Store current slide index for each slideshow
const slideshowStates = {};

// Initialize all slideshows when page loads
document.addEventListener('DOMContentLoaded', function() {
    const slideshows = document.querySelectorAll('.product-slideshow');
    
    slideshows.forEach(function(slideshow) {
        const slideshowId = slideshow.id;
        slideshowStates[slideshowId] = 0; // Start at first slide
        showProductSlide(slideshowId, 0);
    });
});

// Change slide by offset (1 or -1)
function changeProductSlide(slideshowId, offset) {
    const currentIndex = slideshowStates[slideshowId];
    const newIndex = currentIndex + offset;
    setProductSlide(slideshowId, newIndex);
}

// Set slide to specific index
function setProductSlide(slideshowId, index) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;
    
    const slides = slideshow.querySelectorAll('.product-slide');
    const indicators = slideshow.parentElement.querySelectorAll('.indicator');
    
    if (!slides.length) return;
    
    // Wrap around if index is out of bounds
    if (index >= slides.length) {
        index = 0;
    } else if (index < 0) {
        index = slides.length - 1;
    }
    
    // Update state
    slideshowStates[slideshowId] = index;
    
    // Show the selected slide
    showProductSlide(slideshowId, index);
}

// Display the slide at the given index
function showProductSlide(slideshowId, index) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;
    
    const slides = slideshow.querySelectorAll('.product-slide');
    const indicators = slideshow.parentElement.querySelectorAll('.indicator');
    
    // Hide all slides
    slides.forEach(function(slide) {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });
    
    // Remove active class from all indicators
    indicators.forEach(function(indicator) {
        indicator.classList.remove('active');
    });
    
    // Show the current slide
    if (slides[index]) {
        slides[index].style.display = 'block';
        slides[index].classList.add('active');
    }
    
    // Activate the corresponding indicator
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    const focusedSlideshow = document.activeElement.closest('.product-slideshow');
    if (focusedSlideshow) {
        const slideshowId = focusedSlideshow.id;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            changeProductSlide(slideshowId, -1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            changeProductSlide(slideshowId, 1);
        }
    }
});