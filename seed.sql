INSERT INTO department ( name )
VALUE ("INFIELD") , ("OUTFIELD") , ("PITCHER") , ("COACHING" );

INSERT INTO role ( title , salary , department_id )
VALUE ( "FirstBase" , 60000 , 1 ) , ( "ShortStop" , 90000 , 1 ) , ( "CenterField" , 70000 , 2 ) , ( "RightField" , 400000 , 2 )
 , ( "StartingP" , 100000 , 3 ) , ( "ClosingP" , 80000 , 3 ) , ( "BenchCoach" , 50000 , 4 ) , ( "Manager" , 110000 , 4 );

INSERT INTO employee ( first_name , last_name , role_id , manager_id )
VALUE ( "Wally" , "Joyner" , 1 , 8 ) , ( "Chris" , "Gomez" , 2 , 8 ) , 
( "Steve" , "Finley" , 3 , 8 ) , ( "Tony" , "Gwynn" , 4 , NULL ) ,
( "Kevin" , "Brown" , 5 , 8 ) , ( "Trevor" , "Hoffman" , 6 , 8 ) ,
( "Mark" , "Grant" , 7 , 8 ) , ( "Bruce" , "Bochy" , 8 , NULL ) ;
 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;