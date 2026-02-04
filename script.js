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
// Visitor Counter Animation
// ================================

const counterDisplay = document.getElementById('visitor-counter');
if (counterDisplay) {
    // Simulate a visitor counter incrementing on load
    let count = 4780;
    const targetCount = 4782;

    const incrementCounter = () => {
        if (count < targetCount) {
            count++;
            counterDisplay.textContent = String(count).padStart(7, '0');
            setTimeout(incrementCounter, 500);
        }
    };

    // Start counting after a short delay
    setTimeout(incrementCounter, 1000);
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
    console.log('%cYou found the secret console message! You\'re a true 90s hacker!', 'font-size: 14px; color: #00FFFF;');
});

// ================================
// Sparkle Cursor Trail (90s style!)
// ================================

const sparkles = [];
const maxSparkles = 15;

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #FFFF00 0%, #FF00FF 50%, transparent 70%);
        border-radius: 50%;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: sparkle-fade 0.8s ease-out forwards;
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
    }, 800);
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
const sparkleThrottle = 50; // ms between sparkles

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > sparkleThrottle) {
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = now;
    }
});

// ================================
// Fun Status Bar Messages (90s style)
// ================================

const statusMessages = [
    'Thanks for visiting SLOW TV!',
    'Check out our Demo EP!',
    'Sheffield rocks!',
    'Sign our guestbook!',
    'You are visitor #4782!',
    'Follow us on Instagram!',
    'Best viewed at 800x600!'
];

let messageIndex = 0;

// Rotate through status messages
function updateTitle() {
    document.title = '~*~ SLOW TV ~*~ ' + statusMessages[messageIndex];
    messageIndex = (messageIndex + 1) % statusMessages.length;
}

// Change title every 3 seconds for that authentic 90s feel
setInterval(updateTitle, 3000);

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
