const inquirer = require("inquirer");
const db = require('./db/connection');
//const consoleTable = require('console.table');


const mainMenu = async () => {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "startMenu",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((response) => {
      let choice = response.startMenu;
      switch (choice) {
        case "view all departments":
          viewDepartments();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployee();
          break;
      }
    });
};

function viewDepartments() {
  db.promise().query(`SELECT department.* FROM department`)    
    .then(([ rows ]) => {
        console.table(rows)
        mainMenu();
    })
    .catch(err=> {
      console.log(err);
    }); 
  };

function viewRoles() {
  db.promise().query(`SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id`)    
    .then(([ rows ]) => {
        console.table(rows)
        mainMenu();
    })
    .catch(err=> {
      console.log(err);
    }); 
  };

function viewEmployees() {
  db.promise().query(`SELECT employee.*, role.title, role.salary, department.name 
                      FROM employee  
                      LEFT JOIN role 
                      ON employee.role_id = role.id 
                      LEFT JOIN department 
                      ON employee.department_id = department.id`)    
    .then(([ rows ]) => {
        console.table(rows)
        mainMenu();
    })
    .catch(err=> {
      console.log(err);
    }); 
  };

function addDepartment() {
  return inquirer
    .prompt([
      {
        type: "text",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((response) => {
      const res = response.department;
      db.promise()
        .query(`INSERT INTO department (name) VALUES (?)`, [res])
        .then(([rows]) => {
          console.log(`added ${res} department`);
          mainMenu();
        })
        .catch((err) => {
          console.log(err);
        });
    });
}

function addRole() {
  return inquirer
    .prompt([
      {
        type: "text",
        name: "role",
        message: "What is the title of the role?",
      },
    ])
    .then((response) => {
      const res = response.role;
      db.promise()
        .query(`INSERT INTO role (title) VALUES (?)`, [res])
        .then(([rows]) => {
          console.log(`added ${res} role`);
          mainMenu();
        })
        .catch((err) => {
          console.log(err);
        });
    });
}

mainMenu();

// // add employee
// // const sql = `INSERT INTO employee (first_name, last_name, manager)
// //              VALUES (?,?,?)`;

// // db.query(sql, (err, resolve, reject) => {
// //     if (err) {
// //         reject(err);
// //         return;
// //     }

// //     resolve({
// //         ok: true,
// //         message: "employee added successfully"
// //     });
// // })

// // update employee role
// // const sql = `UPDATE employee SET role_id =?
// //              WHERE id = ?`;

// // db.query(sql, (err, resolve, reject) => {
// //     if (err) {
// //         reject(err);
// //         return;
// //     }

// //     resolve({
// //         ok: true,
// //         message: "employee role updated successfully"
// //     });
// // })
