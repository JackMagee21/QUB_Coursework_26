const runQuery = async (sql) => {
    try{
        // store the url of database connector
        // i dont know how this will work with each of us having a different login
        const url = "https://jsheridan12.webhosting1.eeecs.qub.ac.uk/courseworkDbConnector.php";

        // send request to database
        const response = await fetch(url, {
            method: "POST", 
            body: new URLSearchParams({ query: sql })
        });

        // check if response is ok, if not throw an error
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        // convert response to json and return it
        const result = await response.json();
        return result;
    } catch (error) {
        // log any errors to the console for debugging
        console.log(error.message);
    }
}

const escapeSql = (value) => {
    // This function allows for apostophies in the database
    return value.replace(/'/g, "''");
}

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