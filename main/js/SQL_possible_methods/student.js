
/*
Adding students, editting sudents and deleteing student methods
*/
const addStudentToTable = (student) => {
    const sql = `
        INSERT INTO student (firstName, lastName, dob, email, emergencyContact)
        VALUES (
            '${escapeSql(student.firstName)}', 
            '${escapeSql(student.lastName)}', 
            '${escapeSql(student.dob)}', 
            '${escapeSql(student.email)}', 
            '${escapeSql(student.emergencyContact)}'
        )
    `;

    /*
    Update this hopefully to fit the outcome of the database ( will change )
    */

    return runQuery(sql);
}

const deleteStudentFromTable = (studentId) => {
    
    const sql = `
        DELETE FROM student WHERE Student_ID='${escapeSql(studentId)}' 
    `;

    return runQuery(sql);
}

const editStudentFromTable = (studentId, newStudentRecords) => {
    
    const sql = `
        UPDATE student 
        SET
        firstName = '${escapeSql(newStudentRecords.firstName)}',
        lastName = '${escapeSql(newStudentRecords.lastName)}',
        dob = '${escapeSql(newStudentRecords.dob)}',
        email = '${escapeSql(newStudentRecords.email)}',
        emergencyContact = '${escapeSql(newStudentRecords.emergencyContact)}'
        WHERE Student_ID = ${escapeSql(studentId)};
    `;

    return runQuery(sql);
}

/*

CRITERIA METHODS! 

These are methods to get lists of students back based on certain criteria such as:
-> Get every student
-> Get every student based on a disability
-> Get every student by a year

I will make any further suggestions
*/

const getAllStudents = async () => {

    const sql = "SELECT * FROM Student;";

    const result = await runQuery(sql);
    return result;
}

const getAllStudentsBasedOnADisability = (disabilityName) => {

    const getDisabilityIdSQL = `
        SELECT Disability_ID FROM Disability WHERE Disability_Name = '${escapeSql(disabilityName)}'
    `;

    const disabilityId = runQuery(getDisabilityIdSQL);

    const sql = `
        SELECT Student_ID FROM Student_Disability_Support WHERE Disability_ID = '${escapeSql(disabilityId)}'
    `;

    return runQuery(sql);
}

const getStudentByYear = (year) => {
    const sql = `
        SELECT Student_ID FROM student WHERE YEAR(DOB) = '${escapeSql(year)}'
    `;
    return runQuery(sql);
}



/* Move this to another file */
const updateStudentDisabilitySupportTable = (studentId, Disability_ID, Support_ID) => {
    
    for (let disability of disabilities) {
        const sql = `
            INSERT INTO Student_Disability_Support (Student_ID, Disability_ID)
            VALUES (
                ${studentId}, 
                ${Disability_ID},
                ${Support_ID}
            );
        `;

        // need to finish this function but my brain isnt working right now.  
    }
}