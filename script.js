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
        desc: "Romantic comedy that will make you believe in love again. Two strangers meet by chance and embark on a night through the city of lights. Rated PG-13. Showtimes: 4:00 PM, 7:00 PM"
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
}