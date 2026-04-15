/*

    ==========
     REPORT 4
    ==========

~> Report name: Average Marks with and without Assistance

~> Purpose of this report: This report makes it really easy to see the difference in marks between students with and without assistance in terms of the
                            average mark per one, so teachers could maybe idenitfy which group needs help and to see if the difference in the average mark
                            of a assisted or non assisted student are close or far apart.

~> Business question: Are students with assitance keeping up with the rest of the class?

    ==========
     SQL used
    ==========
*/

-- This gets all students that have assistance
SELECT s.Student_ID, s.Forename, s.Surname, GROUP_CONCAT(DISTINCT a.Assistance_Name SEPARATOR ', ') 
AS Assistance_Name 
FROM Student s 
JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID 
JOIN Assistance a ON sds.Assistance_ID = a.Assistance_ID 
WHERE sds.Assistance_ID IS NOT NULL 
GROUP BY s.Student_ID, s.Forename, s.Surname


-- This gets all students that don't have assistance
SELECT s.Student_ID, s.Forename, s.Surname 
FROM Student s 
LEFT JOIN Student_Disability_Support sds 
ON s.Student_ID = sds.Student_ID 
WHERE sds.Student_ID IS NULL

-- Gets the test score based on the studentId
SELECT Student_ID, Score 
FROM Test_Student 
WHERE Student_ID = ${escapeSql(Student_ID)}

/*

    ==========
     REPORT 5
    ==========

~> Report name: Find an individual student repor

~> Purpose of this report: To make is as easy as possible to get a selected students scores, this makes it easy for a teacher to figure out what an individual
                            student strengths / weaknesses are and could possibly get the student help to improve in areas where that they are weak in

~> Business question: Which individual students are at risk of falling behind and could they
                       possibly need assistance put in place?

    ==========
     SQL used
    ==========
*/

-- Gets every student
SELECT * FROM Student;

-- This gets all students that have assistance
SELECT s.Student_ID, s.Forename, s.Surname, GROUP_CONCAT(DISTINCT a.Assistance_Name SEPARATOR ', ') 
AS Assistance_Name 
FROM Student s 
JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID 
JOIN Assistance a ON sds.Assistance_ID = a.Assistance_ID 
WHERE sds.Assistance_ID IS NOT NULL 
GROUP BY s.Student_ID, s.Forename, s.Surname


-- This gets all students that don't have assistance
SELECT s.Student_ID, s.Forename, s.Surname 
FROM Student s 
LEFT JOIN Student_Disability_Support sds 
ON s.Student_ID = sds.Student_ID 
WHERE sds.Student_ID IS NULL

-- Gets every test that a student has done
SELECT Test_ID, Score 
FROM Test_Student 
WHERE Student_ID = ${escapeSql(Student_ID)}

-- Gets the name of a test based on the testId
SELECT Name 
FROM Test 
WHERE Test_ID = ${Test_ID}

