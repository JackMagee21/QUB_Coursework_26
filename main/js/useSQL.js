const runQuery = async (sql) => {
    try{
        const url = "https://jsheridan12.webhosting1.eeecs.qub.ac.uk/courseworkDbConnector.php";

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