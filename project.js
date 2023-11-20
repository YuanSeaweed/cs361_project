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

    // Write the character's name to a file
    fs.writeFile('char.txt', character, (err) => {
        if (err) {
            console.error('Error writing to char.txt:', err);
            return;
        }

        console.log(character + " will be asking you questions!");

        // Wait for the user to answer questions in the microservice
        waitForResult();
    });
}

function waitForResult() {
    let resultExists = false;

    do {
        let wait = prompt("Please answer the questions on the survey!");

        if (fs.existsSync("result.txt")) {
            console.log("The file from the python script exists!");
            resultExists = true;
        }
    } while (!resultExists);

    //give the user a response. 
    if (fs.existsSync("char.txt")) {
        // Delete the file
        fs.unlinkSync("char.txt");
        console.log(`File char.txt deleted successfully.`);
    } else {
        console.log(`File char.txt does not exist.`);
    }

    let again;
    let askAnother;
    console.log("Would you like to ask someone else? Enter their name or 'no' if not.");
    askAnother = prompt("");
    if (characterExists(askAnother) == true) {
        // print a new response
    }

    console.log("Would you like to go back to the main menu? Enter 'yes' if you want.");
    again = prompt("");
    if (again == 'yes') {
        start();
    } else {
        return;
    }
}

function characterExists(c) {
    // if c exists
    return;
}

function chooseCharacter() {
    let characterChoice = prompt('Choose who you would like advice from: ');
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
