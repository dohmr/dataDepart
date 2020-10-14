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
    // updateRole();
    // addDeps();
    // addEmploy();
    start();
});

function start() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "How would you like to proceed?",
        choices: [
            "View Departments",
            "View Positions",
            "View Employees",
            "Add Departments",
            "Add Roles",
            "Add Employee",
            "Update Position",
            "Exit, Instead",
        ]
    }).then(answer => {
        // console.log('answer', answer);
        switch (answer.choice) {
            case "View Departments":
                viewDeps();
                break;
            case "View Positions":
                viewRole();
                break;
            case "View Employees":
                viewEmploy();
                break;
            case "Add Departments":
                addDeps();
                break;
            case "Add Employee":
                addEmploy();
                break;
            case "Update Position":
                updateRole();
                break;



            case "Exit, Instead":
                connection.end();
                break;
        }
    });
}

function viewOnlyDeps() {
    const query = `SELECT * FROM department`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW DEPARTMENTs');
        console.log('\n');
        console.table(res);
        start();
    });
}

function viewDeps() {
    const query = `SELECT department.name AS department, role.title as position, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE by DEPARTMENTs');
        console.log('\n');
        console.table(res);
        start();
    });
}

function viewRole() {
    const query = `SELECT role.title as position, employee.id, employee.first_name, employee.last_name, department.name AS department
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
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title as position, department.name AS department, role.salary, employee.manager_id
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
function updateRole() {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, result) => {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "employeeName",
                type: "list",
                message: "Which Employee?",
                choices: function () {
                    employeeArray = [];
                    result.forEach(result => {
                        employeeArray.push(result.last_name);
                    })
                    return employeeArray;
                }
            }
        ]).then(function (answer) {
            console.log('\n');
            console.log(answer);
            const name = answer.employeeName;
            const query = "SELECT * FROM role";
            connection.query(query, (err, res) => {
                inquirer.prompt([
                    {
                        name: "role",
                        type: "list",
                        message: "Change Position?",
                        choices: () => {
                            rolesArray = [];
                            res.forEach(res => {
                                rolesArray.push(res.title)
                            })
                            return rolesArray;
                        }
                    }
                ]).then(function (rolesAnswer) {
                    const role = rolesAnswer.role;
                    console.log('\n');
                    console.log(rolesAnswer.role);
                    const query = 'SELECT * FROM role WHERE title = ?';
                    connection.query(query, [role], (err, res) => {
                        if (err) throw (err);
                        let roleId = res[0].id;
                        let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                        let values = [roleId, name]
                        console.log('\n');
                        console.log(values);
                        connection.query(query, values,
                            function (err, res, fields) {
                                console.log('\n');
                                console.log(`You have updated ${name}'s position to ${role}.`)
                            })
                        viewEmploy();
                    })
                })
            })
        })
    })
}

function addDeps() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "What is the name of the new department?",
    })
        .then((answer) => {
            const query = "INSERT INTO department (name) VALUE (?) ";
            connection.query(query, answer.department, (err, res) => {
                console.log(res);
                console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
            })
            viewOnlyDeps();
        })
}

async function addEmploy() {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, answer) => {
        if (err) throw (err);
        inquirer.prompt([{
            type: "input",
            name: "first",
            message: "Add a First Name.",
        }, {
            type: "input",
            name: "last",
            message: "Add a First Name.",
        }, {
            type: "position",
            name: "role",
            message: "Add a First Name.",
            choices:
                () => {
                    let positions = [];
                    answer.forEach(answer => {
                        positions.push(answer.title);
                    })
                    return positions;
                }
        }
        ]).then((answer) => {
            const position = answer.position;
            const query = 'SELECT * FROM role';
            connection.query(query, (err, res) => {
                if (err) throw (err);
                const filter = res.filter((res) => {
                    return res.title == position;
                })
            })
        })
    })
}




