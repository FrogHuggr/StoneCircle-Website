// Stone Circle Marketing Site - Interactions

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const nav = document.querySelector('.nav');
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll-based nav shadow
const nav = document.querySelector('.nav');
if (nav) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and other elements for scroll animations
document.querySelectorAll('.feature-card, .privacy-item, .install-card, .value-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Particle System - Floating Dust Motes
// ============================================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;

            // Wrap around edges
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Pulsing opacity
            const opacity = p.opacity + Math.sin(p.pulse) * 0.1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const particleCanvas = document.getElementById('particle-canvas');
if (particleCanvas) {
    new ParticleSystem(particleCanvas);
}

// ============================================
// Live Timezone Simulation
// ============================================
const teamMembers = [
    {
        name: 'Amara',
        location: 'Madagascar',
        timezone: 'Indian/Antananarivo',
        workStart: 8,
        workEnd: 17
    },
    {
        name: 'James',
        location: 'Seattle',
        timezone: 'America/Los_Angeles',
        workStart: 10,
        workEnd: 18
    },
    {
        name: 'Elena',
        location: 'London',
        timezone: 'Europe/London',
        workStart: 9,
        workEnd: 17
    },
    {
        name: 'Kwame',
        location: 'Lagos',
        timezone: 'Africa/Lagos',
        workStart: 8,
        workEnd: 17
    }
];

function getTimeInTimezone(timezone) {
    return new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function getHourInTimezone(timezone) {
    const date = new Date();
    const options = { timeZone: timezone, hour: 'numeric', hour12: false };
    return parseInt(date.toLocaleString('en-US', options));
}

function getAvailabilityStatus(member) {
    const hour = getHourInTimezone(member.timezone);

    if (hour >= member.workStart && hour < member.workEnd) {
        return 'available';
    } else if (hour === member.workStart - 1 || hour === member.workEnd) {
        return 'almost';
    } else {
        return 'outside-hours';
    }
}

function getStatusLabel(status) {
    switch (status) {
        case 'available': return 'Working';
        case 'almost': return 'Almost';
        case 'outside-hours': return 'Off hours';
        default: return '';
    }
}

function updateSimulation() {
    // Update your time
    const yourTimeEl = document.getElementById('your-time');
    if (yourTimeEl) {
        yourTimeEl.textContent = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }) + ' your time';
    }

    // Update team members
    const membersContainer = document.getElementById('simulation-members');
    if (membersContainer) {
        membersContainer.innerHTML = teamMembers.map(member => {
            const status = getAvailabilityStatus(member);
            const time = getTimeInTimezone(member.timezone);

            return `
                <div class="simulation-member">
                    <div class="member-status ${status}"></div>
                    <div class="member-info">
                        <div class="member-name">${member.name}</div>
                        <div class="member-location">${member.location}</div>
                    </div>
                    <div class="member-time">
                        <div class="member-time-value">${time}</div>
                        <div class="member-time-label">${getStatusLabel(status)}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Initialize and update every minute
if (document.getElementById('simulation-members')) {
    updateSimulation();
    setInterval(updateSimulation, 60000);
}

// ============================================
// Meeting Time Demo
// ============================================
function renderMeetingDemo() {
    const timelineContainer = document.getElementById('meeting-timeline');
    const currentTimeEl = document.getElementById('demo-current-time');
    const overlapTimeEl = document.getElementById('overlap-time');

    if (!timelineContainer) return;

    // Get user's timezone offset
    const userOffset = new Date().getTimezoneOffset();

    // Team members with their UTC offsets (hours)
    const demoMembers = [
        { name: 'Amara', location: 'Madagascar (EAT)', offset: 3, workStart: 8, workEnd: 17 },
        { name: 'James', location: 'Seattle (PST)', offset: -8, workStart: 9, workEnd: 18 },
        { name: 'Elena', location: 'London (GMT)', offset: 0, workStart: 9, workEnd: 17 },
        { name: 'Kwame', location: 'Lagos (WAT)', offset: 1, workStart: 8, workEnd: 17 }
    ];

    // Convert working hours to UTC for comparison
    function toUTC(hour, offset) {
        return (hour - offset + 24) % 24;
    }

    // Find overlap in UTC
    let overlapStart = 0;
    let overlapEnd = 24;

    demoMembers.forEach(member => {
        const startUTC = toUTC(member.workStart, member.offset);
        const endUTC = toUTC(member.workEnd, member.offset);

        // Handle day wrap
        if (startUTC < endUTC) {
            overlapStart = Math.max(overlapStart, startUTC);
            overlapEnd = Math.min(overlapEnd, endUTC);
        }
    });

    // Render timeline
    timelineContainer.innerHTML = demoMembers.map(member => {
        const startUTC = toUTC(member.workStart, member.offset);
        const endUTC = toUTC(member.workEnd, member.offset);

        // Calculate bar position (percentage of 24 hours)
        const startPercent = (startUTC / 24) * 100;
        const widthPercent = ((endUTC - startUTC + 24) % 24 / 24) * 100;

        // Calculate overlap zone position
        const overlapStartPercent = (overlapStart / 24) * 100;
        const overlapWidthPercent = ((overlapEnd - overlapStart) / 24) * 100;

        return `
            <div class="timeline-member-row">
                <div class="timeline-member-info">
                    <span class="timeline-member-name">${member.name}</span>
                    <span class="timeline-member-location">${member.location}</span>
                </div>
                <div class="timeline-bar-container">
                    <div class="timeline-bar-fill" style="left: ${startPercent}%; width: ${widthPercent}%;"></div>
                    <div class="timeline-overlap-zone" style="left: ${overlapStartPercent}%; width: ${overlapWidthPercent}%;"></div>
                </div>
            </div>
        `;
    }).join('');

    // Update current time display
    if (currentTimeEl) {
        currentTimeEl.textContent = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Calculate overlap time in user's timezone
    if (overlapTimeEl && overlapEnd > overlapStart) {
        const userOffsetHours = -userOffset / 60;
        const localStart = (overlapStart + userOffsetHours + 24) % 24;
        const localEnd = (overlapEnd + userOffsetHours + 24) % 24;

        const formatHour = (h) => {
            const hour = Math.floor(h);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            return `${hour12}${ampm}`;
        };

        overlapTimeEl.textContent = `${formatHour(localStart)} - ${formatHour(localEnd)} your time`;
    }
}

// Initialize meeting demo
renderMeetingDemo();

// ============================================
// Parallax Effect on Feature Icons
// ============================================
function initParallax() {
    const featureCards = document.querySelectorAll('.feature-card');

    if (featureCards.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        featureCards.forEach((card, index) => {
            const icon = card.querySelector('.feature-icon');
            if (!icon) return;

            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = (cardCenter - viewportCenter) / window.innerHeight;

            // Subtle parallax movement
            const offsetY = distance * -15;
            icon.style.transform = `translateY(${offsetY}px)`;
        });
    });
}

// Only enable parallax on desktop
if (window.innerWidth > 768) {
    initParallax();
}

// ============================================
// Animated Number Counters
// ============================================
function animateNumbers() {
    const numberItems = document.querySelectorAll('.number-item');

    if (numberItems.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');

                const valueEl = entry.target.querySelector('.number-value');
                const target = valueEl.dataset.target;
                const text = valueEl.dataset.text;
                const prefix = valueEl.dataset.prefix || '';
                const suffix = valueEl.dataset.suffix || '';

                if (text) {
                    // Text animation (fade in)
                    valueEl.style.opacity = '0';
                    setTimeout(() => {
                        valueEl.textContent = text;
                        valueEl.style.opacity = '1';
                    }, 100);
                } else if (target !== undefined) {
                    // Number animation
                    const targetNum = parseInt(target);

                    if (targetNum === 0) {
                        // For zero, just pop it in
                        valueEl.textContent = prefix + '0' + suffix;
                    } else {
                        // Animate counting up
                        let current = 0;
                        const increment = targetNum / 30;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= targetNum) {
                                current = targetNum;
                                clearInterval(timer);
                            }
                            valueEl.textContent = prefix + Math.floor(current) + suffix;
                        }, 30);
                    }
                }
            }
        });
    }, observerOptions);

    numberItems.forEach(item => numberObserver.observe(item));
}

// Initialize number animations
animateNumbers();
