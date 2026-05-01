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

// ==============================================
// Photo entrance animations on scroll
// ==============================================

const photoSections = document.querySelectorAll('.photo-section');

if (photoSections.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.5
    });
    
    function startObserving() {
        photoSections.forEach(function(section) {
            observer.observe(section);
        });
    }
    
    if (document.readyState === 'complete') {
        startObserving();
    } else {
        window.addEventListener('load', startObserving);
    }
}

// ============================================
// Dawn / Dusk discovery unlock
// ============================================

// Track which moods the visitor has seen
const moodPages = ['morning', 'afternoon', 'evening', 'night'];
const currentBodyClasses = document.body.classList;
const currentMood = moodPages.find(mood => currentBodyClasses.contains(mood));

if (currentMood) {
    let visited = JSON.parse(localStorage.getItem('memoryHouseVisited') || '[]');
    if (!visited.includes(currentMood)) {
        visited.push(currentMood);
        localStorage.setItem('memoryHouseVisited', JSON.stringify(visited));
    }
}

// Check if all four primary moods have been visited
function hasUnlockedExploration() {
    const visited = JSON.parse(localStorage.getItem('memoryHouseVisited') || '[]');
    return moodPages.every(mood => visited.includes(mood));
}

// Check if current time is in dawn or dusk window
function getActiveTimeUnlock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;
    
    // Dawn: 5:00 AM (300) to 6:30 AM (390)
    if (totalMinutes >= 300 && totalMinutes < 390) {
        return 'dawn';
    }
    // Dusk: 5:30 PM (1050) to 7:00 PM (1140)
    if (totalMinutes >= 1050 && totalMinutes < 1140) {
        return 'dusk';
    }
    return null;
}

// Reveal unlock-only items based on time and exploration
const unlockItems = document.querySelectorAll('.unlock-only');
const explored = hasUnlockedExploration();
const activeUnlock = getActiveTimeUnlock();

unlockItems.forEach(function(item) {
    const link = item.querySelector('a');
    if (!link) return;
    
    const targetMood = link.getAttribute('href').replace('.html', '');
    
    // Reveal if explored OR currently in the time window for this mood
    if (explored || targetMood === activeUnlock) {
        item.classList.add('revealed');
    }
});