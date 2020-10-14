DROP database employees_db;
CREATE database employees_db;
USE employees_db;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30)
);

CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT 
);

CREATE TABLE employee(
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT 
);

INSERT INTO department ( name )
VALUE ("INFIELD") , ("OUTFIELD") , ("PITCHER") , ("COACHING" );

INSERT INTO role ( title , salary , department_id )
VALUE ( "FirstBase" , 60000 , 1 ) , ( "ShortStop" , 90000 , 1 ) , ( "CenterField" , 70000 , 2 ) , ( "RightField" , 400000 , 2 )
 , ( "StartingP" , 100000 , 3 ) , ( "ClosingP" , 80000 , 3 ) , ( "BenchCoach" , 50000 , 4 ) , ( "Manager" , 110000 , 4 );

INSERT INTO employee ( first_name , last_name , role_id , manager_id )
VALUE ( "Wally" , "Joyner" , 1 , NULL ) , ( "Chris" , "Gomez" , 2 , NULL ) , 
( "Steve" , "Finley" , 3 , NULL ) , ( "Tony" , "Gwynn" , 4 , NULL ) ,
( "Kevin" , "Brown" , 5 , NULL ) , ( "Trevor" , "Hoffman" , 6 , NULL ) ,
( "Mark" , "Grant" , 7 , NULL ) , ( "Bruce" , "Bochy" , 8 , 98 ) ;