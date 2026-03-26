/* 

ONLY READ IF YOU WANT A FULL DEFINATION OF FILE

This file is for saving text locally when typing and moving pages, the text that a user might be currently typing will be save.

CURRENTLY ONLY FOR: addRecord.html
FOR EXAMPLE:

-> if i was to fill out the 'studentFirstName' with the input "Ja", then click the "Reports" hyperlink, the text "Ja" would still be there
    and would'nt be saved there without these functions

The file currently only applies for the following inputs:

-> "studentFirstName" input box
-> "studentLastName" input box
-> "studentDOB" input box
-> "studentEmail" input box
-> "emergencyContact" input box

Any future inputs that are added to the 'addRecord.html' page, this file will be updated and i will be very open to doing that ( Jack! d=====(￣▽￣*)b )

The local storage will always record the last input that the user enters and will only be emptied when:

-> the user clicks the 'submit' button -> also for submiting it will clear the input boxes as well ( just as a heads up )
-> if the user closes the window / Closes the live server

File as three main functions currently

-> saveLocalValues() - saves current input into localStorage
-> loadLocalValues() - when coming back to the page, loads whatever inputs where saved in localStorage
-> clearLocalValues() - Clears localStorage completely + clears any text in the input boxes

If anyone actually reads this and feels that this is not need, needs an adjustment or finds a bug related to this, please let me know!
- Jack

(´▽`ʃ♡ƪ)

*/


function saveLocalValues(){
    const forename = document.getElementById("studentFirstName").value.trim();
    const surname = document.getElementById("studentLastName").value.trim();
    const dateOfBirth = document.getElementById("studentDOB").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const emergancyContact = document.getElementById("emergencyContact").value.trim();

    localStorage.setItem("savedForename", forename);
    localStorage.setItem("savedSurname", surname);
    localStorage.setItem("savedDOB", dateOfBirth);
    localStorage.setItem("savedEmail", email);
    localStorage.setItem("savedContact", emergancyContact);
}

function loadLocalValues(){
    document.getElementById("studentFirstName").value = localStorage.getItem("savedForename");
    document.getElementById("studentLastName").value = localStorage.getItem("savedSurname");
    document.getElementById("studentDOB").value = localStorage.getItem("savedDOB");
    document.getElementById("studentEmail").value = localStorage.getItem("savedEmail");
    document.getElementById("emergencyContact").value = localStorage.getItem("savedContact");
}

function clearLocalValues(){
    localStorage.clear();
    document.getElementById("studentFirstName").value = "";
    document.getElementById("studentLastName").value = "";
    document.getElementById("studentDOB").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("emergencyContact").value = "";
    console.log("Values cleared");
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("studentFirstName").addEventListener("input", saveLocalValues);
    document.getElementById("studentLastName").addEventListener("input", saveLocalValues);
    document.getElementById("studentDOB").addEventListener("input", saveLocalValues);
    document.getElementById("studentEmail").addEventListener("input", saveLocalValues);
    document.getElementById("emergencyContact").addEventListener("input", saveLocalValues);

    window.addEventListener("load", loadLocalValues);
    window.addEventListener("beforeunload", clearLocalValues);
});