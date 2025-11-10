// Step management
let currentStep = 1;
const totalSteps = 4;

// Surprise messages for Salma
const surpriseMessages = [
    {
        title: "You're Amazing! 🌟",
        message: "I know you've been stressed, but look at how far you've come! You're doing incredible things and I'm so proud of you. Tomorrow's exam is just another opportunity to shine! ✨"
    },
    {
        title: "Remember This! 💪",
        message: "Exams don't define you - your hard work, determination, and amazing personality do! No matter what happens tomorrow, you're already a winner in my eyes! 🏆"
    },
    {
        title: "You've Got This! 🚀",
        message: "Every moment you've spent studying, every note you've taken, every question you've asked - it all matters. You've prepared, and you're ready. Trust yourself! 🌈"
    },
    {
        title: "You're a Star! ⭐",
        message: "Even on your worst days, you shine brighter than most people do on their best days. Tomorrow you'll show everyone what you're made of! Keep being awesome! 💖"
    },
    {
        title: "Just For You! 💝",
        message: "I made this page because you deserve to smile, even when things are tough. You're going to crush that exam tomorrow, and then we'll celebrate! 🎉"
    }
];

// DOM Elements
const step1Btn = document.getElementById('step1Btn');
const step2Btn = document.getElementById('step2Btn');
const step3Btn = document.getElementById('step3Btn');
const runningBtn = document.getElementById('runningBtn');
const surpriseModal = document.getElementById('surpriseModal');
const closeModal = document.getElementById('closeModal');
const surpriseTitle = document.getElementById('surpriseTitle');
const surpriseMessage = document.getElementById('surpriseMessage');
const floatingMessages = document.getElementById('floatingMessages');
const catchCount = document.getElementById('catchCount');

// Running button state
let catchCounter = 0;
let runningBtnPosition = { x: 50, y: 50 };
let isRunning = false;
let lastMousePosition = { x: 0, y: 0 };

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeStepIndicator();
    setupEventListeners();
    if (runningBtn) {
        initializeRunningButton();
    }
});

// Initialize step indicator
function initializeStepIndicator() {
    updateStepIndicator();
}

// Update step indicator
function updateStepIndicator() {
    const stepItems = document.querySelectorAll('.step-item');
    
    stepItems.forEach((item, index) => {
        const stepNum = index + 1;
        item.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            item.classList.add('completed');
        } else if (stepNum === currentStep) {
            item.classList.add('active');
        }
    });
}

// Go to next step
function goToNextStep() {
    if (currentStep < totalSteps) {
        const currentStepContent = document.querySelector(`.step-content[data-step="${currentStep}"]`);
        
        // Fade out current step
        currentStepContent.classList.add('exiting');
        
        setTimeout(() => {
            currentStepContent.classList.remove('active', 'exiting');
            currentStep++;
            
            // Fade in next step
            const nextStepContent = document.querySelector(`.step-content[data-step="${currentStep}"]`);
            nextStepContent.classList.add('active');
            
            updateStepIndicator();
            
            // Initialize running button if it's step 4
            if (currentStep === 4 && runningBtn) {
                setTimeout(() => {
                    initializeRunningButton();
                }, 100);
            }
        }, 400);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Step 1 button
    if (step1Btn) {
        step1Btn.addEventListener('click', () => {
            showFloatingMessage("Let's go! 🚀");
            setTimeout(() => {
                goToNextStep();
            }, 300);
        });
    }
    
    // Step 2 button
    if (step2Btn) {
        step2Btn.addEventListener('click', () => {
            showFloatingMessage("You're doing great! 💪");
            setTimeout(() => {
                goToNextStep();
            }, 300);
        });
    }
    
    // Step 3 button (surprise)
    if (step3Btn) {
        step3Btn.addEventListener('click', () => {
            showSurprise();
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeSurpriseModal();
        });
    }
    
    // Close modal on outside click
    if (surpriseModal) {
        surpriseModal.addEventListener('click', (e) => {
            if (e.target === surpriseModal) {
                closeSurpriseModal();
            }
        });
    }
    
    // Running button functionality (Step 4)
    if (runningBtn) {
        setupRunningButton();
    }
}

// Setup running button
function setupRunningButton() {
    // Track mouse position globally
    document.addEventListener('mousemove', (e) => {
        lastMousePosition.x = e.clientX;
        lastMousePosition.y = e.clientY;
        
        // If button is in "running" mode, check if mouse is close and move button away
        if (isRunning && currentStep === 4) {
            const btnRect = runningBtn.getBoundingClientRect();
            const btnX = btnRect.left + btnRect.width / 2;
            const btnY = btnRect.top + btnRect.height / 2;
            const distance = Math.sqrt(
                Math.pow(e.clientX - btnX, 2) + Math.pow(e.clientY - btnY, 2)
            );
            
            if (distance < 200) {
                moveButtonAway(e);
            }
        }
    });
    
    // Make button run away from cursor when mouse enters
    runningBtn.addEventListener('mouseenter', () => {
        if (!isRunning && currentStep === 4) {
            isRunning = true;
            const fakeEvent = {
                clientX: lastMousePosition.x || window.innerWidth / 2,
                clientY: lastMousePosition.y || window.innerHeight / 2
            };
            moveButtonAway(fakeEvent);
        }
    });
    
    // Catch the button
    runningBtn.addEventListener('click', () => {
        catchCounter++;
        if (catchCount) {
            catchCount.textContent = catchCounter;
        }
        
        showFloatingMessage("Gotcha! 🎉");
        
        // Move button to new position
        setTimeout(() => {
            runningBtnPosition.x = 10 + Math.random() * 80; // 10% to 90%
            runningBtnPosition.y = Math.random() * 150; // 0 to 150px
            updateRunningButtonPosition();
            isRunning = false;
        }, 100);
    });
}

// Initialize running button position
function initializeRunningButton() {
    if (!runningBtn) return;
    
    const buttonWrapper = runningBtn.parentElement;
    if (!buttonWrapper) return;
    
    // Reset to center position
    runningBtnPosition.x = 50; // percentage
    runningBtnPosition.y = 0;
    updateRunningButtonPosition();
}

function updateRunningButtonPosition() {
    if (!runningBtn) return;
    runningBtn.style.left = runningBtnPosition.x + '%';
    runningBtn.style.top = runningBtnPosition.y + 'px';
    runningBtn.style.transform = `translateX(-50%) translateY(0)`;
    runningBtn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}

function moveButtonAway(e) {
    if (!runningBtn) return;
    
    const btnRect = runningBtn.getBoundingClientRect();
    const btnX = btnRect.left + btnRect.width / 2;
    const btnY = btnRect.top + btnRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const dx = btnX - mouseX;
    const dy = btnY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const moveDistance = 15; // percentage for X, pixels for Y
        
        // Calculate new position
        const buttonWrapper = runningBtn.parentElement;
        const wrapperWidth = buttonWrapper.offsetWidth;
        const pixelsToPercent = (moveDistance * 100) / wrapperWidth;
        
        runningBtnPosition.x += Math.cos(angle) * pixelsToPercent;
        runningBtnPosition.y += Math.sin(angle) * moveDistance;
        
        // Keep button within bounds (10% to 90% horizontally, 0 to 200px vertically)
        runningBtnPosition.x = Math.max(10, Math.min(90, runningBtnPosition.x));
        runningBtnPosition.y = Math.max(0, Math.min(200, runningBtnPosition.y));
        
        updateRunningButtonPosition();
    }
}

// Show surprise modal
function showSurprise() {
    const randomSurprise = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    
    if (surpriseTitle && surpriseMessage) {
        surpriseTitle.textContent = randomSurprise.title;
        surpriseMessage.textContent = randomSurprise.message;
    }
    
    if (surpriseModal) {
        surpriseModal.classList.add('active');
    }
    
    showFloatingMessage("Surprise! 🎁");
}

// Close surprise modal
function closeSurpriseModal() {
    if (surpriseModal) {
        surpriseModal.classList.remove('active');
        // Move to next step after closing
        setTimeout(() => {
            goToNextStep();
        }, 300);
    }
}

// Show floating message
function showFloatingMessage(text) {
    const message = document.createElement('div');
    message.className = 'floating-message';
    message.textContent = text;
    
    const x = Math.random() * (window.innerWidth - 200) + 100;
    message.style.left = x + 'px';
    message.style.top = window.innerHeight / 2 + 'px';
    
    floatingMessages.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add sparkle effect on button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('step-button') || e.target.closest('.step-button')) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.textContent = ['✨', '⭐', '💫', '🌟', '💖'][Math.floor(Math.random() * 5)];
        
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 50 + Math.random() * 50;
        const duration = 1000 + Math.random() * 500;
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            {
                transform: `translate(0, 0) scale(1) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}
