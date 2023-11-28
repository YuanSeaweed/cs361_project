const spawner = require('child_process').spawn;
const prompt = require('prompt-sync')();
const fs = require('fs');

function start() {
    console.log("Welcome to the Virtual Character Advice Center! We appreciate you taking the time to use our service.");
    console.log("");

    // give user a list of choices
    choice();
    // user picks a character
    // user goes to a survey
    // total up results from survey and return a verdict back to this js file
    // based on the verdict, print a response based on the character they picked
}

function choice() {
    let input;

    console.log("What would you like to do?\n");
    console.log("1. Start describing your survey");
    console.log("2. View the characters");
    console.log("3. View the Latest Features!");
    console.log("4. Give us your feedback! (^w^)");
    console.log("5. FAQ/About Page");
    console.log("6. Exit\n");

    input = prompt('What would you like to do? (Enter 1-5)');

    if (input == 1) conduct();
    else if (input == 2) viewCharacters();
    else if (input == 3) latest();
    else if (input == 4) feedback();
    else if (input == 5) aboutPage();
    else if (input == 6) {
        console.log("Goodbye!");
    }
}

function conduct() {
    let character = chooseCharacter();
    let sum = 0;

    // Write the character's name to a file
    fs.writeFile('char.txt', character, (err) => {
        if (err) {
            console.error('Error writing to char.txt:', err);
            return;
        }

        console.log(character + " will be asking you questions.");

        // Wait for the user to answer questions in the microservice
        sum = waitForResult(character);
    });
}

function waitForResult(character) {
    let resultExists = false;

    do {
        let wait = prompt("Please answer the questions on the survey!");

        if (fs.existsSync("result.txt")) {
            //console.log("The file from the python script exists!");
            resultExists = true;
        }
    } while (!resultExists);

    //store the content of the file.
    let sum = 0;
    sum = fs.readFileSync("result.txt", 'utf-8');

    if (fs.existsSync("char.txt")) {
        // Delete the file
        fs.unlinkSync("char.txt");
        //console.log(`File char.txt deleted successfully.`);
    } else {
        //console.log(`File char.txt does not exist.`);
    }

    if (fs.existsSync("result.txt")) {
        // Delete the file
        fs.unlinkSync("result.txt");
        //console.log(`File result.txt deleted successfully.`);
    } else {
        //console.log(`File result.txt does not exist.`);
    }

    //console.log("project.js reads that result.txt contains: " + sum);
    response(character, sum)

    let again;
    let askAnother;
    //console.log("Would you like to ask someone else? Enter their name or 'no' if not.");
    do {
        console.log("Would you like to ask someone else? Enter their name or 'no' if not.");
        askAnother = prompt("");
        if (characterExists(askAnother) == true) {
            response(askAnother, sum)
            askAnother = ""
        }
        else if (askAnother == "no") {
            break;
        }
        else if (characterExists(askAnother) == false) {
            console.log("Sora: ''Who's that? Pick me, Caihong, or Rin.'' \nCaihong: ''Eh? Don't tell me you already forget our names?''\n")
        }
    } while (characterExists(askAnother) == false)

    console.log("Would you like to go back to the main menu? Enter 'yes' if you want.");
    again = prompt("");
    if (again == 'yes') {
        start();
    } else {
        return;
    }
}

function response(c, sum) {
    //console.log("Character chosen: " + c + " Sum: " + sum)
    if (c == "Sora")
        soraResponse(sum)
    else if (c == "Caihong")
        caihongResponse(sum)
    else if (c == "Rin")
        rinResponse(sum)
}

function soraResponse(sum) {
    if (sum >= 5 && sum < 13) {
        console.log("\nSora: ''Sounds like you should talk about this to your friends \n and taking a day to relax. Go out and have some fun bro, \nI sometimes visit parks to take my mind off things, go for a jog there \nwhile I'm at it. You'll get better soon buddy, don't worry about it.\n");
        console.log("\nCaihong: Wanna see that new Shinkai film coming out in two days? Come on, the four of us should watch it together!")
    }
    else if (sum >= 13 && sum < 20) {
        console.log("\nSora: ''Looks like the burnout is strong with this one. Hang in there buddy, \nyou've got this. Remember what you're working towards, you'll get over any \nobstacle that tries to hold you back, whether it's other people or \nunfortunate situations. We've got your back at all times, so \nhang in there buddy. Wanna get some grub in a bit? I'm feeling Chipotle today.''\n")
        console.log("Caihong: ''Ugh, that's the third time this week. I say we hit the dessert parlor down the road.''\n")
        console.log("Sora: ''You're gonna get fa-'' *Caihong slaps Sora* ''OWWWW!''\n")
        console.log("Rin: ''l-looks like th-they're at it again...*sigh*''\n")
    }
    else if (sum >= 20 && sum <= 25) {
        console.log("\nSora: ''Woah, that sounds pretty rough bro. Maybe we're not the right people \nqualified for something this serious, but let me tell you, it's not over yet.\nYou're way stronger than you might think, and we all got times where \nwe get in the dumps and it seems like we can't get out. You always \ngotta look ahead, no matter how dire the situation is.''")
        console.log("\nCaihong: ''Yup! For once, Sora said something smart! Guess you aren't totally dumb after all.''")
        console.log("\nSora: ''I don't wanna hear that from the person who thought Georgia was the most southern state on the East Coast.''")
        console.log("\nCaihong: I-I was just kidding! Everyone knows it's Rhodes Island.")
        console.log("\nSora: ...")
        console.log("\nRin: ...\n")
    }
}

function caihongResponse(sum) {
    if (sum >= 5 && sum < 13) {
        console.log("\nCaihong: ''Nah, I'd say you're worrying over nothing. Lets go shopping! \nThere's this huge sale at the mall right now, and I NEED someone to \nlook at outfits with me. Hey Rin, don't you wanna buy that new \ndress you were looking at? I saw you eyeing it on that magazine.''")
        console.log("\nRin: ''E-Ehh?? I-I don't know what you're t-talking about!''")
        console.log("\nSora: ''Looks like our funds are gonna be running low this month...\nplease keep supporting our service! My wallet depends on it...")
    }
    else if (sum >= 13 && sum < 20) {
        console.log("\nCaihong: ''Aw man, that sucks to hear. If it's something you don't wanna \ntalk about in detail with others, that's okay! We're totally fine with waiting \nuntil you're ready, if you wanna that is. I'll hold your hand \nthrough it no matter what!''")
        console.log("\nSora: ''Feel free to stop by soon, we've gotcha back bro.''\n")
    }
    else if (sum >= 20 && sum <= 25) {
        console.log("\nCaihong: ''Hey, hey, it's alright. I don't know what's gonna happen in the future, \nso it would irresponsible of me to make bold assumptions about whether \nthings are gonna be okay or not, heh, even I'll admit that much. \nBut that doesn't mean I won't do my best to support you. No matter how dark it might seem, \nor how narrow the tunnel looks, you can't just give up now. You've come \nso far! And I know you'll find a way through no matter what! I'll be \ncheering you own till the very end!''")
        console.log("\nRin: M-Maybe I can bring you something to drink! Do you want iced coffee or \nhot coffee? Or do you prefer tea instead?")
        console.log("\nCaihong: ''Oh! Iced coffee for me! What about you? Do you prefer cold or \nhot drinks to cheer you up?''\n")
    }
}

function rinResponse(sum) {
    if (sum >= 5 && sum < 13) {

    }
    else if (sum >= 13 && sum < 20) {

    }
    else if (sum >= 20 && sum <= 25) {
        
    }
}

function characterExists(c) {
    if (c == "Rin" || c == "Sora" || c == "Caihong")
        return true;
    else
        return false;
}

function chooseCharacter() {
    let characterChoice;
    do {
        characterChoice = prompt('Choose who you would like advice from? Sora, Caihong, or Rin? \n');
        if (characterExists(characterChoice) == false) {
            console.log("Rin: Uhm, who are you trying to ask? I-I don't know anyone of that name that works here...\n")
        }
    } while (characterExists(characterChoice) == false)
    return characterChoice;
}

function viewCharacters() {
    console.log("Here are the characters!");
    const r = prompt("Press enter to go back to the menu\n");
    choice();
}

function latest() {
    console.log("Here are this version's latest features!~\n");
    console.log("Our updates and new features will be made with our users' best interest in mind!");
    choice();
}

function aboutPage() {
    console.log("This is our about page!");
    const r = prompt("Press enter to go back to the menu\n");
    choice();
}

function feedback() {
    console.log("Thank you for your feedback!");
    const r = prompt("Press enter to go back to the menu\n");
    choice();
}

start();
