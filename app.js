const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [{
        type: 'checkbox',
        message: 'What type of employee would you like to add?',
        choices: ['Manager', 'Engineer', 'Intern'],
        name: 'role',
    },
    {
        type: 'input',
        message: 'What is the name of the employee?',
        name: 'name',
    },
    {
        type: "input",
        name: "id",
        message: "What is their id?"
    },
    {
        type: 'input',
        message: "What is the employee's email?",
        name: 'email',
    },
    {
        type: 'input',
        message: "What is the manager's office number?",
        name: 'officeNumber',
        when: (questions) => questions.role == "Manager"
    },
    {
        type: 'input',
        message: "What is this engineer's github user name?",
        name: 'github',
        when: (questions) => questions.role == "Engineer"
    },
    {
        type: 'input',
        message: "Where does the intern go to school?",
        name: 'school',
        when: (questions) => questions.role == "Intern"
    },
    {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "add",
    }
];

const employees = []

function init() {
    inquirer
        .prompt(questions)
        .then(response => {

            if (response.role == "Manager") {
                const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
                employees.push(manager)
            } else if (response.role == "Engineer") {
                const engineer = new Engineer(response.name, response.id, response.email, response.github);
                employees.push(engineer)
            } else if (response.role == "Intern") {
                const intern = new Intern(response.name, response.id, response.email, response.school);
                employees.push(intern)
            };
            if (response.add == true) {
                init();
            } else {
                fs.writeFile(outputPath, render(employees), (err) => err ? console.error(err) : console.log("Successfully generated"));
            }
        })
};

init();