	// scripts.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle for Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navUl = document.querySelector('nav ul');
    
    navToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        navToggle.textContent = navUl.classList.contains('active') ? '✕' : '☰';
    });

    // Countdown Timer
    const countdownElement = document.getElementById('countdown-timer');
    const championshipDate = new Date('March 10, 2025 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = championshipDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "Championship Started!";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Event Category Filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    const eventList = document.querySelector('.event-list');

    const eventsData = {
        sports: [
            { name: "Cricket", date: "March 10, 2025", venue: "Main Ground", time: "10:00 AM - 5:00 PM" },
            { name: "Football", date: "March 11, 2025", venue: "Field B", time: "2:00 PM - 6:00 PM" },
            { name: "Basketball", date: "March 12, 2025", venue: "Court A", time: "1:00 PM - 4:00 PM" }
        ],
        cultural: [
            { name: "Dance Competition", date: "March 13, 2025", venue: "Auditorium", time: "6:00 PM - 9:00 PM" },
            { name: "Music Fest", date: "March 14, 2025", venue: "Open Stage", time: "5:00 PM - 10:00 PM" }
        ],
        technical: [
            { name: "Hackathon", date: "March 15, 2025", venue: "Lab 1", time: "9:00 AM - 9:00 PM" },
            { name: "Robotics Challenge", date: "March 16, 2025", venue: "Lab 2", time: "10:00 AM - 3:00 PM" }
        ]
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            eventList.innerHTML = '';

            eventsData[category].forEach(event => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h3>${event.name}</h3>
                    <p>Date: ${event.date}</p>
                    <p>Venue: ${event.venue}</p>
                    <p>Time: ${event.time}</p>
                `;
                eventList.appendChild(card);
            });
        });
    });

    // Trigger default category (sports)
    categoryButtons[0].click();

    // Live Scores Simulation
    const liveScoresElement = document.querySelector('.live-scores p');
    const scoreUpdates = [
        "Cricket: Mechanical vs Civil - 120/3 (15 overs)",
        "Football: CSE vs Electrical - 2-1 (Half Time)",
        "Basketball: Chemistry vs HSS - 45-38 (Q3)"
    ];
    let scoreIndex = 0;

    function updateLiveScores() {
        liveScoresElement.textContent = scoreUpdates[scoreIndex];
        scoreIndex = (scoreIndex + 1) % scoreUpdates.length;
    }

    setInterval(updateLiveScores, 5000); // Update every 5 seconds
    updateLiveScores(); // Initial call

    // Registration Form Validation
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = registrationForm.querySelector('input[placeholder="Full Name"]').value;
        const college = registrationForm.querySelector('input[placeholder="College/University"]').value;
        const email = registrationForm.querySelector('input[type="email"]').value;
        const contact = registrationForm.querySelector('input[type="tel"]').value;
        const event = registrationForm.querySelector('select').value;

        if (!name || !college || !email || !contact || !event) {
            alert('Please fill all required fields!');
            return;
        }

        if (!/^\d{10}$/.test(contact)) {
            alert('Please enter a valid 10-digit contact number!');
            return;
        }

        alert('Registration submitted successfully! Proceed to payment.');
        // Here you’d typically send data to a backend
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                navToggle.textContent = '☰';
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Lazy Load Images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.dataset.src = img.src;
        img.src = ''; // Placeholder until loaded
        imageObserver.observe(img);
    });

    // Dynamic Participant Counter Animation
    const counters = {
        'total-participants': 5000,
        'total-colleges': 50,
        'total-events': 20
    };

    Object.keys(counters).forEach(id => {
        const element = document.getElementById(id);
        let count = 0;
        const target = counters[id];
        const increment = target / 100;

        const counterInterval = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(counterInterval);
            }
            element.textContent = Math.floor(count) + '+';
        }, 20);
    });

    // Volunteer Form Submission
    const volunteerForm = document.querySelector('#volunteer form');
    volunteerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = volunteerForm.querySelector('input[placeholder="Name"]').value;
        const email = volunteerForm.querySelector('input[type="email"]').value;
        const role = volunteerForm.querySelector('select').value;

        if (!name || !email || !role) {
            alert('Please fill all required fields!');
            return;
        }

        alert(`Thank you, ${name}! You've signed up as a ${role} volunteer.`);
        volunteerForm.reset();
    });

    // Contact Form Submission
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[placeholder="Name"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        if (!name || !email || !message) {
            alert('Please fill all required fields!');
            return;
        }

        alert('Message sent successfully! We’ll get back to you soon.');
        contactForm.reset();
    });

    // Social Media Feed Placeholder (Mock)
    const twitterFeed = document.getElementById('twitter-feed');
    twitterFeed.innerHTML = '<p>Latest Tweet: "Excited for PGGC 2025! #PGGC"</p>';

    const instagramFeed = document.getElementById('instagram-feed');
    instagramFeed.innerHTML = '<p>Latest Post: "Training hard for the big day! #PGGC2025"</p>';

    // Store Item Click Handler (Mock Purchase)
    document.querySelectorAll('#store .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const item = btn.parentElement.querySelector('h3').textContent;
            alert(`Added ${item} to cart! Proceed to checkout?`);
        });
    });

    // Blog Read More Handler (Mock)
    document.querySelectorAll('#blog .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const title = btn.parentElement.querySelector('h3').textContent;
            alert(`Opening full article: ${title}`);
        });
    });
});

// CSS to support mobile nav (add to styles.css if not already present)
const mobileNavStyles = `
    @media (max-width: 768px) {
        nav ul {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: #1a1a2e;
            padding: 20px;
        }
        nav ul.active {
            display: flex;
        }
        .nav-toggle {
            display: block;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
    @media (min-width: 769px) {
        .nav-toggle { display: none; }
    }
`;

// Inject mobile nav styles dynamically (optional, or add to CSS file)
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavStyles;
document.head.appendChild(styleSheet);