// State management
let currentScreen = 0;
let selectedChoice = '';
let selectedStyle = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    addCardAnimations();
    addListAnimations();
});

// Show choices screen
function showChoices() {
    transitionScreen('start-screen', 'choice-screen');
    currentScreen = 1;
    updateProgress();
    updateNavDots();
}

// Select primary choice
function selectChoice(choice) {
    selectedChoice = choice;

    // Add visual feedback
    const cards = document.querySelectorAll('.choice-card');
    const selectedCard = document.querySelector(`[data-choice="${choice}"]`);

    // Animate selected card
    selectedCard.style.transform = 'scale(1.1)';

    // Fade out other cards
    cards.forEach(card => {
        if (card !== selectedCard) {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.9)';
        }
    });

    // Apply color theme
    document.body.className = `color-${choice}`;

    // Transition after animation
    setTimeout(() => {
        transitionScreen('choice-screen', 'secondary-screen');
        currentScreen = 2;
        updateProgress();
        updateNavDots();

        // Reset cards
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
    }, 600);
}

// Select style
function selectStyle(style) {
    selectedStyle = style;

    // Add visual feedback
    const listChoices = document.querySelectorAll('.list-choice');
    const selectedItem = event.currentTarget;

    // Animate selected item
    selectedItem.style.background = '#000';
    selectedItem.style.color = '#fff';
    selectedItem.querySelector('.arrow').style.color = '#fff';
    selectedItem.querySelector('.choice-content p').style.color = '#ccc';

    // Apply style theme
    document.body.classList.add(`style-${style}`);

    // Transition after animation
    setTimeout(() => {
        transitionScreen('secondary-screen', 'final-screen');
        currentScreen = 3;
        updateProgress();
        updateNavDots();
        showResult();

        // Reset list
        listChoices.forEach(item => {
            item.style.background = '';
            item.style.color = '';
        });
    }, 600);
}

// Show result
function showResult() {
    const resultContent = document.getElementById('result-content');
    const choiceDisplay = document.getElementById('choice-display');
    const styleDisplay = document.getElementById('style-display');

    // Define result messages
    const results = {
        nature: {
            minimal: "You've chosen a path of serene simplicity, finding peace in the natural world's quiet beauty.",
            vibrant: "Your journey embraces the wild energy of nature, celebrating life's colorful abundance.",
            calm: "You walk softly through peaceful meadows, breathing in harmony with the earth.",
            bold: "You stand strong like ancient trees, rooted in nature's timeless wisdom."
        },
        tech: {
            minimal: "Your future is clean, efficient, and purposefully designed with elegant solutions.",
            vibrant: "Innovation pulses through your veins, bright with possibilities and electric with potential.",
            calm: "You find tranquility in systematic thinking, where logic brings peace.",
            bold: "You forge ahead fearlessly, disrupting conventions with powerful new ideas."
        },
        art: {
            minimal: "Your canvas speaks in whispers, where every stroke carries profound meaning.",
            vibrant: "Your creativity explodes in brilliant colors, dancing across infinite possibilities.",
            calm: "You create from a place of inner peace, where art becomes meditation.",
            bold: "Your artistic vision demands attention, unapologetic and transformative."
        },
        zen: {
            minimal: "You've discovered that emptiness is fullness, and silence speaks volumes.",
            vibrant: "Your mindfulness radiates outward, touching everything with conscious presence.",
            calm: "You rest in perfect balance, the still point at the center of all things.",
            bold: "Your enlightenment cuts through illusion with the clarity of a master's sword."
        }
    };

    const message = results[selectedChoice]?.[selectedStyle] || "Your unique path unfolds before you.";

    // Animate result text
    resultContent.textContent = message;
    choiceDisplay.textContent = selectedChoice;
    styleDisplay.textContent = selectedStyle;

    // Type-writer effect
    typeWriter(resultContent, message, 0);
}

// Type-writer effect
function typeWriter(element, text, index) {
    if (index === 0) {
        element.textContent = '';
    }

    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1), 30);
    }
}

// Screen transition
function transitionScreen(fromId, toId) {
    const fromScreen = document.getElementById(fromId);
    const toScreen = document.getElementById(toId);

    fromScreen.classList.remove('active');

    setTimeout(() => {
        toScreen.classList.add('active');
    }, 300);
}

// Update progress bar
function updateProgress() {
    const progress = document.getElementById('progress');
    const percentage = (currentScreen / 3) * 100;
    progress.style.width = `${percentage}%`;
}

// Update navigation dots
function updateNavDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentScreen) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Reset to start
function reset() {
    selectedChoice = '';
    selectedStyle = '';
    currentScreen = 0;

    // Remove theme classes
    document.body.className = '';

    // Reset all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show start screen
    setTimeout(() => {
        document.getElementById('start-screen').classList.add('active');
        updateProgress();
        updateNavDots();
    }, 300);
}

// Add staggered animations to cards
function addCardAnimations() {
    const cards = document.querySelectorAll('.choice-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.6s ease ${index * 0.1}s forwards`;
        card.style.opacity = '0';
    });
}

// Add staggered animations to list items
function addListAnimations() {
    const listItems = document.querySelectorAll('.list-choice');
    listItems.forEach((item, index) => {
        item.style.animation = `slideIn 0.5s ease ${index * 0.1}s forwards`;
        item.style.opacity = '0';
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentScreen > 0) {
        reset();
    }

    // Number keys for list choices
    if (currentScreen === 2 && e.key >= '1' && e.key <= '4') {
        const styles = ['minimal', 'vibrant', 'calm', 'bold'];
        const index = parseInt(e.key) - 1;
        if (styles[index]) {
            const listChoice = document.querySelectorAll('.list-choice')[index];
            listChoice.click();
        }
    }
});

// Mouse trail effect (subtle)
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    // Only on choice screens
    if (currentScreen === 1 || currentScreen === 2) {
        createTrailDot(e.clientX, e.clientY);
    }
});

function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    dot.style.width = '4px';
    dot.style.height = '4px';
    dot.style.borderRadius = '50%';
    dot.style.background = 'rgba(0, 0, 0, 0.1)';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '9999';
    dot.style.transition = 'all 0.5s ease';

    document.body.appendChild(dot);

    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
    }, 10);

    setTimeout(() => {
        dot.remove();
    }, 500);
}

// Add hover sound effect (visual feedback)
document.querySelectorAll('.choice-card, .list-choice, .btn').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.fade-in, .fade-in-delay');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add click ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Performance optimization: throttle mouse trail
let lastTrailTime = 0;
const trailThrottle = 50; // ms

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > trailThrottle) {
        lastTrailTime = now;
        if (currentScreen === 1 || currentScreen === 2) {
            createTrailDot(e.clientX, e.clientY);
        }
    }
});

console.log('✨ Minimalist Interactive Experience Loaded');
console.log('💡 Press ESC to reset at any time');
console.log('⌨️  Use number keys (1-4) on the second choice screen');
