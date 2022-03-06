/*
* 1st Row: first word of audio
* 2nd Row: second word of audio
* 3rd Row:
*   d = different vowel sound
*   s = same vowel sound
*   b = both options are okay (depending on the region and accent)
* */

const dataset = [
    ["hid", "heed", "d" ],
    ["did", "deed", "d" ],
    ["mint", "mean", "d" ],
    ["mint", "meant", "d" ],
    ["whirl", "wheel", "d" ],
    ["wool", "wood", "d" ],
    ["tent", "tint", "d" ],
    ["lent", "mend", "s" ],
    ["run", "rune", "d" ],
    ["fool", "full", "d" ],
    ["man", "mend", "d" ],
    ["woman", "women", "d" ],
    ["duct", "duck", "s" ],
    ["duck", "dock", "d" ],
    ["please", "lease", "s" ],
    ["bee", "been", "d" ],
    ["bit", "bin", "s" ],
    ["born", "burnt", "d" ],
    ["teen", "tin", "d" ],
    ["ups", "oops", "d" ],
    ["met", "mitt", "d" ],
    ["love", "lab", "d" ],
    ["me", "mint", "d" ],
    ["look", "spook", "d" ],
    ["stop", "stool", "d" ],
    ["chance", "chalk", "d" ],
    ["week", "wick", "d" ],
    ["teen", "dream", "s" ],
    ["back", "pack", "s" ],
    ["live", "leave", "d" ],
    ["wrench", "wreck", "s" ],
    ["wrist", "wreak", "d" ],
    ["on", "pod", "b" ],
    ["whale", "stale", "s" ],
    ["beg", "big", "d" ],
    ["bad", "mad", "s" ],
    ["talk", "call", "s" ],
    ["leave", "leaf", "s" ],
    ["want", "wall", "b" ],
    ["dog", "dug", "d" ],
    ["come", "calm", "d" ],
    ["sick", "tick", "s" ],
    ["sheep", "chick", "d" ],
    ["slim", "lent", "d" ],
    ["all", "mall", "s" ],
    ["more", "lore", "s" ],
    ["heart", "dart", "s" ],
    ["none", "nun", "s" ],
    ["some", "come", "s" ],
    ["what", "wham", "d" ],
    ["each", "leech", "s" ],
    ["was", "whats", "d" ],
    ["fool", "cruel", "b" ],
    ["loose", "lose", "s" ],
    ["done", "gone", "d" ],
    ["last", "mast", "s" ],
    ["yuck", "muck", "s" ],
    ["tear", "read", "b" ],
    ["and", "hum", "d" ],
    ["do", "doom", "b" ],
    ["she", "shell", "d" ],
    ["sea", "see", "s" ],
    ["tell", "well", "s" ],
    ["swell", "quench", "s" ],
    ["keep", "skip", "d" ],
    ["punch", "lunch", "s" ],
    ["rift", "shift", "s" ],
    ["fist", "cist", "s" ],
    ["diss", "wrist", "s" ],
    ["mist", "missed", "s" ],
    ["gift", "lift", "s" ],
    ["swift", "wished", "s" ],
    ["salt", "malt", "s" ],
    ["grip", "spit", "s" ],
    ["pit", "knit", "s" ],
    ["kit", "kid", "s" ],
    ["lit", "hint", "s" ],
    ["itch", "stitch", "s" ],
    ["ditch", "rich", "s" ],
    ["crypt", "shrift", "s" ],
    ["skit", "skip", "s" ],
    ["spilt", "nipped", "s" ],
    ["jeep", "jet", "d" ],
    ["whit", "with", "s" ],
    ["hilt", "heel", "d" ],
    ["mix", "meant", "d" ],
    ["ill", "mill", "s" ],
    ["brick", "trick", "s" ],
    ["fit", "feet", "d" ],
    ["linch", "leech", "d" ],
    ["pinch", "peek", "d" ],
    ["miffed", "stiff", "s" ],
    ["inn", "wrench", "d" ],
    ["ran", "rum", "d" ],
    ["rung", "rang", "d" ],
    ["wrung", "wrong", "d" ],
    ["rune", "room", "s" ],
    ["reen", "reed", "s" ],
    ["dawn", "ran", "d" ],
    ["rum", "ran", "d" ],
    ["rim", "wreak", "d" ],
    ["rem", "rim", "d" ],
    ["room", "rune", "s" ],
    ["runs", "roll", "d" ],
    ["rim", "rem", "d" ],
    ["urn", "port", "d" ],
    ["rom", "run", "d" ],
    ["prune", "room", "s" ],
    ["law", "laugh", "d" ],
    ["Lee", "linch", "d" ],
    ["flaw", "slaw", "s" ],
    ["claw", "long", "s" ],
    ["lot", "laud", "b" ],
    ["lawn", "laut", "s" ],
    ["hog", "hug", "d" ],
    ["lodge", "lock", "s" ],
    ["blue", "glue", "s" ],
    ["glee", "flea", "s" ],
    ["blew", "tomb", "s" ],
    ["drew", "clue", "s" ]
]

// Generate the name of the audio file given the array elements
function createFileName(w1, w2) {
    return "../../assets/audio-files/vowel_sounds/" + w1 + "_" + w2 + ".mp3";
}

// Randomize array in-place using Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function generateExercises(data){
    let max_exercises = 10;
    let card = document.querySelector(".card-template").content;

    let title = card.querySelector(".title");
    let audio = card.querySelector(".audio");
    let text_answer = card.querySelector(".text-answer");
    let same_btn = card.querySelector(".same-btn");
    let diff_btn = card.querySelector(".diff-btn");

    let wrapper = document.createElement("div");
    wrapper.setAttribute("class", "row text-center justify-content-around");
    wrapper.setAttribute("id", "wrap");
    document.querySelector("#content").appendChild(
        document.importNode(wrapper, true)
    );

    for(let i = 0; i < 15; i++) {
        title.innerHTML = "Exercise " + (i + 1) + ":";
        audio.src = createFileName(data[i][0], data[i][1]);
        audio.type = "audio/mpeg";
        audio.load();
        text_answer.innerHTML = data[i][0] + " - " + data[i][1];
        if (data[i][2] === "s") {
            same_btn.setAttribute("onclick", "correct(this)");
            diff_btn.setAttribute("onclick", "incorrect(this)");
        } else if (data[i][2] === "d") {
            same_btn.setAttribute("onclick", "incorrect(this)");
            diff_btn.setAttribute("onclick", "correct(this)");
        } else {
            same_btn.setAttribute("onclick", "both(this)");
            diff_btn.setAttribute("onclick", "both(this)");
        }

        document.querySelector("#wrap").appendChild(
            document.importNode(card, true)
        );
    }
}

shuffleArray(dataset);
generateExercises(dataset);

