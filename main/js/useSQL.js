const runQuery = async (sql) => {
    try{
        const url = "http://jsheridan12.webhosting1.eeecs.qub.ac.uk/dbConnector.php";

        const response = await fetch(url, {
            method: "POST", 
            body: new URLSearchParams({ query: sql })
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

const escapeSql = (value) => {
    return value.replace(/'/g, "''");
}

const AddStudentToTable = (student) => {
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
    runQuery(sql);
    return "Student successfully added!";
}