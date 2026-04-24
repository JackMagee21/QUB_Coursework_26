const getEveryClassNoDups = async () => {
    const sql = 'SELECT DISTINCT Class_ID FROM Student_Class';
    const result = await runQuery(sql);
    return result;
}

const getNameOfAClass = async (Class_ID) => {
    const sql = `SELECT Class_Name FROM Class WHERE Class_ID = ${Class_ID}`;
    const result = await runQuery(sql);
    return result;
}

const getTestsBasedOnAClass = async (Class_ID) => {
    const sql = `SELECT Test_ID FROM Class_Test WHERE Class_ID = ${Class_ID}`;
    const result = await runQuery(sql);
    return result;
}

const getStudentsFromClass = async (Class_ID) => {
    const sql = `SELECT Student_ID FROM Student_Class WHERE Class_ID = ${Class_ID}`;
    const result = await runQuery(sql);
    return result;
}



const getAverageMarksOfAssistanceAndNonAssistance = async () => {
    const sql = `SELECT * FROM Performance_By_Assistance;`;
    const result = await runQuery(sql);
    return result;
}

const getStudentsWithAssistance = async () => {
    const sql = `SELECT DISTINCT s.Student_ID, s.Forename, s.Surname FROM Student s LEFT JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID WHERE sds.Assistance_ID IS NOT NULL ORDER BY s.Student_ID`;
    const result = await runQuery(sql);
    return result;
}

const getStudentsWithoutAssistance = async () => {
    const sql = `SELECT DISTINCT s.Student_ID, s.Forename, s.Surname FROM Student s LEFT JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID WHERE sds.Assistance_ID IS NULL ORDER BY s.Student_ID`;
    const result = await runQuery(sql);
    return result;
}

const getAllTestResultsForAStudent = async (Student_ID) => {
    const sql = `SELECT s.Student_ID, s.Forename, s.Surname, t.Name, ROUND(((ts.Score / t.Total_Marks) * 100), 2) AS Mark_Percent FROM Student s INNER JOIN Test_Student ts ON s.Student_ID = ts.Student_ID INNER JOIN Test t ON ts.Test_ID = t.Test_ID WHERE s.Student_ID = ${Student_ID};`;
    const result = await runQuery(sql);
    return result;
}

const getStudentTestsDataBasedOnAClass = async (Class_ID) => {
    const sql = `SELECT s.Student_ID, s.Forename, s.Surname, t.Name AS Test_Name, t.Test_ID, ts.Grade, CASE WHEN EXISTS (SELECT 1 FROM Student_Disability_Support sds WHERE sds.Student_ID = s.Student_ID AND sds.Assistance_ID IS NOT NULL) THEN 'True' ELSE 'False' END AS Has_Assistance FROM Student s INNER JOIN Test_Student ts ON s.Student_ID = ts.Student_ID INNER JOIN Test t ON ts.Test_ID = t.Test_ID INNER JOIN Class_Test c ON t.Test_ID = c.Test_ID WHERE c.Class_ID = ${Class_ID} ORDER BY t.Test_ID;`;
    const result = await runQuery(sql);
    return result;
}