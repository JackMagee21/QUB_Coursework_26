const getAllTestsBasedOnSubject = (subjectId) => {
    const sql = `SELECT * FROM Test WHERE Subject_ID = ${escapeSql(subjectId)}`;
}


const AddTestResult = async (Student_ID, Test_ID, Grade, Pass_Fail) => {
    const sql = `INSERT INTO Test_Student (Student_ID, Test_ID, Grade, Pass_Fail) 
    VALUES (${Student_ID},${Test_ID},${Grade},${Pass_Fail})`;
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

getTestFromId = async (Test_ID) => {
    const sql = `SELECT Name FROM Test WHERE Test_ID = ${Test_ID}`;
    return await runQuery(sql);
}

