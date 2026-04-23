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


SELECT 
CASE WHEN sds.Assistance_ID IS NOT NULL THEN 'True'
ELSE 'False' END AS Has_Assistance,
ROUND (AVG((ts.Score / t.Total_Marks)), 2) AS Average_Mark,
ROUND(AVG((ts.Score / t.Total_Marks) * 100), 2) AS Average_Mark_As_Precentage
FROM Student s 
INNER JOIN Test_Student ts ON s.Student_ID = ts.Student_ID
INNER JOIN Test t ON ts.Test_ID = t.Test_ID
LEFT JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID
GROUP BY Has_Assistance



/*

    ==========
     REPORT 5
    ==========

~> Report name: Find an individual student report

~> Purpose of this report: To make is as easy as possible to get a selected students scores, this makes it easy for a teacher to figure out what an individual
                            student strengths / weaknesses are and could possibly get the student help to improve in areas where that they are weak in

~> Business question: Which individual students are at risk of falling behind and could they
                       possibly need assistance put in place?

    ==========
     SQL used
    ==========
*/


/* These two querys is for the filters */
-- Students with disabilities
SELECT DISTINCT s.Student_ID, s.Forename, s.Surname
FROM Student s 
LEFT JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID
WHERE sds.Assistance_ID IS NOT NULL
ORDER BY s.Student_ID

-- Students without disabilities
SELECT DISTINCT s.Student_ID, s.Forename, s.Surname
FROM Student s
LEFT JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID
WHERE sds.Assistance_ID IS NULL
ORDER BY s.Student_ID

/* Students marks */
/* Student_ID = 3 is an example of the query, that '3' would 
    be replaced with the selected Student_ID */
SELECT s.Student_ID, s.Forename, s.Surname, t.Name,
ROUND(((ts.Score / t.Total_Marks) * 100), 2) AS Mark_Percent
FROM Student s
INNER JOIN Test_Student ts ON s.Student_ID = ts.Student_ID
INNER JOIN Test t ON ts.Test_ID = t.Test_ID
WHERE s.Student_ID = 3;

/*


    ==========
     REPORT 6
    ==========

~> Report name: Find a selected class-test grades

~> Purpose of this report: To look at the grades of each test in a class and identify which tests maybe easier, harder and also to see which students are 
                            struggling or not



    ==========
     SQL Used 
    ==========
*/

SELECT s.Student_ID, s.Forename, s.Surname, t.Name AS Test_Name, t.Test_ID, ts.Grade, 
CASE WHEN EXISTS (SELECT 1 FROM Student_Disability_Support sds WHERE sds.Student_ID = s.Student_ID AND sds.Assistance_ID IS NOT NULL)
THEN 'True' ELSE 'False' END AS Has_Assistance 
FROM Student s 
INNER JOIN Test_Student ts ON s.Student_ID = ts.Student_ID 
INNER JOIN Test t ON ts.Test_ID = t.Test_ID 
INNER JOIN Class_Test c ON t.Test_ID = c.Test_ID 
WHERE c.Class_ID = ${Class_ID} 
ORDER BY t.Test_ID;



