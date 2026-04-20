/*
REPORT 1: Average Grade by Disability type.

This report helps to identify whether there are certain disability types which are underperforming.  This would allow for more tageted support to be given to thoose who need it
*/

SELECT AVG((ts.Score / t.Total_Marks) * 100) AS Grade, d.Disability_Type 
FROM Student s 
JOIN Test_Student ts ON ts.Student_ID = s.Student_ID 
JOIN Test t ON t.Test_ID = ts.Test_ID 
JOIN Student_Disability_Support sds ON sds.Student_ID = s.Student_ID 
JOIN Disability d ON d.Disability_ID = sds.Disability_ID 
GROUP BY d.Disability_Type;

/*
Report 2: Number of students with each disability type.

This report helps to identify if staff should be trained to support certain disability types more than others.
*/

SELECT COUNT(s.Student_ID) AS numStudents, COALESCE(d.Disability_Type, 'None') AS Disability 
FROM Student s 
LEFT JOIN Student_Disability_Support sds ON sds.Student_ID = s.Student_ID 
LEFT JOIN Disability d ON sds.Disability_ID = d.Disability_ID 
GROUP BY Disability;

/*
Report 3: Grade distribution for each test.

This report will help to identify if there are certain tests which students are struggling with.  This would allow for more support to be given to students in those areas, and also for the tests to be reviewed to see if they are fair and appropriate.
*/

SELECT t.Test_ID, t.Name, MIN(ts.Score) AS minGrade, MAX(ts.Score) AS maxGrade, AVG(ts.Score) AS avgGrade, t.Total_Marks 
FROM Test t 
LEFT JOIN Test_Student ts ON t.Test_ID = ts.Test_ID 
GROUP BY t.Test_ID;
