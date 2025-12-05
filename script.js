"use strict";
const movies = [
    {
        name: "The Last Sunset",
        image: "images/Sunset.jpg",
        desc: "A heartwarming drama about family and redemption. Follow the journey of a retired fisherman rediscovering life's meaning. Rated PG-13. Showtimes: 2:00 PM, 5:00 PM, 8:00 PM"
    },
    {
        name: "Galaxy Quest",
        image: "images/Galaxy.jpg",
        desc: "Epic space adventure that will take you to new worlds. Join the crew of the Starship Endeavor as they battle alien forces to save humanity. Rated PG. Showtimes: 3:00 PM, 6:00 PM, 9:00 PM"
    },
    {
        name: "Midnight in Paris",
        image: "images/Paris.jpg",
        desc: "Romantic comedy that will make you believe in love again. Two strangers meet by chance and embark on a night through the city of lights. <strong>Rated PG-13.</strong> <br><span class='showtime'>Showtimes: 4:00 PM, 7:00 PM</span>"
    }
];
document.getElementById('theme-toggle').onclick = function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        this.textContent = 'Light Mode';
    } else {
        this.textContent = 'Dark Mode';
    }
};
document.querySelectorAll('.movie-btn').forEach(btn => {
    btn.onclick = function(e) {
        document.querySelectorAll('.movie-btn').forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
        const index = parseInt(this.dataset.movie);
        const movie = movies[index];
        document.getElementById('movie-display').innerHTML = `
            <img src="${movie.image}" alt="${movie.name}" onerror="this.src='#">
            <h3>${movie.name}</h3>
            <p>${movie.desc}</p>
        `;
    };
});
document.getElementById('movie-display').innerHTML = `
    <img src="${movies[0].image}" alt="${movies[0].name}" onerror="this.src='#">
    <h3>${movies[0].name}</h3>
    <p>${movies[0].desc}</p>
`;
document.querySelector('.movie-btn').classList.add('active');

let targetNumber = Math.floor(Math.random() * 10) + 1;

document.getElementById('guess-btn').onclick = function() {
    const guessInput = document.getElementById('guess-input');
    const guess = parseInt(guessInput.value);
    const resultDiv = document.getElementById('game-result');
    resultDiv.className = 'result';
    
    if (isNaN(guess) || guess < 1 || guess > 10) {
        resultDiv.textContent = "Please enter a valid number between 1 and 10!";
        resultDiv.classList.add('error');
        return;
    }
    
    if (guess === targetNumber) {
        resultDiv.textContent = `🎉 Congratulations! You guessed ${guess} and won free popcorn! The number was ${targetNumber}.`;
        resultDiv.classList.add('success');
        targetNumber = Math.floor(Math.random() * 10) + 1;
    } else {
        resultDiv.textContent = `Sorry! You guessed ${guess}. Try again!`;
        resultDiv.classList.add('error');
    }
    guessInput.value = '';
};

document.getElementById('contact-form').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const comments = document.getElementById('comments').value.trim();
    const contactMethod = document.querySelector('input[name="contact-method"]:checked');
    
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    let isValid = true;
    if (!name) {
        document.getElementById('name-error').textContent = "Full name is required";
        isValid = false;
    }
    
    if (phone && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        document.getElementById('phone-error').textContent = "Please use format: 123-456-7890";
        isValid = false;
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').textContent = "Please enter a valid email address";
        isValid = false;
    }
    
    if (!comments) {
        document.getElementById('comments-error').textContent = "Comments are required";
        isValid = false;
    }
    
    if (!contactMethod) {
        document.getElementById('method-error').textContent = "Please select a preferred contact method";
        isValid = false;
    }

    if (isValid) {
        const customer = {
            name: name,
            phone: phone || "Not provided",
            email: email || "Not provided",
            comments: comments,
            contactMethod: contactMethod.value,
            submissionDate: new Date().toLocaleString()
        };
        
        const successDiv = document.getElementById('success-message');
        const contactType = customer.contactMethod === 'phone' ? 'phone call' : 'email';
        successDiv.innerHTML = `
            <h3>Thank You, ${customer.name}!</h3>
            <p>We will contact you via ${contactType} within 24 hours.</p>
            <p><strong>Your Message:</strong> ${customer.comments}</p>
        `;
        successDiv.style.display = 'block';
        
        document.getElementById('contact-form').reset();
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 10000);
    }
};