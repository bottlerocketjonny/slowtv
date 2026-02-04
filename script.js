// ================================
// ~*~ SLOW TV RETRO SCRIPTS ~*~
// Best viewed in Netscape Navigator 4.0!
// ================================

// ================================
// Smooth Scrolling for Navigation
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            // Back to top
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// Visitor Counter (localStorage)
// ================================

const counterDisplay = document.getElementById('visitor-counter');
if (counterDisplay) {
    // Get current count from localStorage or start at a fun number
    let count = parseInt(localStorage.getItem('slowtv-visitor-count')) || 4782;

    // Check if this is a new session
    const lastVisit = sessionStorage.getItem('slowtv-visited');
    if (!lastVisit) {
        // New visit - increment counter
        count++;
        localStorage.setItem('slowtv-visitor-count', count);
        sessionStorage.setItem('slowtv-visited', 'true');
    }

    // Animate the counter display
    let displayCount = count - 5;
    const animateCounter = () => {
        if (displayCount < count) {
            displayCount++;
            counterDisplay.textContent = String(displayCount).padStart(7, '0');
            setTimeout(animateCounter, 150);
        }
    };

    // Start counting after a short delay
    setTimeout(animateCounter, 500);
}

// ================================
// Newsletter Form Handler
// ================================

const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retro-style alert!
        alert(
            '~*~ THANK YOU! ~*~\n\n' +
            'Mailing list is under construction!\n\n' +
            'Check back soon, friend!\n\n' +
            '- The Slow TV Webmaster'
        );
    });
}

// ================================
// Guestbook (JSONbin.io)
// ================================
// To set up:
// 1. Go to https://jsonbin.io and create free account
// 2. Create a new bin with content: []
// 3. Copy your Bin ID and API Key below

const JSONBIN_BIN_ID = '69836085ae596e708f10eb6c';
const JSONBIN_API_KEY = '$2a$10$98rP8ejw3CpahlGRHa.61uAjwJAj4Z.QJn46OTIKJNvMj/mkg/tfu';

const guestbookForm = document.getElementById('guestbook-form');
const guestbookEntries = document.getElementById('guestbook-entries');

// Format date nicely
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).toLowerCase();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render guestbook entries
function renderEntries(entries) {
    if (!guestbookEntries) return;

    if (!entries || entries.length === 0) {
        guestbookEntries.innerHTML = '<p class="no-entries">no entries yet - be the first to sign!</p>';
        return;
    }

    // Show newest first
    const sorted = [...entries].reverse();

    guestbookEntries.innerHTML = sorted.map(entry => `
        <div class="guestbook-entry">
            <div class="guestbook-entry-header">
                <span class="guestbook-entry-name">${escapeHtml(entry.name)}</span>
                <span class="guestbook-entry-date">${formatDate(entry.date)}</span>
            </div>
            <div class="guestbook-entry-message">${escapeHtml(entry.message)}</div>
        </div>
    `).join('');
}

// Load guestbook entries
async function loadGuestbook() {
    if (!guestbookEntries) return;

    // Check if JSONbin is configured
    if (!JSONBIN_BIN_ID || !JSONBIN_API_KEY) {
        guestbookEntries.innerHTML = '<p class="no-entries">guestbook not configured yet!</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: { 'X-Access-Key': JSONBIN_API_KEY }
        });
        if (response.ok) {
            const data = await response.json();
            renderEntries(data.record || []);
        } else {
            guestbookEntries.innerHTML = '<p class="no-entries">could not load guestbook</p>';
        }
    } catch (e) {
        guestbookEntries.innerHTML = '<p class="no-entries">could not load guestbook</p>';
    }
}

// Submit guestbook entry
if (guestbookForm) {
    guestbookForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!JSONBIN_BIN_ID || !JSONBIN_API_KEY) {
            alert('guestbook not configured yet!');
            return;
        }

        const nameInput = document.getElementById('gb-name');
        const messageInput = document.getElementById('gb-message');
        const name = nameInput.value.trim().slice(0, 50);
        const message = messageInput.value.trim().slice(0, 500);

        if (!name || !message) return;

        try {
            // First, get current entries
            const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
                headers: { 'X-Access-Key': JSONBIN_API_KEY }
            });

            let entries = [];
            if (getResponse.ok) {
                const data = await getResponse.json();
                entries = data.record || [];
            }

            // Add new entry
            entries.push({
                name,
                message,
                date: new Date().toISOString()
            });

            // Save back to JSONbin
            const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Key': JSONBIN_API_KEY
                },
                body: JSON.stringify(entries)
            });

            if (putResponse.ok) {
                nameInput.value = '';
                messageInput.value = '';
                alert('~*~ THANKS FOR SIGNING! ~*~');
                loadGuestbook();
            } else {
                alert('oops! something went wrong. try again!');
            }
        } catch (e) {
            alert('could not save to guestbook. try again!');
        }
    });
}

// Load guestbook on page load
loadGuestbook();

// ================================
// Random Greeting on Page Load
// ================================

const greetings = [
    'Welcome to the SLOW TV homepage!',
    'Hey there, cool surfer!',
    'Thanks for dropping by!',
    'Whoa, you found us!',
    'Rock on, friend!'
];

window.addEventListener('DOMContentLoaded', () => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    console.log('%c' + randomGreeting, 'font-size: 20px; color: #FF00FF; font-family: Comic Sans MS;');
    console.log('%cSLOW TV', 'font-size: 48px; font-weight: bold; color: #00FF00; text-shadow: 2px 2px #FF0000;');
});

// ================================
// Sparkle Cursor Trail (90s style!)
// ================================

const sparkles = [];
const maxSparkles = 100;

const sparkleColors = [
    '#FFFF00', '#FF00FF', '#00FFFF', '#FF6600', '#00FF00', '#FF0066'
];

function createSparkle(x, y) {
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    const size = 4 + Math.random() * 8;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color} 0%, transparent 70%);
        border-radius: 50%;
        z-index: 9999;
        left: ${x + offsetX}px;
        top: ${y + offsetY}px;
        animation: sparkle-fade 1.2s ease-out forwards;
    `;
    document.body.appendChild(sparkle);

    sparkles.push(sparkle);

    // Remove old sparkles
    if (sparkles.length > maxSparkles) {
        const oldSparkle = sparkles.shift();
        if (oldSparkle.parentNode) {
            oldSparkle.parentNode.removeChild(oldSparkle);
        }
    }

    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
        const index = sparkles.indexOf(sparkle);
        if (index > -1) {
            sparkles.splice(index, 1);
        }
    }, 1200);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-fade {
        0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Track mouse movement (throttled for performance)
let lastSparkleTime = 0;
const sparkleThrottle = 30; // ms between sparkles

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > sparkleThrottle) {
        // Create multiple sparkles for extra magic!
        for (let i = 0; i < 3; i++) {
            createSparkle(e.clientX, e.clientY);
        }
        lastSparkleTime = now;
    }
});

// ================================
// Keep title simple
// ================================

document.title = '~ slow tv ~';

// ================================
// Easter Egg: Konami Code
// ================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Konami code activated!
            alert(
                '~*~ SECRET UNLOCKED! ~*~\n\n' +
                'You are a TRUE 90s Internet Explorer!\n\n' +
                'Rock on! 🤘🎸\n\n' +
                '- SLOW TV'
            );
            konamiIndex = 0;

            // Extra fun: make everything spin!
            document.body.style.animation = 'spin 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    } else {
        konamiIndex = 0;
    }
});

// Add spin animation for easter egg
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
    }
`;
document.head.appendChild(spinStyle);

// ================================
// That's all folks!
// ================================

console.log('%cWebsite loaded successfully!', 'color: #00FF00;');
console.log('%cTip: Try the Konami Code for a surprise!', 'color: #FFFF00;');
