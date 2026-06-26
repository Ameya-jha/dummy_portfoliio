// List of skills to rotate through in the header
const roles = ["Vibecoder.", "Bot Developer.", "Server Developer.", "Community Moderator."];
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const dynamicTextElement = document.getElementById("dynamic-text");

function typeEffect() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        // Remove characters
        dynamicTextElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        // Add characters
        dynamicTextElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    // Set typing speed variables
    let typingSpeed = isDeleting ? 50 : 100;

    // If word is completely typed
    if (!isDeleting && currentCharIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at the end of the word
        isDeleting = true;
    } 
    // If word is completely erased
    else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length; // Move to next role
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start the typing animation once the page loads
document.addEventListener("DOMContentLoaded", typeEffect);
