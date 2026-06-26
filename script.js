const roles = ["Vibecoder.", "Bot Developer.", "Server Developer.", "Community Moderator."];
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeEffect() {
    const dynamicTextElement = document.getElementById("dynamic-text");
    if (!dynamicTextElement) return;

    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        dynamicTextElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        dynamicTextElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentCharIndex === currentRole.length) {
        typingSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 400; 
    }

    setTimeout(typeEffect, typingSpeed);
}

function countUp() {
    const numberElement = document.getElementById("interactive-number");
    if (!numberElement) return;

    let count = 0;
    const target = 1; 
    
    const interval = setInterval(() => {
        count++;
        if (count <= target) {
            numberElement.textContent = count.toString().padStart(2, '0');
        } else {
            clearInterval(interval);
        }
    }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    countUp();
});
