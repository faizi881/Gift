// Global variables
let currentSlide = 1;
let totalSlides = 5;
let isMusicPlaying = false;
let bgMusic;
let heartsCount = 9999;
let loveLevel = 100;
let isHeartRainActive = false;

// Countdown timer variables
let startDate = new Date('2020-08-12T00:00:00'); // August 12, 2020 - when love began
let countdownInterval;

// DOM elements
const loadingScreen = document.getElementById('loading-screen');
const startPage = document.getElementById('start-page');
const anniversaryPage = document.getElementById('anniversary-page');
const loveStoryPage = document.getElementById('love-story-page');
const memoriesPage = document.getElementById('memories-page');
const coverLetterPage = document.getElementById('cover-letter-page');
const musicToggle = document.getElementById('musicToggle');
const heartsCountElement = document.getElementById('heartsCount');
const loveMeterElement = document.getElementById('loveMeter');
const loveLevelElement = document.getElementById('loveLevel');
const heartRain = document.getElementById('heartRain');
const clickableHearts = document.querySelector('.clickable-hearts');

// Countdown timer elements
const yearsCountElement = document.getElementById('yearsCount');
const monthsCountElement = document.getElementById('monthsCount');
const daysCountElement = document.getElementById('daysCount');
const hoursCountElement = document.getElementById('hoursCount');
const minutesCountElement = document.getElementById('minutesCount');
const secondsCountElement = document.getElementById('secondsCount');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);

    // Initialize background music
    bgMusic = document.getElementById('bgMusic');
    
    // Add click event for music toggle
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    // Initialize countdown timer and hearts system
    initializeCountdownTimer();
    initializeHeartsSystem();
    
    // Add some interactive effects
    addInteractiveEffects();
    
    // Start heart rain effect
    startHeartRain();
});

// Initialize countdown timer
function initializeCountdownTimer() {
    updateCountdown();
    startCountdown();
}

// Initialize hearts system
function initializeHeartsSystem() {
    updateHeartsDisplay();
    updateLoveMeter();
    
    // Add click event for interactive hearts area
    if (clickableHearts) {
        clickableHearts.addEventListener('click', handleHeartClick);
    }
    
    // Add click events for hearts panel
    const heartsCounter = document.querySelector('.hearts-counter');
    const loveMeter = document.querySelector('.love-meter');
    
    if (heartsCounter) {
        heartsCounter.addEventListener('click', increaseHearts);
    }
    
    if (loveMeter) {
        loveMeter.addEventListener('click', boostLoveLevel);
    }
}

// Start countdown timer
function startCountdown() {
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update countdown timer
function updateCountdown() {
    const now = new Date();
    const timeDifference = now - startDate;
    
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Update display elements
    if (yearsCountElement) yearsCountElement.textContent = years;
    if (monthsCountElement) monthsCountElement.textContent = months;
    if (daysCountElement) daysCountElement.textContent = days;
    if (hoursCountElement) hoursCountElement.textContent = hours;
    if (minutesCountElement) minutesCountElement.textContent = minutes;
    if (secondsCountElement) secondsCountElement.textContent = seconds;
    
    // Add special effects for milestone numbers
    addCountdownEffects(years, months, days, hours, minutes, seconds);
}

// Handle heart click in interactive area
function handleHeartClick(event) {
    const rect = clickableHearts.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create floating heart at click position
    createFloatingHeart(x, y);
    
    // Increase hearts count
    heartsCount += Math.floor(Math.random() * 10) + 1;
    updateHeartsDisplay();
    
    // Show heart burst effect
    createHeartBurst(x, y);
    
    // Trigger heart rain if enough hearts
    if (heartsCount % 100 === 0) {
        triggerHeartRain();
    }
}

// Create floating heart at specific position
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'absolute';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '2rem';
    heart.style.color = '#ff6b6b';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatingHeart 3s ease-out forwards';
    
    clickableHearts.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Create heart burst effect
function createHeartBurst(x, y) {
    for (let i = 0; i < 8; i++) {
        const burstHeart = document.createElement('div');
        burstHeart.innerHTML = '💕';
        burstHeart.style.position = 'absolute';
        burstHeart.style.left = x + 'px';
        burstHeart.style.top = y + 'px';
        burstHeart.style.fontSize = '1.5rem';
        burstHeart.style.color = '#ff6b6b';
        burstHeart.style.pointerEvents = 'none';
        burstHeart.style.zIndex = '1001';
        burstHeart.style.animation = `heartBurst 1.5s ease-out forwards`;
        burstHeart.style.transform = `rotate(${i * 45}deg) translateY(-50px)`;
        
        clickableHearts.appendChild(burstHeart);
        
        setTimeout(() => {
            if (burstHeart.parentNode) {
                burstHeart.parentNode.removeChild(burstHeart);
            }
        }, 1500);
    }
}

// Add special effects for countdown milestones
function addCountdownEffects(years, months, days, hours, minutes, seconds) {
    // Special effect when seconds change
    if (seconds % 10 === 0) {
        addNumberGlowEffect();
    }
    
    // Special effect when minutes change
    if (minutes % 5 === 0 && seconds === 0) {
        addMinuteGlowEffect();
    }
    
    // Special effect when hours change
    if (hours % 2 === 0 && minutes === 0 && seconds === 0) {
        addHourGlowEffect();
    }
    
    // Special effect when days change
    if (days % 7 === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        addWeekGlowEffect();
    }
    
    // Special effect when months change
    if (months % 3 === 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        addQuarterGlowEffect();
    }
    
    // Special effect when years change
    if (years > 0 && months === 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        addYearGlowEffect();
    }
}

// Add glow effect to countdown numbers
function addNumberGlowEffect() {
    const numbers = document.querySelectorAll('.countdown-number');
    numbers.forEach(number => {
        number.style.animation = 'none';
        number.offsetHeight; // Trigger reflow
        number.style.animation = 'numberGlow 0.5s ease-in-out';
    });
}

// Add special minute glow effect
function addMinuteGlowEffect() {
    const minutesElement = document.getElementById('minutesCount');
    if (minutesElement) {
        minutesElement.style.animation = 'none';
        minutesElement.offsetHeight;
        minutesElement.style.animation = 'numberGlow 1s ease-in-out';
        createMinuteSparkles();
    }
}

// Add special hour glow effect
function addHourGlowEffect() {
    const hoursElement = document.getElementById('hoursCount');
    if (hoursElement) {
        hoursElement.style.animation = 'none';
        hoursElement.offsetHeight;
        hoursElement.style.animation = 'numberGlow 1.5s ease-in-out';
        createHourSparkles();
    }
}

// Add special week glow effect
function addWeekGlowEffect() {
    const daysElement = document.getElementById('daysCount');
    if (daysElement) {
        daysElement.style.animation = 'none';
        daysElement.offsetHeight;
        daysElement.style.animation = 'numberGlow 2s ease-in-out';
        createWeekSparkles();
    }
}

// Add special quarter glow effect
function addQuarterGlowEffect() {
    const monthsElement = document.getElementById('monthsCount');
    if (monthsElement) {
        monthsElement.style.animation = 'none';
        monthsElement.offsetHeight;
        monthsElement.style.animation = 'numberGlow 2.5s ease-in-out';
        createQuarterSparkles();
    }
}

// Add special year glow effect
function addYearGlowEffect() {
    const yearsElement = document.getElementById('yearsCount');
    if (yearsElement) {
        yearsElement.style.animation = 'none';
        yearsElement.offsetHeight;
        yearsElement.style.animation = 'numberGlow 3s ease-in-out';
        createYearSparkles();
    }
}

// Increase hearts
function increaseHearts() {
    heartsCount += Math.floor(Math.random() * 100) + 50;
    updateHeartsDisplay();
    createHeartRain();
}

// Boost love level
function boostLoveLevel() {
    loveLevel = Math.min(100, loveLevel + Math.floor(Math.random() * 20) + 10);
    updateLoveMeter();
    createLoveSparkles();
}

// Create minute sparkles
function createMinuteSparkles() {
    createSparkles('✨', 5, '#ffd93d');
}

// Create hour sparkles
function createHourSparkles() {
    createSparkles('💫', 8, '#6bcf7f');
}

// Create week sparkles
function createWeekSparkles() {
    createSparkles('⭐', 10, '#667eea');
}

// Create quarter sparkles
function createQuarterSparkles() {
    createSparkles('🌟', 12, '#ff6b6b');
}

// Create year sparkles
function createYearSparkles() {
    createSparkles('💎', 15, '#a8e6cf');
    createConfetti();
    triggerHeartRain();
}

// Create sparkles with specific emoji, count, and color
function createSparkles(emoji, count, color) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = emoji;
            sparkle.style.position = 'fixed';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.zIndex = '1002';
            sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.color = color;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Update hearts display
function updateHeartsDisplay() {
    if (heartsCountElement) {
        heartsCountElement.textContent = heartsCount.toLocaleString();
    }
}

// Update love meter
function updateLoveMeter() {
    if (loveMeterElement) {
        loveMeterElement.style.width = loveLevel + '%';
    }
    
    if (loveLevelElement) {
        if (loveLevel >= 90) {
            loveLevelElement.textContent = 'Infinite';
            loveLevelElement.style.color = '#ff6b6b';
        } else if (loveLevel >= 70) {
            loveLevelElement.textContent = 'Very High';
            loveLevelElement.style.color = '#ffd93d';
        } else if (loveLevel >= 50) {
            loveLevelElement.textContent = 'High';
            loveLevelElement.style.color = '#6bcf7f';
        } else {
            loveLevelElement.textContent = 'Growing';
            loveLevelElement.style.color = '#667eea';
        }
    }
}

// Enhanced sparkle effects for countdown milestones
function createEnhancedSparkles() {
    const sparkles = ['✨', '💫', '⭐', '🌟', '💎', '💖', '💕', '💗'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.zIndex = '1002';
            sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }, i * 150);
    }
}

// Start heart rain effect
function startHeartRain() {
    setInterval(() => {
        if (Math.random() < 0.2 && !isHeartRainActive) { // 20% chance
            triggerHeartRain();
        }
    }, 15000); // Every 15 seconds
}

// Trigger heart rain
function triggerHeartRain() {
    if (isHeartRainActive) return;
    
    isHeartRainActive = true;
    createHeartRain();
    
    setTimeout(() => {
        isHeartRainActive = false;
    }, 5000);
}

// Create heart rain
function createHeartRain() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const rainHeart = document.createElement('div');
            rainHeart.className = 'rain-heart';
            rainHeart.innerHTML = '💕';
            rainHeart.style.left = Math.random() * 100 + '%';
            rainHeart.style.animationDelay = Math.random() * 2 + 's';
            rainHeart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            heartRain.appendChild(rainHeart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (rainHeart.parentNode) {
                    rainHeart.parentNode.removeChild(rainHeart);
                }
            }, 6000);
        }, i * 100);
    }
}

// Create love sparkles
function createLoveSparkles() {
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.zIndex = '1002';
            sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
            sparkle.style.pointerEvents = 'none';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Add interactive effects to elements
function addInteractiveEffects() {
    // Add hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            createRippleEffect(this, event);
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(button, event) {
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
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Navigation functions
function startJourney() {
    hideAllPages();
    showPage(anniversaryPage);
    addPageTransitionEffect(anniversaryPage);
    
    // Create special effects when starting journey
    createEnhancedSparkles();
    triggerHeartRain();
}

function goToLoveStory() {
    hideAllPages();
    showPage(loveStoryPage);
    addPageTransitionEffect(loveStoryPage);
    
    // Increase hearts when viewing love story
    increaseHearts();
}

function goToMemories() {
    hideAllPages();
    showPage(memoriesPage);
    addPageTransitionEffect(memoriesPage);
    
    // Boost love level when viewing memories
    boostLoveLevel();
}

function goToCoverLetter() {
    hideAllPages();
    showPage(coverLetterPage);
    addPageTransitionEffect(coverLetterPage);
    
    // Special effect for love letter
    createLoveSparkles();
    triggerHeartRain();
}

function goToAnniversary() {
    hideAllPages();
    showPage(anniversaryPage);
    addPageTransitionEffect(anniversaryPage);
}

// Page management functions
function hideAllPages() {
    const pages = [startPage, anniversaryPage, loveStoryPage, memoriesPage, coverLetterPage];
    pages.forEach(page => {
        if (page) {
            page.classList.remove('active');
        }
    });
}

function showPage(page) {
    if (page) {
        page.classList.add('active');
    }
}

function addPageTransitionEffect(page) {
    if (page) {
        page.style.animation = 'none';
        page.offsetHeight; // Trigger reflow
        page.style.animation = 'pageTransition 0.5s ease-in-out';
    }
}

// Photo slider functions
function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }
    
    if (currentSlide < 1) {
        currentSlide = totalSlides;
    }
    
    updateSlider();
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    updateSlider();
}

function updateSlider() {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    if (slides[currentSlide - 1]) {
        slides[currentSlide - 1].classList.add('active');
    }
    
    // Update dots
    updateSliderDots();
    
    // Add slide transition effect
    addSlideTransitionEffect();
}

function updateSliderDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide - 1) {
            dot.classList.add('active');
        }
    });
}

function addSlideTransitionEffect() {
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) {
        activeSlide.style.animation = 'none';
        activeSlide.offsetHeight; // Trigger reflow
        activeSlide.style.animation = 'slideTransition 0.5s ease-in-out';
    }
}

// Auto-advance slider
function startAutoSlider() {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Music control functions
function toggleMusic() {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    if (bgMusic) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicToggle.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        }).catch(error => {
            console.log('Music playback failed:', error);
        });
    }
}

function pauseMusic() {
    if (bgMusic) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    }
}

// Add CSS for ripple effect and animations
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideTransition {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes floatingHeart {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes heartBurst {
            0% {
                transform: rotate(var(--rotation)) translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: rotate(var(--rotation)) translateY(-100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes sparkleFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-50px) scale(0);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Add floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    setInterval(() => {
        createHeart();
    }, 2000);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    const floatingHearts = document.querySelector('.floating-hearts');
    if (floatingHearts) {
        floatingHearts.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }
}

// Add parallax effect to background
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-hearts .heart');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(45deg)`;
        });
    });
}

// Add typing effect to titles
function addTypingEffect() {
    const titles = document.querySelectorAll('.main-title, .page-title');
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(title);
    });
}

// Add confetti effect for special moments
function createConfetti() {
    const colors = ['#ff6b6b', '#667eea', '#ffd93d', '#6bcf7f', '#a8e6cf'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Add confetti CSS
function addConfettiCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all effects
function initializeEffects() {
    addRippleCSS();
    addConfettiCSS();
    createFloatingHearts();
    addParallaxEffect();
    addTypingEffect();
    startAutoSlider();
    
    // Add confetti on special interactions
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', createConfetti);
    }
    
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', createConfetti);
    });
}

// Start all effects when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        initializeEffects();
    }, 1000);
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            changeSlide(-1);
            break;
        case 'ArrowRight':
            changeSlide(1);
            break;
        case 'Escape':
            goToAnniversary();
            break;
        case ' ':
            e.preventDefault();
            toggleMusic();
            break;
        case 'h':
        case 'H':
            increaseHearts();
            break;
        case 'l':
        case 'L':
            boostLoveLevel();
            break;
        case 'c':
        case 'C':
            createEnhancedSparkles();
            break;
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Add page visibility API for better music control
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isMusicPlaying) {
        pauseMusic();
    }
});

// Add error handling for audio
if (bgMusic) {
    bgMusic.addEventListener('error', (e) => {
        console.log('Audio error:', e);
        musicToggle.style.display = 'none';
    });
}

// Add loading progress indicator
function updateLoadingProgress(progress) {
    const loadingText = document.querySelector('#loading-screen p');
    if (loadingText) {
        loadingText.textContent = `Loading Our Love Story... ${Math.round(progress)}%`;
    }
}

// Simulate loading progress
let loadingProgress = 0;
const loadingInterval = setInterval(() => {
    loadingProgress += Math.random() * 20;
    if (loadingProgress >= 100) {
        loadingProgress = 100;
        clearInterval(loadingInterval);
    }
    updateLoadingProgress(loadingProgress);
}, 200);

// Add periodic love level increase
setInterval(() => {
    if (loveLevel < 100) {
        loveLevel += Math.random() * 2;
        updateLoveMeter();
    }
}, 30000); // Every 30 seconds

// Add special effects on milestone achievements
function checkMilestones() {
    // Hearts milestones
    if (heartsCount >= 10000 && heartsCount < 10001) {
        triggerHeartRain();
        createLoveSparkles();
        createEnhancedSparkles();
    }
    
    // Love level milestones
    if (loveLevel >= 100 && loveLevel < 101) {
        createLoveSparkles();
        createConfetti();
        createEnhancedSparkles();
    }
    
    // Countdown milestones (checked in updateCountdown function)
    // These are handled automatically by the countdown timer
}

// Check milestones periodically
setInterval(checkMilestones, 1000); 