/* dataset info:
* 1st Row: first word of audio
* 2nd Row: second word of audio
* 3rd Row:
*   d = different vowel sound
*   s = same vowel sound
*   b = both options are okay (depending on the region and accent)
* */

const dataset = [
    ["all", "mall", "s" ],
    ["and", "hum", "d" ],
    ["back", "pack", "s" ],
    ["bad", "mad", "s" ],
    ["bee", "been", "d" ],
    ["beg", "big", "d" ],
    ["bit", "bin", "s" ],
    ["blew", "tomb", "s" ],
    ["blue", "glue", "s" ],
    ["born", "burnt", "d" ],
    ["brick", "trick", "s" ],
    ["chance", "chalk", "d" ],
    ["cloth", "lawn", "b" ],
    ["come", "calm", "d" ],
    ["crypt", "shrift", "s" ],
    ["dawn", "ran", "d" ],
    ["did", "deed", "d" ],
    ["diss", "wrist", "s" ],
    ["ditch", "rich", "s" ],
    ["do", "doom", "b" ],
    ["dog", "dug", "d" ],
    ["done", "gone", "d" ],
    ["drew", "clue", "s" ],
    ["duck", "dock", "d" ],
    ["duct", "duck", "s" ],
    ["each", "leech", "s" ],
    ["fist", "cist", "s" ],
    ["fit", "feet", "d" ],
    ["flaw", "slaw", "s" ],
    ["fool", "cruel", "b" ],
    ["fool", "full", "d" ],
    ["gift", "lift", "s" ],
    ["glee", "flea", "s" ],
    ["grip", "spit", "s" ],
    ["heart", "dart", "s" ],
    ["hid", "heed", "d" ],
    ["hilt", "heel", "d" ],
    ["hog", "hug", "d" ],
    ["ill", "mill", "s" ],
    ["inn", "wrench", "d" ],
    ["itch", "stitch", "s" ],
    ["jeep", "jet", "d" ],
    ["keep", "skip", "d" ],
    ["kit", "kid", "s" ],
    ["last", "mast", "s" ],
    ["law", "laugh", "d" ],
    ["leave", "leaf", "s" ],
    ["Lee", "linch", "d" ],
    ["linch", "leech", "d" ],
    ["lit", "hint", "s" ],
    ["live", "leave", "d" ],
    ["lodge", "lock", "s" ],
    ["look", "spook", "d" ],
    ["loose", "lose", "s" ],
    ["love", "lab", "d" ],
    ["man", "mend", "d" ],
    ["me", "mint", "d" ],
    ["met", "mitt", "d" ],
    ["miffed", "stiff", "s" ],
    ["mint", "mean", "d" ],
    ["mint", "meant", "d" ],
    ["mist", "missed", "s" ],
    ["mix", "meant", "d" ],
    ["more", "lore", "s" ],
    ["none", "nun", "s" ],
    ["on", "pod", "b" ],
    ["pinch", "peek", "d" ],
    ["pit", "knit", "s" ],
    ["please", "lease", "s" ],
    ["prune", "room", "s" ],
    ["punch", "lunch", "s" ],
    ["ran", "rum", "d" ],
    ["reen", "reed", "s" ],
    ["rem", "rim", "d" ],
    ["rift", "shift", "s" ],
    ["rim", "wreak", "d" ],
    ["rim", "rem", "d" ],
    ["rom", "run", "d" ],
    ["room", "rune", "s" ],
    ["rum", "ran", "d" ],
    ["run", "rune", "d" ],
    ["rune", "room", "s" ],
    ["rung", "rang", "d" ],
    ["runs", "roll", "d" ],
    ["salt", "malt", "s" ],
    ["sea", "see", "s" ],
    ["she", "shell", "d" ],
    ["sheep", "chick", "d" ],
    ["sick", "tick", "s" ],
    ["skit", "skip", "s" ],
    ["slim", "lent", "d" ],
    ["spilt", "nipped", "s" ],
    ["stop", "stool", "d" ],
    ["swell", "quench", "s" ],
    ["swift", "wished", "s" ],
    ["talk", "call", "s" ],
    ["tear", "read", "b" ],
    ["teen", "tin", "d" ],
    ["teen", "dream", "s" ],
    ["tell", "well", "s" ],
    ["tent", "tint", "d" ],
    ["ups", "oops", "d" ],
    ["urn", "port", "d" ],
    ["want", "wall", "b" ],
    ["was", "whats", "d" ],
    ["week", "wick", "d" ],
    ["whale", "stale", "s" ],
    ["what", "wham", "d" ],
    ["whirl", "wheel", "d" ],
    ["whit", "with", "s" ],
    ["woman", "women", "d" ],
    ["wool", "wood", "d" ],
    ["wrench", "wreck", "s" ],
    ["wrist", "wreak", "d" ],
    ["wrung", "wrong", "d" ],
    ["yuck", "muck", "s" ]
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
    let max_exercises = 15;
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

    for(let i = 0; i < max_exercises; i++) {
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

//shuffleArray(dataset);
generateExercises(dataset);

