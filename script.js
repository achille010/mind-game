// Big pool of local images (18 meme images)
const allImages = [
    "shrek.png",           // Image 1 - Shrek
    "gema.png",            // Image 2 - Little girl in car
    "speed.png",           // Image 3 - Person in red
    "warrior.png",         // Image 4 - Watermelon warrior
    "bcry.png",            // Image 5 - Crying baby
    "sia.png",             // Image 6 - Blue face
    "cat.png",             // Image 7 - Gray cat
    "cr.png",              // Image 8 - Cristiano Ronaldo
    "dawg.png",            // Image 9 - Dog looking away
    "blue.png",            // Image 10 - Shocked face
    "halaand.png",         // Image 11 - Haaland
    "laugh.png",           // Image 13 - Laughing man
    "mbean.png",           // Image 14 - Mr. Bean
    "messi.png",           // Image 15 - Messi edit
    "rizz.png",            // Image 16 - Side profile
    "rock.png",            // Image 17 - The Rock eyebrow
    "Hehe-Boi-meme-7 (2).png"  // Image 18 - Hehe boi
];

// Function to pick 8 random images from the pool
function getRandomImages() {
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
}

// Game state variables
let cards, flipped = [], matched = 0, moves = 0, time = 0, timer, busy = false;

// Initialize game
function init() {
    // Pick 8 random images from the pool
    const images = getRandomImages();
    
    // Create pairs and shuffle
    cards = [...images, ...images].sort(() => Math.random() - 0.5);
    
    // Reset game state
    matched = moves = time = 0;
    flipped = [];
    busy = false;
    
    // Stop timer if running
    if (timer) clearInterval(timer);
    
    // Generate cards HTML
    const board = document.getElementById('playGround');
    board.innerHTML = cards.map((img, i) => 
        `<div class="card" onclick="flip(${i})" data-image="${img}">
            <div class="back-face">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                    <path d="m608-368 46-166-142-98-46 166 142 98ZM160-207l-33-16q-31-13-42-44.5t3-62.5l72-156v279Zm160 87q-33 0-56.5-24T240-201v-239l107 294q3 7 5 13.5t7 12.5h-39Zm206-5q-31 11-62-3t-42-45L245-662q-11-31 3-61.5t45-41.5l301-110q31-11 61.5 3t41.5 45l178 489q11 31-3 61.5T827-235L526-125Zm-28-75 302-110-179-490-301 110 178 490Zm62-300Z"/>
                </svg>
            </div>
            <div class="front-face">
                <img src="${img}" alt="card image">
            </div>
        </div>`
    ).join('');
    
    // Reset stats display
    document.querySelectorAll('.stats-value')[0].textContent = 0;
    document.querySelectorAll('.stats-value')[1].textContent = '00 : 00';
    document.querySelectorAll('.stats-value')[2].textContent = '0/8';
}

// Flip card
function flip(i) {
    const card = document.querySelectorAll('.card')[i];
    
    // Prevent invalid clicks
    if (busy || card.classList.contains('flipped') || flipped.length >= 2) return;
    
    // Start timer on first move
    if (!moves) {
        timer = setInterval(() => {
            time++;
            const m = String(Math.floor(time / 60)).padStart(2, '0');
            const s = String(time % 60).padStart(2, '0');
            document.querySelectorAll('.stats-value')[1].textContent = `${m} : ${s}`;
        }, 1000);
    }
    
    // Flip the card
    card.classList.add('flipped');
    flipped.push({card, image: card.dataset.image});
    
    // Check for match when 2 cards flipped
    if (flipped.length === 2) {
        moves++;
        document.querySelectorAll('.stats-value')[0].textContent = moves;
        busy = true;
        
        // Cards match
        if (flipped[0].image === flipped[1].image) {
            matched++;
            document.querySelectorAll('.stats-value')[2].textContent = `${matched}/8`;
            flipped = [];
            busy = false;
            
            // Check if game won
            if (matched === 8) {
                clearInterval(timer);
                setTimeout(() => {
                    document.getElementById('finalMoves').textContent = moves;
                    document.getElementById('finalTime').textContent = 
                        document.querySelectorAll('.stats-value')[1].textContent;
                    document.getElementById('finalMatches').textContent = '8/8';
                    document.getElementById('you-win-modal').classList.add('show');
                }, 500);
            }
        } 
        // Cards don't match
        else {
            setTimeout(() => {
                flipped.forEach(f => f.card.classList.remove('flipped'));
                flipped = [];
                busy = false;
            }, 1000);
        }
    }
}

// Restart game
function restartGame() {
    document.getElementById('you-win-modal').classList.remove('show');
    init();
}

// Start game when page loads
window.addEventListener('DOMContentLoaded', init);