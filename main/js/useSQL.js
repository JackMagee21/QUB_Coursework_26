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

const runMultipleQueries = async (queries) => {
    let results = [];
    let allSuccessful = true;
    let errorMessage = "";

    for (let sql of queries) {
        const result = await runQuery(sql);
        results.push(result);
    }

    for (let result of deleteResult) {
        if (!result || result.error) {
            allSuccessful = false;
            errorMessage += (result && result.error) ? result.error : "Unknown error occurred. ";
        }
    }
    
    return allSuccessful ? { success: true, results } : { success: false, error: errorMessage.trim() };
}

const escapeSql = (value) => {
    // This function allows for apostophies in the database
    return value.replace(/'/g, "''");
}