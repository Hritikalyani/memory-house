// mood-nav.js
// Toggles the mood navigation list open/closed when the mood label is clicked.

const moodNav = document.querySelector('.mood-nav');
const moodLabel = document.querySelector('.mood-label');

if (moodNav && moodLabel) {
    moodLabel.addEventListener('click', function(event) {
        event.stopPropagation();
        moodNav.classList.toggle('open');
        const isOpen = moodNav.classList.contains('open');
        moodLabel.setAttribute('aria-expanded', isOpen);
    });
    
    document.addEventListener('click', function() {
        moodNav.classList.remove('open');
        moodLabel.setAttribute('aria-expanded', 'false');
    });
}