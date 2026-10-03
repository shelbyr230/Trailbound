
const nameInput = document.getElementById("hikerName");
const startMenu = document.getElementById("startMenu");
const leftPanel = document.getElementById("leftPanel");
leftPanel.style.display = "none";
const rightPanel = document.getElementById("rightPanel");
rightPanel.style.display = "none";
const main = document.getElementById("main");

const hikerDisplayBtn = document.getElementById("hikerBtn");
const backpackDisplayBtn = document.getElementById("backpackBtn");

const regionsTab = document.getElementById("regionsTab");
const trailsTab = document.getElementById("trailsTab");

const hikerDiv = document.getElementById("hikerStats");
const hikerWelcome = document.getElementById("hikerWelcome");
const hikerStamina = document.getElementById("hikerStamina");
const hikerHealth = document.getElementById("hikerHealth");
const hikerWater = document.getElementById("hikerWater");
const hikerFood = document.getElementById("hikerFood");
const backpackDisplay = document.getElementById("backpack");
const backpackItems = document.getElementById("backpackItems");

const regionSelection = document.getElementById("regionSelection");
regionSelection.style.display = "none";
const trailSelection = document.getElementById("trailSelection");
trailSelection.style.display = "none";
const trailImg = document.getElementById("trailImg");

const regionBtn = document.querySelectorAll(".regionBtn");
const regionName = document.querySelectorAll(".regionName");
const regionDescription = document.querySelectorAll(".regionDescription");

const trailBtn = document.querySelectorAll(".trailBtn");
const trailName = document.querySelectorAll(".trailName");
const trailDifficulty = document.querySelectorAll(".trailDifficulty");
const trailDistance = document.querySelectorAll(".trailDistance");
const trailDescription = document.querySelectorAll(".trailDescription");

const currentRegionName = document.getElementById("currentRegion");
const currentTrailName = document.getElementById("currentTrailName");
const currentTrailDifficulty = document.getElementById("currentTrailDifficulty");
const currentTrailDistance = document.getElementById("currentTrailDistance");

const hikeTheTrail = document.getElementById("hikeTheTrail");
const trailMsg = document.getElementById("trailMessage");
hikeTheTrail.style.display = "none";
const encounterOptions = document.getElementById("encounterOptions");
const encounterOption = document.querySelectorAll(".encounterOption");

class Hiker {
    constructor(name, maxStamina, maxHealth, maxWater, maxFood, maxBackpackWeight) {
        this.name = name;
        this.stamina = maxStamina;
        this.maxStamina = maxStamina;
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.water = maxWater;
        this.maxWater = maxWater;
        this.food = maxFood;
        this.maxFood = maxFood;
        this.maxBackpackWeight = maxBackpackWeight;
        this.currentRegion = null;
        this.currentTrail = null;
        this.backpack = [];
    }
    drinkWater(amount) {
        (this.water + amount) >= this.maxWater
            ? this.water = this.maxWater
            : this.water += amount;
    }
    eatFood(amount) {
        (this.food + amount) >= this.maxFood
            ? this.food = this.maxFood
            : this.food += amount;
    }
    takeDamage(amount) {
        (this.health - amount) > 0
            ? this.health -= amount
            : rescueHiker();
    }
    decreaseStamina(amount) {
        (this.stamina - amount) > 0
            ? this.stamina -= amount
            : rescueHiker();
    }
    heal(healthAmt, staminaAmt) {
        (this.health + healthAmt) > this.maxHealth
            ? this.health = this.maxHealth
            : this.health += healthAmt;
        (this.stamina + staminaAmt) > this.maxStamina
            ? this.stamina = this.maxStamina
            : this.stamina += staminaAmt;
    }
    getStatus() {
        return `${this.name} | Health: ${this.health}/${this.maxHealth} | Water: ${this.water}/${this.maxWater} | Food: ${this.food}/${this.maxFood}`;
    }
}

const hikers = {
    balancedHiker: new Hiker("Claire", 80, 100, 70, 65, 30),
    enduranceHiker: new Hiker("Evan", 130, 120, 60, 60, 40),
    explorer: new Hiker("Nora", 140, 80, 65, 60, 35),
    trailblazer: new Hiker("Marcus", 75, 110, 90, 85, 55)
}
let hiker = hikers.balancedHiker;

const locations = [
    {
        region: "Trailbound Outfitters",
        description: "A small but well-stocked hiking supply store that acts as a safe hub between wilderness regions. Wooden shelves display gear ranging from canteens to trail snacks, and a friendly shopkeeper offers advice, upgrades, and repairs. A bulletin board near the entrance lists trail conditions, weather updates, and rumors from other hikers. This “region” doesn't have trails — instead, it's a place to manage inventory, buy supplies, sell found items, and prepare for the next journey.",
        trails: null,
        encounters: null
    },
    {
        region: "Pinecrest Campground",
        description: "A peaceful campground nestled between Whispering Pines and Goldenstep Prairie. Tents and cabins circle a central fire pit where hikers share stories at dusk. The campground offers rest opportunities, cooking stations, water refill points, and stamina recovery. Hikers can sleep to restore stats, craft simple items, cook food they've gathered, or talk to other hikers who provide tips, quests, or lore. Pinecrest acts as a social and recovery hub — a safe place to breathe before heading back into the wild.",
        trails: null,
        encounters: null

    },
    {
        region: "Whispering Pines Wilderness",
        description: "A serene forest of towering old-growth pines that seem to murmur when the wind passes through their needles. Moss blankets the forest floor, muffling footsteps and giving the entire region a dreamlike stillness. Lantern posts from long-abandoned ranger routes dot the trails, hinting at forgotten stories. Wildlife is gentle and curious, and the air carries a warm, resin-sweet scent. Whispering Pines is the perfect introduction to the wilderness — peaceful, welcoming, and full of small mysteries.",
        trails: [
            {
                name: "Elderpine Loop",
                difficulty: "Easy",
                distance: 2.4,
                description: "A gentle forest loop winding through soft moss beds and whispering old-growth pines. Perfect for beginners and peaceful strolls.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Elderpine Lookout Tower",
                encounters: [
                    {name: "Wild berries", type: "food", msg: "You came across some edible wild berries along the trail.", action: "hiker.food += 1?"},
                    "Small stream",
                    "Deer"
                ]
            },
            {
                name: "Lantern Ridge Traverse",
                difficulty: "Moderate",
                distance: 5.1,
                description: "A ridge-side trail dotted with old lantern posts from a long-abandoned ranger route. Offers warm sunset views.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Lantern Ridge",
                encounters: [
                    "Wild mushrooms",
                    "Spring",
                    "Bear"
                ]
            },
            {
                name: "Hollowroot Ascent",
                difficulty: "Difficult",
                distance: 7.8,
                description: "A steep climb weaving between massive hollow tree trunks and narrow cliffside ledges. Rewarding but demanding.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Hollowroot Cliffs",
                encounters: [
                    "Wild berries",
                    "Spring",
                    "Duck"
                ]
            }
        ],
        encounters: [
            {
                name: "Wild berries", 
                type: "food", 
                msg: "You find a cluster of bright red berries beneath a pine branch.", 
                options: [
                    {name: "Eat berries", action: () => { hiker.eatFood(1)}, msg: "You eat the berries."},
                    {name: "Store berries", action: () => { addToBackpack({ name: "Trail Mix", type: "Food", weight: 1.5, count: 1 })}, msg: "You store the berries."},
                    {name: "Leave them", action: null, msg: "You leave the berries behind."}
                ]
            },
            {
                name: "Forest Chipmunk",
                type: "wildlife",
                msg: "A curious chipmunk scampers onto the trail, sniffing at your boots.",
                options: [
                    {
                        name: "Offer a snack",
                        action: () => { hiker.heal(0, 1)},
                        msg: "You offer the chipmunk a small snack from the trail. It chitters happily before darting away."
                    },
                    {
                        name: "Observe quietly",
                        action: () => { hiker.heal(0, 2)},
                        msg: "You pause to watch the chipmunk. The peaceful moment restores your energy."
                    },
                    {
                        name: "Shoo it away",
                        action: () => { hiker.decreaseStamina(1)},
                        msg: "You shoo the chipmunk off the trail. It startles and disappears into the brush."
                    }
                ]
            },
            {
                name: "Gentle Brook", 
                type: "water", 
                msg: "A shallow brook trickles across the path.", 
                options: [
                    {name: "Drink water", action: () => { hiker.drinkWater(1)}, msg: "You drink water from the brook."},
                    {name: "Fill canteen", action: () => { addToBackpack({ name: "Water", type: "water", weight: .5, count: 1 })}, msg: "You fill your canteen."},
                    {name: "Step over", action: null, msg: "You step over the brook and continue on the trail."}
                ]
            },
            {
                name: "Pine Rest Spot", 
                type: "peaceful", 
                msg: "A soft bed of pine needles invites you to rest.", 
                options: [
                    {name: "Rest briefly", action: () => { hiker.heal(5, 2)}, msg: "You take a short rest."},
                    {name: "Sit and relax", action: () => { hiker.heal(5, 10)}, msg: "You sit and enjoy the scenery."},
                    {name: "Keep moving", action: null, msg: "You continue along the trail."}
                ]
            },
            {
                name: "Old Ranger Marker",
                type: "adventure",
                msg: "An old wooden ranger marker leans against a mossy stump, its carvings faded but still legible.",
                options: [
                    {
                        name: "Inspect the carvings",
                        action: () => {
                            hiker.heal(0, 1);
                        },
                        msg: "You study the carvings and learn a bit about the old ranger routes."
                    },
                    {
                        name: "Follow the marked direction",
                        action: () => {
                            hiker.decreaseStamina(1);
                            hiker.heal(1, 0);
                        },
                        msg: "You follow the marker's direction, finding a slightly easier path forward."
                    },
                    {
                        name: "Ignore the marker",
                        action: () => {
                            hiker.decreaseStamina(1);
                        },
                        msg: "You continue on your current path, hoping it remains safe."
                    }
                ]
            },
            {
                name: "Whispering Hollow Tree",
                type: "unique",
                msg: "A massive hollow pine tree hums softly, as if whispering your name.",
                options: [
                    {
                        name: "Reach inside the hollow",
                        action: () => {
                            addToBackpack({name: "Elderpine Charm", type: "unique", weight: 0.3, count: 1});
                            hiker.takeDamage(1)
                        },
                        msg: "Your hand brushes something warm. You pull out an Elderpine Charm, but the strange energy drains you slightly."
                    },
                    {
                        name: "Circle around the tree",
                        action: () => {hiker.decreaseStamina(1)},
                        msg: "You walk around the tree cautiously. The humming grows louder, unsettling you."
                    },
                    {
                        name: "Back away slowly",
                        action: null,
                        msg: "You step back from the tree. The humming fades as you continue on the trail."
                    }
                ]
            },
            {
                name: "Shallow Brook", 
                type: "water", 
                msg: "A shallow brook trickles across the path, clear and cold.", 
                options: [
                    {name: "Fill your canteen", action: () => { addToBackpack({ name: "Canteen", type: "Water", weight: 1, count: 1 })}, msg: "You fill your canteen."},
                    {name: "Splash your face", action: () => { hiker.heal(0, 5)}, msg: "You splash your face with the cold water, and continue along the trail, feeling refreshed."},
                    {name: "Step carefully over it", action: null, msg: "You step carefully over the brook."}
                ]
            }
        ]
    },
    {
        region: "Frostwind Highlands",
        description: "High above the treeline, the Frostwind Highlands stretch across icy ridges and shimmering snowfields. Meltwater streams carve silver paths through the terrain, and the wind carries distant, haunting echoes that seem almost melodic. The Shiverpeak Obelisk stands as a silent monument to ancient explorers. Conditions can shift quickly — gentle one moment, punishing the next — making this region a test of endurance and preparation. It's beautiful, harsh, and unforgettable.",
        trails: [
            {
                name: "Snowmelt Crossing",
                difficulty: "Easy",
                distance: 3.0,
                description: "A crisp alpine path following meltwater streams and gentle slopes. Frequent sightings of frost hares.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Snowmelt Basin",
                encounters: [
                    {name: "Wild berries", type: "food", msg: "You came across some edible wild berries along the trail.", action: hiker.food += 1}
                ]
            },
            {
                name: "Obelisk Pass",
                difficulty: "Moderate",
                distance: 6.4,
                description: "A winding trail leading directly to the Shiverpeak Obelisk, with icy winds and panoramic glacier views.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Shiverpeak Obelisk",
                encounters: [
                    "Wild mushrooms",
                    "Spring",
                    "Bear"
                ]
            },
            {
                name: "Galehorn Summit Route",
                difficulty: "Strenuous",
                distance: 9.7,
                description: "A punishing ascent up exposed ridges where the wind howls like a living creature. Only for seasoned hikers.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Galehorn Summit",
                encounters: [
                    "Wild berries",
                    "Spring",
                    "Duck"
                ]
            }
        ]
    },
    {
        region: "Goldenstep Prairie",
        description: "Rolling fields of golden grass sway like waves beneath endless sky. Wildflowers bloom in vibrant patches, and migrating birds trace elegant patterns overhead. The Suncrest Stone Circle sits at the heart of the prairie, radiating quiet mystery and warmth. Trails here feel airy and optimistic, encouraging exploration and reflection. Goldenstep is a region of gentle winds, bright horizons, and subtle magic hidden in the sunlight.",
        trails: [
            {
                name: "Meadowrun Path",
                difficulty: "Easy",
                distance: 2.9,
                description: "A breezy walk through tall golden grasses and wildflowers that sway like waves.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Meadowrun Fields",
                encounters: [
                    {name: "Wild berries", type: "food", msg: "You came across some edible wild berries along the trail.", action: "hiker.food += 1?"},
                    "Small stream",
                    "Deer"
                ]
            },
            {
                name: "Suncrest Circuit",
                difficulty: "Moderate",
                distance: 5.6,
                description: "A looping trail around the ancient Suncrest Stone Circle, with warm winds and migrating bird flocks overhead.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Suncrest Stone Circle",
                encounters: [
                    "Wild mushrooms",
                    "Spring",
                    "Bear"
                ]
            },
            {
                name: "Coyote's Tail Ridge",
                difficulty: "Difficult",
                distance: 8.2,
                description: "A rugged ridge trail with sharp turns, sudden elevation changes, and distant coyote calls echoing at dusk.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Tailwind Ridge",
                encounters: [
                    "Wild berries",
                    "Spring",
                    "Duck"
                ]
            }
        ]
    },
    {
        region: "Tidebreak Coast",
        description: "A dramatic coastline where cliffs meet roaring surf. Driftwood sculptures scatter the beaches, shaped by storms and tides. Tide pools teem with tiny life, and seabirds nest along the rocky bluffs. The Siren's Lantern Lighthouse watches over the region, its beam cutting through fog and sea spray. Tidebreak is equal parts peaceful and perilous — soothing ocean views mixed with slippery rocks, sudden waves, and echoes that seem to answer back.",
        trails: [
            {
                name: "Driftwood Shore Walk",
                difficulty: "Easy",
                distance: 1.8,
                description: "A sandy shoreline path dotted with driftwood sculptures and gentle tide pools.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Driftwood Shore",
                encounters: [
                    {name: "Wild berries", type: "food", msg: "You came across some edible wild berries along the trail.", action: "hiker.food += 1?"},
                    "Small stream",
                    "Deer"
                ]
            },
            {
                name: "Lantern Bluff Trail",
                difficulty: "Moderate",
                distance: 4.7,
                description: "A cliffside route leading to Siren's Lantern Lighthouse, with crashing waves below and seabirds overhead.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Siren's Lantern Lighthouse",
                encounters: [
                    "Wild mushrooms",
                    "Spring",
                    "Bear"
                ]
            },
            {
                name: "Tempest Channel Scramble",
                difficulty: "Strenuous",
                distance: 10.3,
                description: "A brutal coastal challenge weaving through slippery rocks, narrow channels, and roaring surf.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Tempest Channel",
                encounters: [
                    "Wild berries",
                    "Spring",
                    "Duck"
                ]
            }
        ]
    },
    {
        region: "Emberfall Range",
        description: "A rugged volcanic landscape alive with heat and color. Glowing mineral deposits light the ground at night, and steam vents hiss warnings from beneath the earth. The Ashspire Crater looms overhead, pulsing with deep geothermal energy. Wildlife here has adapted to the heat, glowing faintly or moving in erratic patterns. Emberfall is intense, surreal, and mesmerizing — a region where the land itself feels awake.",
        trails: [
            {
                name: "Emberglow Footpath",
                difficulty: "Easy",
                distance: 2.2,
                description: "A warm, glowing trail lit by bioluminescent minerals scattered across volcanic soil.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Emberglow Flats",
                encounters: [
                    {name: "Wild berries", type: "food", msg: "You came across some edible wild berries along the trail.", action: "hiker.food += 1?"},
                    "Small stream",
                    "Deer"
                ]
            },
            {
                name: "Craterline Traverse",
                difficulty: "Moderate",
                distance: 6.0,
                description: "A rugged path skirting the rim of Ashspire Crater, with steam vents and rumbling earth.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Ashspire Crater",
                encounters: [
                    "Wild mushrooms",
                    "Spring",
                    "Bear"
                ]
            },
            {
                name: "Magmaheart Descent",
                difficulty: "Strenuous",
                distance: 11.5,
                description: "A perilous descent into the lower volcanic valleys, where heat haze warps the horizon and footing is treacherous.",
                image: "images/hiking-trail-pexels-niki-clark-9995029-31985745.jpg",
                landmark: "Magmaheart Valley",
                encounters: [
                    "Wild berries",
                    "Spring",
                    "Duck"
                ]
            }
        ]
    }
]

document.querySelector("#startBtn").addEventListener("click", () => {
    if (nameInput.value.trim() === "") {
        alert("Please enter a hiker name.");
    } else {
        console.log(document.querySelector('input[name="hiker"]:checked'));
        startGame();
    }        
});

function startGame() {
    startMenu.style.display = "none";
    leftPanel.style.display = "block";
    rightPanel.style.display = "block";
    regionSelection.style.display = "none";
    trailSelection.style.display = "none";
    hikerDiv.style.display = "block";
    backpackDisplay.style.display = "none";


    const selectedHiker = document.querySelector('input[name="hiker"]:checked');
    console.log(selectedHiker);
    hiker = hikers[selectedHiker.value];
    console.log(hiker);
    hiker.name = nameInput.value.trim();

    hikerWelcome.textContent = `Welcome to the trail, ${hiker.name}!`;
    addToBackpack({ name: "Compass", type: "Navigation", weight: 0.5, count: 1 });
    addToBackpack({ name: "Map", type: "Navigation", weight: 0.2, count: 1 });
    addToBackpack({ name: "First Aid Kit", type: "Medical", weight: 1, count: 1 });
    addToBackpack({ name: "Water Bottle", type: "Water", weight: 2, count: 1 });
    addToBackpack({ name: "Trail Mix", type: "Food", weight: 1.5, count: 1 });
    addToBackpack({ name: "Trail Mix", type: "Food", weight: 1.5, count: 1 });

    updateUI();
    selectLocation();
}

hikerDisplayBtn.addEventListener("click", () => {
    if (backpackDisplay.style.display === "block") {
        backpackDisplay.style.display = "none";
        hikerDiv.style.display = "block"
    }
})

backpackDisplayBtn.addEventListener("click", () => {
    if (hikerDiv.style.display === "block") {
        hikerDiv.style.display = "none";
        backpackDisplay.style.display = "block"
    }
})

function getTrailLocation(trail) {
    const {location} = trail;
    const {region} = location;
    return region;
}

function getTrailLandmark(trail) {
    return trail.location.landmark;
}

function describeTrail(trail) {
    const {name, difficulty, distance} = trail;
    return `${name} is a ${difficulty} trail that is ${distance} miles long.`;
}

function addEmergencyGear(backpack) {
    return [...backpack, "Emergency Blanket", "Whistle"];
}

function calculatePackWeight(...items) {
    let total = 0;
    items.forEach(item => {
        total += item.weight;
    })
    return total;
}

function selectLocation() {
    regionSelection.style.display = "block";

    locations.forEach((location, index) => {
        regionName[index].textContent = location.region;
        regionDescription[index].textContent = location.description;
    })

    regionBtn.forEach((button, index) => {
        button.addEventListener("click", () => {
            const selectedRegion = locations[index];
            hiker.currentRegion = selectedRegion;
            currentRegionName.textContent = selectedRegion.region;
            if (index === 0) {
                console.log("Going to the store!");
            } else if (index === 1) {
                console.log("Going to the campground!");
            } else {
                console.log("Going to a trail!");
                selectTrail();
            }
            regionSelection.style.display = "none";
        })
    })
}

function selectTrail() {
    trailSelection.style.display = "block";

    hiker.currentRegion.trails.forEach((trail, index) => {
        trailName[index].textContent = trail.name;
        trailDifficulty[index].textContent = trail.difficulty;
        trailDistance[index].textContent = trail.distance;
        trailDescription[index].textContent = trail.description;
    })

    trailBtn.forEach((button, index) => {
        button.addEventListener("click", () => {
            const selectedTrail = hiker.currentRegion.trails[index];
            hiker.currentTrail = selectedTrail;
            main.style.backgroundImage = `url("${selectedTrail.image}")`;
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
    //returnToCamp();
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
    let encounterResolved = false;
    let encounterTypeList = [];
    let selectedEncounter;
    if (randomNum < 40) {
        encounterTypeList = getEncounterByType("peaceful");
        selectedEncounter = encounterTypeList[0];
        trailMsg.textContent = selectedEncounter.msg;
    } else if (randomNum < 60) {
        encounterTypeList = getEncounterByType("adventure");
        selectedEncounter = encounterTypeList[0];
        trailMsg.textContent = selectedEncounter.msg;
    } else if (randomNum < 75) {
        encounterTypeList = getEncounterByType("water");
        selectedEncounter = encounterTypeList[0];
        trailMsg.textContent = selectedEncounter.msg;
    } else if (randomNum < 90) {
        encounterTypeList = getEncounterByType("food");
        selectedEncounter = encounterTypeList[0];
        trailMsg.textContent = selectedEncounter.msg;
    } else if (randomNum < 97) {
        encounterTypeList = getEncounterByType("wildlife");
        selectedEncounter = encounterTypeList[0];
        trailMsg.textContent = selectedEncounter.msg;
    } else {
        encounterTypeList = getEncounterByType("unique");
        selectedEncounter = encounterTypeList[0];
        trailMsg.textContent = selectedEncounter.msg;
    }
    console.log(selectedEncounter);
    selectedEncounter.options.forEach((option, index) => {
        console.log(option.name, index);
        encounterOption[index].textContent = option.name;
    })

    encounterOption.forEach((button, index) => {
        button.addEventListener("click", () => {
            const selectedOption = selectedEncounter.options[index];
            console.log(selectedOption);
            if (selectedOption.action) {
                selectedOption.action();
            }
            trailMsg.textContent = selectedOption.msg;
            returnToCamp();
        })
    })
}

function getEncounterByType(type) {
    return hiker.currentRegion.encounters.filter(encounter => encounter.type === type);
}

function rescueHiker() {
    console.log(`${hiker.name} health is out! Rescued by emergency team.`);
}

function returnToCamp() {
    encounterOptions.style.display = "none";
    trailMsg.textContent = "Returned to camp for the night.";
    hiker.currentRegion = locations[1];
    main.style.backgroundImage = `url("images/Start_Menu2.jpg")`;
    currentRegionName.textContent = locations[1].region;
    currentTrailName.textContent = null;
    currentTrailDifficulty.textContent = null;
    currentTrailDistance.textContent = null;
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
    } else {
        if (hiker.backpack.length < 12) {
            hiker.backpack.push(item);
        } else {
            console.log("there's no room!");
        }
    }
}

function hasItem(item) {
    return hiker.backpack.some(obj => obj.name === item.name);
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

function updateBackpackUI() {
    const allBackpackSpaces = document.querySelectorAll(".item");
    
    allBackpackSpaces.forEach(space => {
        space.querySelector('.itemName').textContent = "";
        space.querySelector('.itemCount').textContent = ""; 
    });

    hiker.backpack.forEach((item, index) => {
        const currentSpace = allBackpackSpaces[index];
        if (currentSpace) {
            currentSpace.querySelector('.itemName').textContent = item.name;
            currentSpace.querySelector('.itemCount').textContent = item.count;
        }
    });
    document.getElementById("backpackSpaces").textContent = `${hiker.backpack.length}/12`;
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
    const staminaStatus = hiker.stamina > 50
        ? " - You're doing well!"
        : " - You should rest.";
    hikerStamina.textContent = `Stamina: ${hiker.stamina}/${hiker.maxStamina}` + staminaStatus;
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
    updateBackpackUI();
}

// FUTURE EXPANSIONS
// - Expand encounter types into separate functions
// - Add multiple wildlife encounters
// - Add rare trail events
// - Add events influenced by trail difficulty
// - Add events influenced by weather
// - Add check for food/water/medical supplies before hikes
// - Add store to purchase supplies?
// - Add time to encounters. Some encounters cost more time