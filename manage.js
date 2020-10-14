const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employees_db",
});
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId + "\n");
    // viewDeps();
    // viewRole();
    // viewEmploy();
    start();
});

function start() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "How would you like to proceed?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Departments",
            "Add Roles",
            "Add Employees",
            "Update Roles",
            "Exit, Instead",
        ]
    }).then(answer => {
        // console.log('answer', answer);
        switch (answer.choice) {
            case "View Departments":
                viewDeps();
                break;
            case "View Roles":
                viewRole();
                break;
            case "View Employees":
                viewEmploy();
                break;



            case "Exit, Instead":
                connection.end();
                break;
        }
    });
}



function viewDeps() {
    const query = `SELECT * FROM department;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE DEPARTMENTs');
        console.log('\n');
        console.table(res);
        start();
    });
}

function viewRole() {
    const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS position
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ROLES OF EMPLOYEES');
        console.log('\n');
        console.table(res);
        start();
    });
}
function viewEmploy() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS position, role.salary, employee.manager_id
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        start();
    });

}
// function viewDeps() {
//     const query = `SELECT * FROM department;`
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW EMPLOYEE BY DEPARTMENT');
//         console.log('\n');
//         console.table(res);

//     });
// }




