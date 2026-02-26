// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const proceedButton = document.getElementById('proceed-button');
    const modalOverlay = document.getElementById('modal-overlay');
    const mainContent = document.getElementById('main-content');

    if (proceedButton && modalOverlay && mainContent) {
        proceedButton.addEventListener('click', function(e) {
            e.preventDefault();
            modalOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
        });
    }
});

// Tab switching functionality with IMMEDIATE scroll-to-top
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // SCROLL TO TOP FIRST - Do this immediately before anything else
            window.scrollTo(0, 0);
            
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Scroll to top again after a tiny delay to ensure it works
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 10);
        });
    });
});

// Collapsible buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const collapsibleButtons = document.querySelectorAll('.collapsible-btn');
    
    collapsibleButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content && content.classList.contains('collapsible-content')) {
                content.classList.toggle('active');
            }
        });
    });
});

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Annotation popup system with click and hover
document.addEventListener('DOMContentLoaded', function() {
    let activePopup = null;
    let clickedPopup = null;

    // Get all highlight elements
    const highlights = document.querySelectorAll('.bi-r, .bi-y, .bi-g, .bi-b');

    highlights.forEach(highlight => {
        const popup = highlight.querySelector('.bi-popup');
        if (!popup) return;

        // Mouse enter on highlight
        highlight.addEventListener('mouseenter', function() {
            if (clickedPopup !== popup) {
                activePopup = popup;
                popup.style.opacity = '1';
                popup.style.visibility = 'visible';
                popup.style.bottom = '5rem';
                popup.style.pointerEvents = 'auto';
            }
        });

        // Mouse leave on highlight
        highlight.addEventListener('mouseleave', function() {
            if (clickedPopup !== popup) {
                setTimeout(() => {
                    if (activePopup === popup && !popup.matches(':hover')) {
                        popup.style.opacity = '0';
                        popup.style.visibility = 'hidden';
                        popup.style.bottom = '4rem';
                        popup.style.pointerEvents = 'none';
                        activePopup = null;
                    }
                }, 100);
            }
        });

        // Mouse enter on popup
        popup.addEventListener('mouseenter', function() {
            activePopup = popup;
        });

        // Mouse leave on popup
        popup.addEventListener('mouseleave', function() {
            if (clickedPopup !== popup) {
                popup.style.opacity = '0';
                popup.style.visibility = 'hidden';
                popup.style.bottom = '4rem';
                popup.style.pointerEvents = 'none';
                activePopup = null;
            }
        });

        // Click on highlight to make popup sticky
        highlight.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (clickedPopup === popup) {
                // Clicking the same popup again closes it
                popup.classList.remove('clicked-popup');
                popup.style.opacity = '0';
                popup.style.visibility = 'hidden';
                popup.style.bottom = '4rem';
                popup.style.pointerEvents = 'none';
                clickedPopup = null;
            } else {
                // Close any previously clicked popup
                if (clickedPopup) {
                    clickedPopup.classList.remove('clicked-popup');
                    clickedPopup.style.opacity = '0';
                    clickedPopup.style.visibility = 'hidden';
                    clickedPopup.style.bottom = '4rem';
                    clickedPopup.style.pointerEvents = 'none';
                }
                
                // Open this popup and make it sticky
                popup.classList.add('clicked-popup');
                popup.style.opacity = '1';
                popup.style.visibility = 'visible';
                popup.style.bottom = '5rem';
                popup.style.pointerEvents = 'auto';
                clickedPopup = popup;
            }
        });
    });

    // Close clicked popup when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (clickedPopup && !e.target.closest('.bi-r, .bi-y, .bi-g, .bi-b')) {
            clickedPopup.classList.remove('clicked-popup');
            clickedPopup.style.opacity = '0';
            clickedPopup.style.visibility = 'hidden';
            clickedPopup.style.bottom = '4rem';
            clickedPopup.style.pointerEvents = 'none';
            clickedPopup = null;
        }
    });
});
