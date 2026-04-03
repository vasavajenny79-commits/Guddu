let noCount = 0;
let hasTouchedNo = false;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const bunny = document.getElementById("displayBunny");
const music = document.getElementById("bgMusic");
const toast = document.getElementById("toast");
const mainTitle = document.getElementById("mainTitle");

// Bunny Expression GIFs (starting/emotional)
const gifs = { <link rel="stylesheet" href="style.css">
    shy: "https://media.tenor.com/7S_O6B_f0vEAAAAi/milk-and-mocha.gif",
    sad: "https://media.tenor.com/T0_6pXF7v6UAAAAi/milk-and-mocha.gif",
    crying: "https://media.tenor.com/8mX_O7p_YpAAAAAi/milk-and-mocha.gif",
    begging: "https://media.tenor.com/vN3fHOCT9K8eFmP4XJ/milk-and-mocha.gif",
    playful: "https://media.tenor.com/Y3U7I-Y9K_MAAAAi/milk-and-mocha.gif"
};

function showToast(msg) {
    toast.innerText = msg;
    toast.style.opacity = 1;
    setTimeout(() => toast.style.opacity = 0, 2000);
}

function playMusic() {
    music.volume = 0.5;
    music.play().catch(() => {});
}

noBtn.addEventListener("click", () => {
    noCount++;
    hasTouchedNo = true;
    playMusic();

    // Text and Bunny changes
    if (noCount === 1) {
        noBtn.innerText = "Are you sure? 🥺";
        bunny.src = gifs.sad; // Sad Bunny
        showToast("Please don't say no... 🥺");
    } else if (noCount === 2) {
        noBtn.innerText = "Really sure? 😭";
        bunny.src = gifs.crying; // Crying Bunny
        showToast("You're making me so sad... 💔");
    } else if (noCount === 3) {
        noBtn.innerText = "Think again! 💔";
        bunny.src = gifs.begging; // Begging Bunny
        showToast("Please rethink this... 🥺😭");
    } else {
        // 4+ clicks: Button runs away!
        noBtn.innerText = "Catch me! 😜";
        bunny.src = gifs.playful; // Playful Bunny
        noBtn.style.position = "fixed";
        
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        
        noBtn.style.left = Math.random() * maxX + "px";
        noBtn.style.top = Math.random() * maxY + "px";
        
        showToast("Catch me if you can! 🏃‍♂️💨");
    }

    // Yes grows, No shrinks
    yesBtn.style.transform = `scale(${1 + noCount * 0.4})`;
    noBtn.style.transform = `scale(${Math.max(0.4, 1 - noCount * 0.1)})`;
});

yesBtn.addEventListener("click", () => {
    playMusic();
    // Challenge: Patel must click 'No' at least 3 times first
    if (!hasTouchedNo) {
        showToast("Wait! Try clicking 'No' once first... 😜");
        mainTitle.innerText = "Arey! Click 'No' once! 😂";
    } else if (noCount < 3) {
        showToast("Pehle thoda aur manao! 🥺");
        mainTitle.innerText = "Click 'No' some more! 😏";
    } else {
        // Success: Transition to celebration
        document.getElementById("proposalScreen").classList.add("hidden");
        document.getElementById("celebrationScreen").classList.remove("hidden");
        document.body.style.background = "#e6fffa"; // Light teal
    }
});

// Falling Hearts/Letters Rain
setInterval(() => {
    const symbols = ["💖", "💕", "✉️", "💌", "❤️"];
    const el = document.createElement('div');
    el.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    el.className = 'falling-item';
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = Math.random() * 10 + 20 + "px";
    el.style.animationDuration = (Math.random() * 2 + 3) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}, 350);
