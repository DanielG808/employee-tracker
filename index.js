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
    {
      type: "input",
      message: "What is the department id for this role?",
      name: "department_id",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${answers.roleName}", ${answers.roleSalary}, ${answers.department_id})`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        rolesQuery();
      }
    );
  });
};

// query to add employee
const addEmployee = () => {
  const questions = [
    {
      type: "input",
      message: "What is the first name of the new employee?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is the last name of the new employee?",
      name: "last_name",
    },
    {
      type: "input",
      message: "What is the role id for this employee?",
      name: "role_id",
    },
    {
      type: "input",
      message: "What is the manager id for this employee?",
      name: "manager_id",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role_id}, ${answers.manager_id})`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        employeesQuery();
      }
    );
  });
};

const updateEmployeeRole = () => {
  const questions = [
    {
      type: "input",
      message: "What is the id of the employee?",
      name: "employee_id",
    },
    {
      type: "input",
      message: "What is the new role id for the employee?",
      name: "role_id",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    db.query(
      `UPDATE employee SET role_id = ${answers.role_id} WHERE id = ${answers.employee_id}`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        employeesQuery();
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
    "Add an employee",
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
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee role":
      updateEmployeeRole();
      break;
  }
}

function init() {
  inquirer.prompt(initQuestion).then((answers) => handleAnswers(answers));
}

init();
