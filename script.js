// Intersection Observer for Timeline Items
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Create floating hearts
    createFloatingHearts();

    // Smooth scroll for the entire page
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

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 600);
        }
    });

    // Add mouse trail effect
    createMouseTrail();

    // Confetti effect on special message
    const specialMessage = document.querySelector('.special-message');
    const messageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createConfetti();
                messageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (specialMessage) {
        messageObserver.observe(specialMessage);
    }
});

// Create floating hearts
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartSymbols = ['❤️', '💖', '💝', '💗', '💓', '💕'];
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 8000);
        }
    }, 2000);
}

// Mouse trail effect
function createMouseTrail() {
    let lastX = 0;
    let lastY = 0;
    let particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.color = `rgba(255, ${Math.floor(Math.random() * 100 + 107)}, ${Math.floor(Math.random() * 100 + 157)}, ${this.life})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.color = `rgba(255, ${Math.floor(Math.random() * 100 + 107)}, ${Math.floor(Math.random() * 100 + 157)}, ${this.life})`;
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;

        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(lastX, lastY));
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);

            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Confetti effect
function createConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Create confetti particles
        for (let i = 0; i < particleCount; i++) {
            createConfettiParticle(
                randomInRange(0.1, 0.9),
                randomInRange(0.1, 0.3)
            );
        }
    }, 250);
}

function createConfettiParticle(x, y) {
    const colors = ['#ff6b9d', '#c44569', '#ffa502', '#ff6348', '#a29bfe'];
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = (x * window.innerWidth) + 'px';
    particle.style.top = (y * window.innerHeight) + 'px';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10000';
    
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 10 + 5;
    const rotation = Math.random() * 360;
    
    let posX = parseFloat(particle.style.left);
    let posY = parseFloat(particle.style.top);
    let velocityX = Math.cos(angle) * velocity;
    let velocityY = Math.sin(angle) * velocity;
    let currentRotation = 0;

    function update() {
        velocityY += 0.5; // gravity
        posX += velocityX;
        posY += velocityY;
        currentRotation += rotation / 10;

        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.transform = `rotate(${currentRotation}deg)`;

        if (posY < window.innerHeight + 50) {
            requestAnimationFrame(update);
        } else {
            particle.remove();
        }
    }

    update();
}

// Add click effect to timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        content.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 300, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -300, behavior: 'smooth' });
    }
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const message = document.createElement('div');
    message.textContent = '🎉 Secret unlocked! You found the easter egg! 🎉';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(255, 107, 157, 0.95)';
    message.style.padding = '30px 50px';
    message.style.borderRadius = '20px';
    message.style.fontSize = '1.5rem';
    message.style.fontWeight = 'bold';
    message.style.zIndex = '99999';
    message.style.animation = 'fadeInUp 0.5s ease';
    message.style.boxShadow = '0 10px 50px rgba(255, 107, 157, 0.5)';
    
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 3000);

    // Trigger extra confetti
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createConfetti(), i * 200);
    }
}

console.log('%c🎂 Happy Birthday Ridhi! 🎉', 'font-size: 24px; color: #ff6b9d; font-weight: bold;');
console.log('%cMade with ❤️ by Gautam', 'font-size: 14px; color: #ffa502;');
console.log('%cTip: Try the Konami code! ↑↑↓↓←→←→BA', 'font-size: 12px; color: #c44569;');
