const inquirer = require('inquirer');

const initQuestion = 
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'view all employees', 'Add a department', 'Add a role', 'Add an emplopyee', 'update an employee role'],
        name: 'firstChoice'
    }

function handleAnswers(answers) {
    // switch statement to either run a query or prompt with more questions
    const selectedAnswer = answers.firstChoice

    switch (selectedAnswer) {
        case 'View all departments': 
        // query for all departments
        

    }

};

inquirer
    .prompt(questions)
    .then(handleAnswers(answers));