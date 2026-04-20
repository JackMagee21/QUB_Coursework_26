const getAllTestsBasedOnSubject = (subjectId) => {
    const sql = `SELECT * FROM Test WHERE Subject_ID = ${escapeSql(subjectId)}`;
}


const AddTestResult = async (Student_ID, Test_ID, Score, Grade) => {
    const sql = `INSERT INTO Test_Student (Student_ID, Test_ID, Score, Grade) 
    VALUES (${Student_ID},${Test_ID},${Score},'${Grade}' ) `;
    return await runQuery(sql);
}


const getAllTestIdsBasedOnStudent = (Student_ID) => {
    const sql = `SELECT Test_ID, Score FROM Test_Student WHERE Student_ID = ${escapeSql(Student_ID)}`;
    return runQuery(sql);
}



const getStudentMarksForTest = async (Student_ID) => {
    const sql = `SELECT Student_ID, Score FROM Test_Student WHERE Student_ID = ${escapeSql(Student_ID)}`;
    return await runQuery(sql);
}

const getTestFromId = async (Test_ID) => {
    const sql = `SELECT Name FROM Test WHERE Test_ID = ${Test_ID}`;
    const result = await runQuery(sql);
    return result;
}

const getTestGrade = async (Test_ID) => {
    const sql = `SELECT Grade from Test_Student WHERE Test_ID = ${Test_ID}`;
    const result = await runQuery(sql);
    return result;
}

const getGradeOfATestForAStudent = async (Class_ID, Student_ID, Test_ID) => {
    const sql = `SELECT c.Class_Name, t.Name AS Test_Name, ts.Score, ts.Grade FROM Test_Student ts JOIN Student s ON ts.Student_ID = s.Student_ID JOIN Test t ON ts.Test_ID = t.Test_ID JOIN Class_Test ct ON t.Test_ID = ct.Test_ID JOIN Class c ON ct.Class_ID = c.Class_ID JOIN Student_Class sc ON c.Class_ID = sc.Class_ID AND sc.Student_ID = s.Student_ID WHERE ts.Student_ID = ${Student_ID} AND c.Class_ID = ${Class_ID} AND t.Test_ID = ${Test_ID};`;
    const result = await runQuery(sql);
    return result;
}
