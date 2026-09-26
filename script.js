const nameInput = document.getElementById("hikerName");
const startMenu = document.getElementById("startMenu");
const hikerDiv = document.getElementById("hikerStats");
const hikerWelcome = document.getElementById("hikerWelcome");
const hikerHealth = document.getElementById("hikerHealth");
const hikerWater = document.getElementById("hikerWater");
const hikerFood = document.getElementById("hikerFood");

const trailSelection = document.getElementById("trailSelection");
trailSelection.style.display = "none";

const trailBtn = document.querySelectorAll(".trailBtn");
const trailName = document.querySelectorAll(".trailName");
const trailDifficulty = document.querySelectorAll(".trailDifficulty");
const trailDistance = document.querySelectorAll(".trailDistance");
const trailDescription = document.querySelectorAll(".trailDescription");

const hikeTheTrail = document.getElementById("hikeTheTrail");
const selectedTrailName = document.getElementById("selectedTrailName");
const trailMsg = document.getElementById("trailMessage");
hikeTheTrail.style.display = "none";

const hiker = {
    name: "Bob",
    health: 100,
    maxHealth: 100,
    water: 3,
    maxWater: 3,
    food: 5,
    maxFood: 5,
    currentTrail: null,
    backpack: []
}

const trails = [
    {
        name: "Forest Trail",
        difficulty: "Easy",
        distance: 3,
        description: "A peaceful trail through a dense forest."
    },
    {
        name: "Mountain Trail",
        difficulty: "Hard",
        distance: 7,
        description: "A steep climb with a rewarding overlook."
    },
    {
        name: "River Trail",
        difficulty: "Moderate",
        distance: 5,
        description: "A winding trail following a rushing river."
    }
]

document.querySelector("#startBtn").addEventListener("click", () => {
    if (nameInput.value.trim() === "") {
        alert("Please enter a hiker name.");
    } else {
        startGame();
    }        
});

function startGame() {
    startMenu.style.display = "none";

    hiker.name = nameInput.value.trim();

    hikerWelcome.textContent = `Welcome to the trail, ${hiker.name}!`;
    
    addToBackpack("Compass");
    addToBackpack("Map");
    addToBackpack("First Aid Kit");
    console.log(hiker.backpack);
    updateUI();
    selectTrail();
}

function selectTrail() {
    trailSelection.style.display = "block";

    trails.forEach((trail, index) => {
        trailName[index].textContent = trail.name;
        trailDifficulty[index].textContent = trail.difficulty;
        trailDistance[index].textContent = trail.distance;
        trailDescription[index].textContent = trail.description;
    })

    trailBtn.forEach((button, index) => {
        button.addEventListener("click", () => {
            const selectedTrail = trails[index];
            hiker.currentTrail = selectedTrail;
            trailSelection.style.display = "none";
            startHike(selectedTrail);
        })
    })
}

function startHike(selectedTrail) {
    hikeTheTrail.style.display = "block";
    selectedTrailName.textContent = selectedTrail.name;
    handleTrailDifficulty(selectedTrail.difficulty)
    updateUI();
    resolveTrailEncounter();
    updateUI();
}

function handleTrailDifficulty(difficulty) {
    switch (difficulty) {
        case "Easy":
            trailMsg.textContent = "This trail should be a relaxing walk.";
            hiker.water -= 1;
            break;
        case "Moderate":
            trailMsg.textContent = "Keep an eye on your water supply.";
            hiker.water -= 2;
            break;
        case "Hard":
            trailMsg.textContent = "This trail will test your hiking skills!";
            hiker.water -= 3;
            break;
        default:
            trailMsg.textContent = "Unknown difficulty...";
            break;
    }
}

function resolveTrailEncounter() {
    const randomNum = Math.random() * 100;
    if (randomNum < 50) {
        trailMsg.textContent = "The trail is peaceful. You continue hiking.";
    } else if (randomNum < 70) {
        trailMsg.textContent = "You discover a small stream and refill your water.";
        hiker.water += 1;
    } else if (randomNum < 85) {
        trailMsg.textContent = "You find some edible berries along the trail.";
        hiker.food += 1;
    } else {
        trailMsg.textContent = "A wild animal startles you! You lose 10 health.";
        hiker.health -= 10;
    }
}

function addToBackpack(item) {
    hiker.backpack.push(item);
}

function checkHikerStatus() {
    const healthStatus = hiker.health > 50
        ? " - You're doing well!"
        : " - You should be careful.";
    hikerHealth.textContent = `Health: ${hiker.health}/${hiker.maxHealth}` + healthStatus;
    const waterStatus = hiker.water >= 2
        ? " - You have enough water for now."
        : " - Your water supply is getting low!";
    hikerWater.textContent = `Water: ${hiker.water}/${hiker.maxWater}` + waterStatus;
    const foodStatus = hiker.food >= 3
        ? " - You have enough food for now."
        : " - You're running out of food for your hike!";
    hikerFood.textContent = `Food: ${hiker.food}/${hiker.maxFood}` + foodStatus;
}

function updateUI() {
    checkHikerStatus();
}

// FUTURE EXPANSIONS
// - Expand encounter types into separate functions
// - Add multiple wildlife encounters
// - Add rare trail events
// - Add events influenced by trail difficulty
// - Add events influenced by weather