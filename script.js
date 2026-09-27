const nameInput = document.getElementById("hikerName");
const startMenu = document.getElementById("startMenu");
const leftPanel = document.getElementById("leftPanel");
leftPanel.style.display = "none";
const rightPanel = document.getElementById("rightPanel");
rightPanel.style.display = "none";
const hikerDiv = document.getElementById("hikerStats");
const hikerWelcome = document.getElementById("hikerWelcome");
const hikerHealth = document.getElementById("hikerHealth");
const hikerWater = document.getElementById("hikerWater");
const hikerFood = document.getElementById("hikerFood");
const backpackItems = document.getElementById("backpackItems");

const trailSelection = document.getElementById("trailSelection");
trailSelection.style.display = "none";
const trailImg = document.getElementById("trailImg");

const trailBtn = document.querySelectorAll(".trailBtn");
const trailName = document.querySelectorAll(".trailName");
const trailDifficulty = document.querySelectorAll(".trailDifficulty");
const trailDistance = document.querySelectorAll(".trailDistance");
const trailDescription = document.querySelectorAll(".trailDescription");

const currentTrailName = document.getElementById("currentTrailName");
const currentTrailDifficulty = document.getElementById("currentTrailDifficulty");
const currentTrailDistance = document.getElementById("currentTrailDistance");

const hikeTheTrail = document.getElementById("hikeTheTrail");
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
    backpack: [],
    maxWeight: 15
}

const trails = [
    {
        name: "Forest Trail",
        difficulty: "Easy",
        distance: 3,
        description: "A peaceful trail through a dense forest.",
        image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg"
    },
    {
        name: "Mountain Trail",
        difficulty: "Hard",
        distance: 7,
        description: "A steep climb with a rewarding overlook.",
        image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg"
    },
    {
        name: "River Trail",
        difficulty: "Moderate",
        distance: 5,
        description: "A winding trail following a rushing river.",
        image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg"
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
    leftPanel.style.display = "block";
    rightPanel.style.display = "block";

    hiker.name = nameInput.value.trim();

    hikerWelcome.textContent = `Welcome to the trail, ${hiker.name}!`;
    addToBackpack({ name: "Compass", type: "Navigation", weight: 0.5, count: 1 });
    addToBackpack({ name: "Map", type: "Navigation", weight: 0.2, count: 1 });
    addToBackpack({ name: "First Aid Kit", type: "Medical", weight: 1, count: 1 });
    addToBackpack({ name: "Water Bottle", type: "Water", weight: 2, count: 1 });
    addToBackpack({ name: "Trail Mix", type: "Food", weight: 1.5, count: 1 });
    addToBackpack({ name: "Trail Mix", type: "Food", weight: 1.5, count: 1 });

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
            trailImg.src = selectedTrail.image;
            currentTrailName.textContent = selectedTrail.name;
            currentTrailDifficulty.textContent = selectedTrail.difficulty;
            currentTrailDistance.textContent = selectedTrail.distance;
            trailSelection.style.display = "none";
            startHike(selectedTrail);
        })
    })
}

function startHike(selectedTrail) {
    hikeTheTrail.style.display = "block";
    handleTrailDifficulty(selectedTrail.difficulty);
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
        addToBackpack({name: "Berries", type: "Food", weight: 1, count: 1});
    } else {
        trailMsg.textContent = "A wild animal startles you! You lose 10 health.";
        hiker.health -= 10;
    }
}

function addToBackpack(item) {
    if (hasItem(item)) {
        console.log("item here already!");
        hiker.backpack.forEach(obj => {
            if (obj.name === item.name) {
                obj.weight += item.weight;
                obj.count += 1;
            }
        });
        console.log(hiker.backpack);
    } else {
        if (findEmptyItemSpace(item)) {
            hiker.backpack.push(item);
            document.getElementById("backpackSpaces").textContent = `${hiker.backpack.length}/12`;
        }
    }
}

function hasItem(item) {
    console.log(item);
    return hiker.backpack.some(obj => obj.name === item.name);
}

function findEmptyItemSpace(item) {
    const firstEmptySpace = Array.from(document.querySelectorAll(".item"))
        .find(div => div.querySelector('.itemName').textContent.trim() === '');

    if (firstEmptySpace) {
        firstEmptySpace.querySelector('.itemName').textContent = item.name;
        firstEmptySpace.querySelector('.itemCount').textContent = item.count;
        return true;
    } else {
        console.log("there's no more room!");
        return false;
    }
}

function removeBackpackItem(item) {
    if (hasItem(item)) {
        hiker.backpack.forEach(obj => {
            if (obj.name === item.name) {
                if (obj.count === 1) {
                    const itemIndex = hiker.backpack.indexOf(obj);
                    hiker.backpack.splice(itemIndex, 1);
                } else {
                    obj.count -= 1;
                    obj.weight -= item.weight;
                }
            }
        })
        
    } else {
        console.log(`${item} is not in backpack.`);
    }
}

function hasItemType(type) {
    return hiker.backpack.some(item => item.type === type);
}

function findItemByType(type) {
    return hiker.backpack.find(item => item.type === type);
}

function getItemNames() {
    return hiker.backpack.map(item => item.name);
}

function getItemByType(type) {
    return hiker.backpack.filter(item => item.type === type);
}

function getBackpackWeight() {
    return hiker.backpack.reduce((total, item) => total + item.weight, 0);
}

function getLightGear() {
    return hiker.backpack.filter(item => item.weight <= 1);
}

function hasMedicalGear() {
    return hiker.backpack.some(item => item.type === "Medical");
}

function hasFood() {
    return hiker.backpack.some(item => item.type === "Food");
}

function hasWater() {
    return hiker.backpack.some(item => item.type === "Water");
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
// - Add check for food/water/medical supplies before hikes
// - Add store to purchase supplies?