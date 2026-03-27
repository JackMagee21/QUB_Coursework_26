const getAllTestsBasedOnSubject = (subjectId) => {
    const sql = `
        SELECT * FROM Test WHERE Subject_ID = ${escapeSql(subjectId)}
    `;
}