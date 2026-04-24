const getAllDisabilityNamesFromStudentId = async (studentId) => {
    const sql = `SELECT d.Disability_Name FROM Disability d JOIN Student_Disability_Support sds ON d.Disability_ID = sds.Disability_ID WHERE sds.Student_ID = '${escapeSql(studentId)}'`;
    const result = await runQuery(sql);
    console.log(result.data);
    return result.data ?? [];
}