//-- Report Number: 7
//-- Report Title: Students at risk
//-- Business Question: What students are at risk of failling specific subjects//-- Why this report is useful: Allows a view on students which may require more assistance in tests
//-- Tables used: Student, Test, Test-Student

SELECT DISTINCT s.Student_ID, s.Forename, s.Surname 
FROM Student s 
JOIN Test_Student ts ON s.Student_ID = ts.Student_ID 
JOIN Test t ON ts.Test_ID = t.Test_ID WHERE ts.Score < t.Pass_Marks;

//-- Report Number: 8
//-- Report Title: Test pass rates
//-- Business Question: What is the most difficult test?
//-- Why this report is useful: Allows a view on test past rates
//-- Tables used: Test, Test-Student

SELECT t.Test_ID, t.Name, COUNT(ts.Score) AS Total_Pass_Fail, 100 * AVG( (CASE WHEN ts.Score > t.Pass_Marks THEN 1.0 ELSE 0.0 END) ) AS Percentage_Pass 
FROM Test t 
LEFT JOIN Test_Student ts ON t.Test_ID = ts.Test_ID 
GROUP BY t.Test_ID;

//-- Report Number: 9
//-- Report Title: Disability Gender Split
//-- Business Question: What disabilities are more common in what gender
//-- Why this report is useful: Allows the ability to view trends of disability development in students
//-- Tables used: Student, Disability, Student_Disability_Support

SELECT d.Disability_Name, s.Gender, COUNT(*) AS Total 
FROM Student s 
JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID 
JOIN Disability d ON sds.Disability_ID = d.Disability_ID 
GROUP BY d.Disability_Name, s.Gender ORDER BY d.Disability_Name, s.Gender;
