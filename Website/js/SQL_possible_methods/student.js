
/*
Adding students, editting sudents and deleteing student methods
*/
const addStudentToTable = async (student) => {
    const studentSql = `
    INSERT INTO Student (Forename, Surname, Email, Emergency_Contact, DOB, Gender, Attendance_Percentage)
    VALUES (
        '${escapeSql(student.firstName)}', 
        '${escapeSql(student.lastName)}', 
        '${escapeSql(student.email)}', 
        '${escapeSql(student.emergencyContact)}', 
        '${escapeSql(student.dob)}',
        '${escapeSql(student.gender)}',
        ${Number(student.attendance)}
    )
`.trim();

    const StudentInsertResult = await runQuery(studentSql);

    if (!StudentInsertResult || StudentInsertResult.error) {
        return { success: false, error: StudentInsertResult ? StudentInsertResult.error : "Unknown error" };
    }

    const getStudentIdResult = await getLastInsertedStudentId();

    console.log(getStudentIdResult);

    let studentId = null;

    if (getStudentIdResult && getStudentIdResult.success) {
        studentId = getStudentIdResult.data[0].Student_ID;
    } else {
        return { success: false, error: getStudentIdResult ? getStudentIdResult.error : "Unknown error retrieving student ID" };
    }

    console.log(studentId);

    const numberOfSupports = student.assistance.length;
    const numberOfDisabilities = student.disabilities.length;
    let sqlStatements = [];

    for (let i = 0; i < Math.max(numberOfSupports, numberOfDisabilities); i++) {
        sqlStatements.push(`
            INSERT INTO Student_Disability_Support (Student_ID, Disability_ID, Assistance_ID)
            VALUES (${studentId}, ${i < numberOfDisabilities ? student.disabilities[i] : numberOfDisabilities}, ${i < numberOfSupports ? student.assistance[i] : numberOfSupports});`.trim());  
    }
    console.log(student.classes);

    const numberOfClasses = student.classes.length;
    for(let i = 0; i < numberOfClasses; i++) {
        sqlStatements.push(`INSERT INTO Student_Class (Class_ID, Student_ID) VALUES (${student.classes[i]}, ${studentId})`);
    }

    return await runMultipleQueries(sqlStatements);
}

const getLastInsertedStudentId = async () => {
    const sql = "SELECT Student_ID FROM Student ORDER BY Student_ID DESC LIMIT 1;";
    return await runQuery(sql);

}


const deleteStudentFromTable = async (studentId) => {

    const deleteClasses = `
        DELETE FROM Student_Class WHERE Student_ID=${studentId}
    `;

    await runQuery(deleteClasses);


    const deleteDisabilities = `
        DELETE FROM Student_Disability_Support WHERE Student_ID='${escapeSql(studentId)}' 
    `;

    await runQuery(deleteDisabilities);

    const deleteTest = `
        DELETE FROM Test_Student WHERE Student_ID='${escapeSql(studentId)}'
    `;

    await runQuery(deleteTest);


    const sql = `
        DELETE FROM Student WHERE Student_ID='${escapeSql(studentId)}' 
    `;
    
    result = await runQuery(sql);

    if(result.success == true)
        return true;
    else
        return false;
}

const editStudentFromTable = async (studentId, newStudentRecords) => {
    
    console.log(newStudentRecords.attendance);
    const sql = `
        UPDATE Student 
        SET
        Forename = '${escapeSql(newStudentRecords.firstName)}',
        Surname = '${escapeSql(newStudentRecords.lastName)}',
        DOB = '${escapeSql(newStudentRecords.dob)}',
        Email = '${escapeSql(newStudentRecords.email)}',
        Emergency_Contact = '${escapeSql(newStudentRecords.emergencyContact)}',
        Attendance_Percentage = '${newStudentRecords.attendance}' 
        WHERE Student_ID='${escapeSql(studentId)}';
    `;

  await runQuery(sql);

  // 2. Reset disability/assistance links, then re-insert the selected ones
  await runQuery(`DELETE FROM Student_Disability_Support WHERE Student_ID = ${escapeSql(studentId)};`);

  const disabilities = newStudentRecords.disabilities;
  const assistance   = newStudentRecords.assistance;

  console.log(disabilities);
  console.log(assistance);


  // Each disability gets paired with each assistance (matches your current schema)
  for (const disId of disabilities) {
    for (const assistId of assistance) {
      const insertSql = `
        INSERT INTO Student_Disability_Support (Student_ID, Disability_ID, Assistance_ID)
        VALUES (${escapeSql(studentId)}, ${escapeSql(disId)}, ${escapeSql(assistId)});
      `;
      await runQuery(insertSql);
    }
  }

  // 3. Reset class enrolments, then re-insert
  await runQuery(`DELETE FROM Student_Class WHERE Student_ID = ${escapeSql(studentId)};`);

  const classes = newStudentRecords.classes || [];
  console.log(classes);
  for (const classId of classes) {
    const insertClassSql = `
      INSERT INTO Student_Class (Class_ID, Student_ID)
      VALUES (${escapeSql(classId)}, ${escapeSql(studentId)});
    `;
    await runQuery(insertClassSql);
  }

  return { success: true };
};

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

const getStudentById = async (studentId) => {
    const sql = `SELECT * FROM Student WHERE Student_ID = ${escapeSql(studentId)}`;
    let result = await runQuery(sql);
    return result;
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