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
    viewDeps();
    viewRole();
    viewEmploy();
});

function viewDeps() {
    const query = `SELECT * FROM department;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE DEPARTMENTs');
        console.log('\n');
        console.table(res);

    });
}

function viewRole() {
    const query = `SELECT * FROM role;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ROLES OF EMPLOYEES');
        console.log('\n');
        console.table(res);

    });
}
function viewEmploy() {
    const query = `SELECT * FROM employee;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);

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


// prompts 
//     View
//         Employees / managers
//         Department / roles
//     Add
//         Employee / managers
//         department / role
//     Update
//         Employees / managers
//         Department / roles   

//         use case/switch to prompt and act

