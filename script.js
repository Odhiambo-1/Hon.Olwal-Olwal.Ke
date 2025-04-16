document.addEventListener('DOMContentLoaded', function () {
    const contentWrapper = document.querySelector('.content-wrapper');
    const readMoreBtn = document.querySelector('.read-more-btn');

    readMoreBtn.addEventListener('click', function () {
        contentWrapper.classList.toggle('expanded');
        if (contentWrapper.classList.contains('expanded')) {
            readMoreBtn.textContent = 'Read Less';
        } else {
            readMoreBtn.textContent = 'Read More';
            // Smooth scroll back to the top of the section when collapsing
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer for scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all animated elements
    document.querySelectorAll('.animate-up, .animate-right').forEach(el => {
        observer.observe(el);
        el.style.animationPlayState = 'paused';
    });

    // Smooth scroll for anchor links
    document.querySelector('.banner_btn').addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Optimize image loading
    const img = document.querySelector('.img img');
    if (img) {
        img.loading = 'lazy';
        img.decoding = 'async';
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Configuration object for button settings
    const config = {
        itemsPerLoad: 4,  // Number of items to show per load
        initialItems: 8,  // Initial number of items to show
        loadDelay: 500    // Delay for loading animation in milliseconds
    };

    // Get all activity grid items
    const gridItems = document.querySelectorAll('.box3 [class^="grid"]');

    // Initialize visible items counter
    let visibleItems = config.initialItems;

    // Hide items beyond initial count
    function initializeGrid() {
        gridItems.forEach((item, index) => {
            if (index >= config.initialItems) {
                item.style.display = 'none';
            }
        });

        // Hide explore button if there aren't enough items
        if (gridItems.length <= config.initialItems) {
            document.querySelector('.explore-button').style.display = 'none';
        }
    }

    // Function to show loading animation
    function showLoadingAnimation() {
        const button = document.querySelector('.explore-button');
        button.textContent = 'Loading...';
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.7';
    }

    // Function to reset button state
    function resetButton() {
        const button = document.querySelector('.explore-button');
        button.textContent = 'Explore More';
        button.style.pointerEvents = 'auto';
        button.style.opacity = '1';
    }

    // Function to load more items
    function loadMoreItems() {
        showLoadingAnimation();

        setTimeout(() => {
            const endIndex = Math.min(visibleItems + config.itemsPerLoad, gridItems.length);

            // Show next batch of items with fade-in effect
            for (let i = visibleItems; i < endIndex; i++) {
                const item = gridItems[i];
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            }

            visibleItems = endIndex;

            // Hide button if all items are shown
            if (visibleItems >= gridItems.length) {
                document.querySelector('.explore-button').style.display = 'none';
            } else {
                resetButton();
            }
        }, config.loadDelay);
    }

    // Add click event listener to the explore button
    document.querySelector('.explore-button').addEventListener('click', function (e) {
        e.preventDefault();
        loadMoreItems();
    });

    // Add fade-in animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Initialize the grid on page load
    initializeGrid();
})