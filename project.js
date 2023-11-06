//const e = require('express');

const spawner = require('child_process').spawn;
const prompt = require('prompt-sync')();

function start() {
    console.log("Welcome to the Virtual Character Advice Center! We appreciate you taking the time to use our service.")
    console.log("")

    //give user a list of choices
    choice()
    //user picks a character
    //user goes to a survey
        //total up results from survey and return a verdict back to this js file
    //based on the verdict, print a response based on the character they picked

}

function choice() {

let input;
    // do {
        console.log("What would you like to do?\n")
        console.log("1. Start describing your survey")
        console.log("2. View the characters")
        console.log("3. About/FAQ")
        console.log("4. Give us your feedback! (^w^)")
        console.log("5. Exit\n")

        input = prompt('What would you like to do? (Enter 1-5)');

        if (input == 1)
            conduct();
        else if (input == 2)
            viewCharacters();
        else if (input == 3)
            aboutPage();
        else if (input == 4)
            feedback();
        else if (input == 5) {
            console.log("Goodbye!")
        }
    // } while (input != 5)

}

async function conduct() {
    //const data_to_pass_in = 'Send this to python script.';

    //first ask to select a character
    let character = chooseCharacter();

    // loop through the number of questions

    let data_to_pass_in = 1 //question number

    let total = 0;
    let answer;

    for (let i = 1; i <= 5; i++) {
        // //console.log("Data sent to python script:", data_to_pass_in, character);
        // let python_process = spawner('python', ['./python.py', i, character]);
        // python_process.stdout.on('data', data => {
        //     console.log('Data received from python script:', data.toString());

        //     //the user enters their answer to each question
        //     console.log("1: No, 2: Not really, 3: Not sure, 4: Yeah kinda, 5: Yup\n")
        //     answer = prompt("")
        //     console.log("\n")
        // });

        let answer = await new Promise((resolve, reject) => {
            let python_process = spawner('python', ['./python.py', data_to_pass_in.toString(), character]);
            python_process.stdout.on('data', data => {
                console.log('Data received from python script:', data.toString());
                console.log('1: No, 2: Not really, 3: Not sure, 4: Yeah kinda, 5: Yup\n')
                let answer = prompt("");
                resolve(answer);
            });
        });

        total = total + parseInt(answer);
        data_to_pass_in++;
    }
    console.log(total);

    let again;

    console.log("Would you like to go back to the main menu?")
    again = prompt("");
    if (again == 'yes') {
        start();
    }
    else
        return;

    

    //console.log("Data sent to python script:", data_to_pass_in, character);

    // const python_process = spawner('python', ['./python.py', data_to_pass_in, character]);

    // python_process.stdout.on('data', data => {
    //     console.log('Data received from python script:', data.toString());
    // });
}

function chooseCharacter() {
    //set up characters here
    let characterChoice = prompt('Choose who you would like advice from: ');
    return characterChoice; 
}

function viewCharacters() {
    console.log("Here are the characters!")
}

function aboutPage() {
    console.log("This is our about page!")
}

function feedback() {
    console.log("Thank you for your feedback!")
}

start();