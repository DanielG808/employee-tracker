const inquirer = require("inquirer");
const db = require("./db/db");

// Queries

// query for all departments
const departmentsQuery = () =>
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    init();
  });

// query for all roles
const rolesQuery = () =>
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    init();
  });

// query for all employees
const employeesQuery = () =>
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    init();
  });

// query to add employee
const addDepartment = () => {
  const question = {
    type: "input",
    message: "What is the name of the new department?",
    name: "departmentName",
  };

  inquirer.prompt(question).then((answer) => {
    console.log(answer);
    db.query(
      `INSERT INTO department (name) VALUES (?)`,
      answer.departmentName,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        departmentsQuery();
      }
    );
  });
};

// query to add role
const addRole = () => {
  const questions = [
    {
      type: "input",
      message: "What is the name of the new role?",
      name: "roleName",
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "roleSalary",
    },
  ];

  inquirer.prompt(questions).then((answer) => {
    console.log(answer);
    db.query(
      `INSERT INTO role (name) VALUES (?, ?, ?)`,
      (answer.roleName, answer.roleSalary, answer.department_id),
      (err, result) => {
        if (err) {
          console.log(err);
        }
        rolesQuery();
      }
    );
  });
};

const initQuestion = {
  type: "list",
  message: "What would you like to do?",
  choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an emplopyee",
    "Update an employee role",
  ],
  name: "firstChoice",
};

function handleAnswers(answers) {
  // switch statement to either run a query or prompt with more questions
  const selectedAnswer = answers.firstChoice;

  // console.log(selectedAnswer);
  switch (selectedAnswer) {
    case "View all departments":
      departmentsQuery();
      break;
    case "View all roles":
      rolesQuery();
      break;
    case "View all employees":
      employeesQuery();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
  }
}

function init() {
  inquirer.prompt(initQuestion).then((answers) => handleAnswers(answers));
}

init();
