// Time-Routing.js
//Detect's viewers local time and routes from landing to the matching mood page.

const enterlink = document.querySelector('.enter-link');

function getMoodForCurrentItem() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 16) {
        return 'afternoon';
    } else if (hour >= 16 && hour < 20) {
        return 'evening';
    } else{
        return 'night';
    }
}

if (enterlink) {
    const mood = getMoodForCurrentItem();
    enterlink.setAttribute('href', `${mood}.html`);
}

// ============================================
// Mood navigation toggle (for mood pages)
// ============================================

const moodNav = document.querySelector('.mood-nav');
const moodLabel = document.querySelector('.mood-label');

if (moodNav && moodLabel) {
    moodLabel.addEventListener('click', function(event) {
        event.stopPropagation();
        moodNav.classList.toggle('open');
        const isOpen = moodNav.classList.contains('open');
        moodLabel.setAttribute('aria-expanded', isOpen);
    });
    
    document.addEventListener('click', function(event) {
        if (!moodNav.contains(event.target)) {
            moodNav.classList.remove('open');
            moodLabel.setAttribute('aria-expanded', 'false');
        }
    });
}