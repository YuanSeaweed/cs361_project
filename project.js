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

        //console.log(character + " will be asking you questions.");

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
            console.log("Sora: ''Who's that? The only ones who work here are me, Caihong, or Rin.'' \nCaihong: ''Eh? Don't tell me you already forget our names?''\n")
        }
    } while (characterExists(askAnother) == false)

    do {
        console.log("Would you like to go back to the main menu? 'yes' or 'no'");
        again = prompt("");
        if (again == 'yes') {
            start();
        } 
        else if (again == 'no') {
            console.log("Caihong: ''Let's hang out again soon!''")
            console.log("Sora: ''Cya!''")
            console.log("Rin: ''S-See you later!...''")
            return;
        }
    } while (again != 'yes');
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
        console.log()
        console.log("\nSora: ''Sounds like you should talk about this to your friends \n and taking a day to relax. Go out and have some fun bro, \nI sometimes visit parks to take my mind off things, go for a jog there \nwhile I'm at it. You'll get better soon buddy, don't worry about it.\n");
        console.log()
        console.log("\nCaihong: Wanna see that new Shinkai film coming out in two days? \nCome on, the four of us should watch it together!")
    }
    else if (sum >= 13 && sum < 20) {
        console.log("\nSora: ''Looks like the burnout is strong with this one. Hang in there buddy, \nyou've got this. Remember what you're working towards, you'll get over any \nobstacle that tries to hold you back, whether it's other people or \nunfortunate situations. We've got your back at all times, so \nhang in there buddy. Wanna get some grub in a bit? I'm feeling Chipotle today.''")
        console.log("\nCaihong: ''Ugh, that's the third time this week. I say we hit the dessert parlor down the road.''")
        console.log("\nSora: ''You're gonna get fa-'' *Caihong slaps Sora* ''OW!''")
        console.log("\nRin: ''l-looks like th-they're at it again...*sigh*''\n")
    }
    else if (sum >= 20 && sum <= 25) {
        console.log("\n\nSora: ''Woah, that sounds pretty rough bro. Maybe we're not the right people \nqualified for something this serious, but let me tell you, it's not over yet.\nYou're way stronger than you might think, and we all got times where \nwe get in the dumps and it seems like we can't get out. You always \ngotta look ahead, no matter how dire the situation is.''")
        console.log("\n\nCaihong: ''Yup! For once, Sora said something smart! Guess you aren't totally dumb after all.''")
        console.log("\n\nSora: ''I don't wanna hear that from the person who thought Georgia was the \nmost southern state on the East Coast.''")
        console.log("\n\nCaihong: I-I was just kidding! Everyone knows the most southern state is Rhodes Island.")
        console.log("\n\nSora: ...")
        console.log("\n\nRin: ...\n")
    }
}

function caihongResponse(sum) {
    if (sum >= 5 && sum < 13) {
        console.log("\n\nCaihong: ''Nah, I'd say you're worrying over nothing. Lets go shopping! \nThere's this huge sale at the mall right now, and I NEED someone to \nlook at outfits with me. Hey Rin, don't you wanna buy that new \ndress you were looking at? I saw you eyeing it on that magazine.''")
        console.log("\n\nRin: ''E-Ehh?? I-I don't know what you're t-talking about!''")
        console.log("\n\nSora: ''Looks like our funds are gonna be running low this month...\nplease keep supporting our service! My wallet depends on it...")
    }
    else if (sum >= 13 && sum < 20) {
        console.log("\n\nCaihong: ''Aw man, that sucks to hear. If it's something you don't wanna \ntalk about in detail with others, that's okay! We're totally fine with waiting \nuntil you're ready, if you wanna that is. I'll hold your hand \nthrough it no matter what!''")
        console.log("\n\nSora: ''Stop by again soon, okay?''\n")
    }
    else if (sum >= 20 && sum <= 25) {
        console.log("\n\nCaihong: ''Hey, hey, it's alright. I don't know what's gonna happen in the future, \nso it would irresponsible of me to make bold assumptions about whether \nthings are gonna be okay or not, heh, even I'll admit that much. \nBut that doesn't mean I won't do my best to support you. No matter how dark it might seem, \nor how narrow the tunnel looks, you can't just give up now. You've come \nso far! And I know you'll find a way through no matter what! I'll be \ncheering you own till the very end!''")
        console.log("\n\nRin: M-Maybe I can bring you something to drink! Do you want iced coffee or \nhot coffee? Or do you prefer tea instead?")
        console.log("\n\nCaihong: ''Oh! Iced coffee for me! What about you? Do you prefer cold or \nhot drinks to cheer you up?''\n")
    }
}

function rinResponse(sum) {
    if (sum >= 5 && sum < 13) {
        console.log("\nRin: ''O-Oh, I-I see. You sh-shouldn't worry that much about it. \nI-I understand your concerns, but you might just be tired from work or schoolwork. \nO-Or maybe there's another outside factor th-that's hindering you right now. \nOh! I-I didn't mean that your feelings aren't validated, I'm so sorry if I came across th-that way...\nW-Would you be willing to have tea with me later? I-I'll make sure prepare \nan extra special blend for us, so you can fully recharge your mind. W-We can talk \nm-more about your troubles while we drink!")
    }
    else if (sum >= 13 && sum < 20) {
        console.log("\nRin: ''H-Here, you should take this. W-What? Come on, don't look at \nme like that. Plushies are a t-totally normal thing to have, even for adults. \nTry holding onto it for a while, it'll make you feel better, I promise. I know \nwhat it's like when you've hit a wall in life, and you have no idea what to do. No matter what you do, \nyou just can't find a solution. B-But, please hear me out. I-I was able to \nbe strong enough to overcome a lot of things, and you're just as strong as I am! \nP-Please never forget that!")
        console.log("\nCaihong: ''*whispering behind her* You can do this Rin, let's goooo!!!''")
        console.log("\nRin: ''E-Eh!?! Caihong?! How long have you been listening?!''")
    }
    else if (sum >= 20 && sum <= 25) {
        console.log("\nRin: ''Listening to you made me realize some things that I'm sure me \nand a lot of people would never be able to fully understand. But always \nremember, you can't give up! Please don't blame yourself for anything, even if you \nthink it's your own fault. Acknowledging our mistakes is one thing, but self-love is \nreally important too! And if you don't realize that, then at least, know that you are capable \nof being loved! Whether it's me, Caihong, or Sora, we'll always be there with you! \nRemember that!''")
        console.log("\nCaihong: ''Holy cow, she didn't even stutter once. You heard her right though, user. We always gotcha back!''")
        console.log("\nSora: ''Yup, Rin's right. Hang in there bro.''")
        console.log("\nRin: ''H-Hey!! Y-You guys don't have to listen so closely!''")
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
        characterChoice = prompt('Choose who you would like advice from: ');
        if (characterExists(characterChoice) == false) {
            console.log("Rin: Uhm, who are you trying to ask? I-I don't know anyone of that name that works here...\n")
        }
        else {
            characterWelcome(characterChoice);
        }
    } while (characterExists(characterChoice) == false)
    return characterChoice;
}

function characterWelcome(c) {
    if (c == "Sora") {
        console.log("Sora: ''Yo, how's it going? Tell me what's been happening.'' ")
    }
    else if (c == "Caihong") {
        console.log("Caihong: ''Heeeeyyyy, come here! Lay it on me, I wanna hear everything you wanna say.''")
    }
    else if (c == "Rin") {
        console.log("Rin: ''U-Uhm, Thank you for choosing m-me. I-I'll do my best in hearing you out...''")
    }

}

function viewCharacters() {
    console.log("Here are the characters!\n");
    console.log("[Sora Takeuchi]\nA 20-year old engineering student who tends to value companionship over rulesets. \nHe's always going out during weekends and tries to make time for everyone. \nThrough thick and thin, a lot of his friends say that Sora is truly a dependable man, \nand looks out for them when they get into trouble. He enjoys sports, video games, \nwatching movies, and photography. Sora works part-time as a swim instructor and \nat the Virtual Character Advice Center\n")
    console.log("[Caihong Li]\nA 20-year old medical student with an outgoing mindset and bright personality. \nShe's almost always seen with at least a few other close friends out shopping or eating \nat dessert parlors. Caihong often claims she's ''free-spirited'' and does whatever she \nsets her mind to, but even her close friends say that she can be easily persuaded \nby rumors. One time, Sora convinced her that cough medicine was \nmade of wine as a joke, and she ended up thinking she was just hungover for two weeks. \nCaihong is the vocalist for a band and works at the Virtual Character Advice Center.\n")
    console.log("[Rin Gotou]\nA 19-year old chemistry student who's shy but mindful to situations. \nUnlike Sora or Caihong, Rin is a lot more reserved, but that has allowed \nher to gain a perspective and offer advice that many people would do well to listen to. \nAs opposed to her introverted self, Rin is actually a huge fan of martial arts films and \ntheatrical performances. She's often seen in cafes memorizing scripts, beaverage \nrecipes, and analyzing karate, kung-fu, and akido practices. Rin works part-time \nas a barista and at the Virtual Character Advice Center.\n")
    const r = prompt("Press enter to go back to the menu\n");
    choice();
}

function latest() {
    console.log("Here are this version's latest features!~\n");
    console.log("Our updates and new features will be made with our users' best interest in mind!");
    console.log("Version 1.0 --- 12/10/2023");
    console.log(" - Added three characters! Please welcome Sora Takeuchi, Caihong Li, and Rin Gotou!")
    console.log(" - Please use the given features to learn more about the Virtual Character Advice Center!")
    console.log(" - Leave your suggestions in the feedback form as well! We look forward to hearing it!")
    choice();
}

function aboutPage() {
    console.log("This is our about page!");
    console.log("Program Author: Zhi Liang")
    console.log("Survey Microservice Developer: Jonathan Pham")
    console.log("")
    const r = prompt("Press enter to go back to the menu\n");
    choice();
}

function feedback() {
    console.log("Please enter any comments or suggestions in the command line!\n")
    let feedback = prompt("");
    feedback = feedback + '\n';

    fs.writeFile('feedback.txt', feedback, (err) => {
        if (err) {
            console.error('Error writing to feedback.txt:', err);
            return;
        }
    });

    console.log("Thank you for your feedback!");
    const r = prompt("Press enter to go back to the menu\n");
    choice();
}

start();
