const inquirer = require('inquirer');

const initQuestion = 
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an emplopyee', 'Update an employee role'],
        name: 'firstChoice'
    }

function handleAnswers(answers) {
    // switch statement to either run a query or prompt with more questions
    const selectedAnswer = answers.firstChoice

    switch (selectedAnswer) {
        case 'View all departments': 
        // query for all departments
        break;
        case 'View all roles':
        // query for all roles
        break;
        case 'View all employees':
        // query for all employees
        break;
        case 'Add a department':
        // query for all roles
        break;
    }
    };

inquirer
    .prompt(questions)
    .then(handleAnswers(answers));