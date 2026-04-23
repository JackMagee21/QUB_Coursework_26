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
    let emergencyContactName = "";
    let emergencyContactPNum = "";

    const supportNeeds = Array.isArray(student.supportNeeds) ? student.supportNeeds : [];
    const disabilities = Array.isArray(student.disabilities) ? student.disabilities : [];
    const classes = Array.isArray(student.classes) ? student.classes : [];
    
    const attendance = Number(student.attendance);

    if (isNaN(attendance) || attendance < 0 || attendance > 100) {
    return "Attendance must be between 0 and 100.";
    }

    if (emergencyContact) {
        // split parts of emergency contact info
        const contactParts = emergencyContact.split(" - ");
        
        emergencyContactName = contactParts[0].trim();
        emergencyContactPNum = contactParts[1].trim();
        
    } else {
        return "Emergency contact is required.";
    }
    
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
    if (lastName.length > 50) {
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

    // check if emergency contact phone number is provided
    //if (!emergencyContactPNum) {
    //    return "Emergency contact phone number is required.";
    //}

    // check if emergency contact name is too long
    //if (emergencyContactName.length > 100) {
    //    return "Emergency contact name cannot exceed 100 characters.";
    //}

    // check if emergency contact phone number correct length /**
    //if (emergencyContactPNum.length > 11) {
    //    return "Emergency phone number must be 11 digits long.";
    //}

    // check if emergency contact is a valid 11 digit number
    //if (!/^\d{11}$/.test(String(emergencyContactPNum))) {
    //    return "Emergency phone number must be a valid 11 digit number.";
    //}

    if (supportNeeds.length < 0) {
        return "At least one support need is required.";
    }

    if (disabilities.length < 0) {
        return "At least one disability is required.";
    }

    if (supportNeeds.length > 0 && disabilities.length === 0) {
        return "A student with support needs must have at least one disability.";
    }

    if (disabilities.length > 0 && supportNeeds.length === 0) {
        return "A student with a disability must have at least one support need.";
    }

    if(classes.length < 0 || classes.length === 0) {
        return "A student must be in at least one class";
    }

    // return empty string as error message if all checks are passed
    return "";
}

const validateTestResult = (testResult, selectedTestDetails) => {
    if (!testResult || typeof testResult !== 'object') {
        return "Test result data is invalid.";
    }
    
    if (testResult.studentId === null) {
        return "Student ID must be a number.";
    }

    if (testResult.score === null) {
        return "Test result must be a number.";
    }

    if (testResult.score < 0) {
        return "Test result cannot be negative.";
    }

    if (testResult.score > selectedTestDetails.Total_Marks) {
        return "Test result cannot exceed the total marks for the test.";
    }

    // return empty string as error message if all checks are passed
    return "";

}