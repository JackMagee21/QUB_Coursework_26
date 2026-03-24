function saveLocalValues(){
    const forename = document.getElementById("studentFirstName").value.trim();
    const surname = document.getElementById("studentLastName").value.trim();

    const dateOfBirth = document.getElementById("studentDOB").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const emergancyContact = document.getElementById("studentEmergencyContact").value.trim();

    localStorage.setItem("savedForename", forename);
    localStorage.setItem("savedSurname", surname);
    localStorage.setItem("savedDOB", dateOfBirth);
    localStorage.setItem("savedEmail", email);
    localStorage.setItem("savedContact", emergancyContact);
}

function loadLocalValues(){
    const savedForename = localStorage.getItem("savedForename");
    const savedSurname = localStorage.getItem("savedSurname");
    const savedDOB = localStorage.getItem("savedDOB");
    const savedEmail = localStorage.getItem("savedEmail");
    const savedContact = localStorage.getItem("savedContact");

    document.getElementById("studentFirstName").value = savedForename;
    document.getElementById("studentLastName").value = savedSurname;
    document.getElementById("studentDOB").value = savedDOB;
    document.getElementById("studentEmail").value = savedEmail;
    document.getElementById("studentEmergencyContact").value = savedContact;
}

function clearLocalValues(){

    localStorage.clear();

    document.getElementById("studentFirstName").value = "";
    document.getElementById("studentLastName").value = "";
    document.getElementById("studentDOB").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentEmergencyContact").value = "";

    console.log("Values cleared");
}

document.getElementById("studentFirstName").addEventListener("input", saveLocalValues);
document.getElementById("studentLastName").addEventListener("input", saveLocalValues);
document.getElementById("studentDOB").addEventListener("input", saveLocalValues);
document.getElementById("studentEmail").addEventListener("input", saveLocalValues);
document.getElementById("studentEmergencyContact").addEventListener("input", saveLocalValues);

window.addEventListener("load", loadLocalValues);
