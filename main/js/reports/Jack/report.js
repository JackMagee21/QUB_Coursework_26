const getAllStudentsWithAssistance = async () => {
    const sql = `SELECT s.Student_ID, s.Forename, s.Surname, a.Assistance_Name FROM Student s JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID JOIN Assistance a ON sds.Assistance_ID = a.Assistance_ID WHERE sds.Assistance_ID IS NOT NULL`;
    const result = await runQuery(sql);
    return result;
}

const getAllStudentsWithoutAsssitance = async () => {
    const sql = `SELECT s.Student_ID, s.Forename, s.Surname, a.Assistance_Name FROM Student s JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID JOIN Assistance a ON sds.Assistance_ID = a.Assistance_ID WHERE sds.Assistance_ID IS NULL`;
    const result = await runQuery(sql);
    return result;
}

const getAllStudentsWithAssistanceNoDups = async () => {
    const sql = `SELECT s.Student_ID, s.Forename, s.Surname, GROUP_CONCAT(DISTINCT a.Assistance_Name SEPARATOR ', ') AS Assistance_Name FROM Student s JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID JOIN Assistance a ON sds.Assistance_ID = a.Assistance_ID WHERE sds.Assistance_ID IS NOT NULL GROUP BY s.Student_ID, s.Forename, s.Surname`;
    const result = await runQuery(sql);
    return result;
}