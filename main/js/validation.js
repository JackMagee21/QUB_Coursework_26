const validateStudent = (student) => {

    // check if student was actuallly provided and if it is an object.
    if (!student || typeof student !== 'object') {
        return "Student data is invalid.";
    }


    // check if each value is the correct data type.
    // if data is wrong type then set to an empty string.
    // trim whitespace at the start and end of strings
    const firstName = typeof student.firstName === 'string' ? student.firstName.trim() : "";
    const lastName = typeof student.lastName === 'string' ? student.lastName.trim() : "";
    const dob = new Date(student.dob);
    const email = typeof student.email === 'string' ? student.email.trim() : "";
    const emergencyContact = typeof student.emergencyContact === 'string' ? student.emergencyContact.trim() : "";

    // check if first name is provided
    if (firstName == "") {
        return "First name is required.";
    }

    //check length of first name
    if (firstName.length > 50) {
        return "First name cannot exceed 50 characters.";
    }

    // check last name is provided
    if (!lastName) {
        return "Last name is required.";
    }

    // check length of last name
    if (!lastName.length > 50) {
        return "Last name cannot exceed 50 characters.";
    }

    // check if dob is a valid date
    if (isNaN(dob.getDate())) {
        return "Date of birth must be a valid date.";
    }

    // check if email exists and if it is valid
    if (email === ""|| !email.includes('@') || !email.includes('.')) {
        return "Email must be a valid email address.";
    }

    // check if emergency contact is provided
    if (!emergencyContact) {
        return "Emergency contact phone number is required.";
    }

    // check if emergency contact is a valid 11 digit number
    if (!/^\d{11}$/.test(String(emergencyContact))) {
        return "Emergency phone number must be a valid 11 digit number.";
    }

    // return empty string as error message if all checks are passed
    return "";
}