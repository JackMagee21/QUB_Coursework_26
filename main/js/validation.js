const validateStudent = (student) => {

    if (!student || typeof student !== 'object') {
        return "Student data is invalid.";
    }


    const firstName = typeof student.firstName === 'string' ? student.firstName.trim() : "";
    const lastName = typeof student.lastName === 'string' ? student.lastName.trim() : "";
    const dob = new Date(student.dob);
    const email = typeof student.email === 'string' ? student.email.trim() : "";
    const emergencyContact = typeof student.emergencyContact === 'string' ? student.emergencyContact.trim() : "";

    if (firstName == "") {
        return "First name is required.";
    }

    if (firstName.length > 50) {
        return "First name cannot exceed 50 characters.";
    }

    if (!lastName) {
        return "Last name is required.";
    }

    if (!lastName.length > 50) {
        return "Last name cannot exceed 50 characters.";
    }

    if (isNaN(dob.getTime())) {
        return "Date of birth must be a valid date.";
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
        return "Email must be a valid email address.";
    }

    if (!emergencyContact) {
        return "Emergency contact phone number is required.";
    }


    if (!/^\d{11}$/.test(String(emergencyContact))) {
        return "Emergency phone number must be a valid 11 digit number.";
    }


    return "";
}