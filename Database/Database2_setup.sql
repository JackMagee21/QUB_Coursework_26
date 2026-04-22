

/* Current database setup 11/04/26 */

/* Non-linked tables */

CREATE TABLE Student (
    Student_ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Forename VARCHAR(100) NOT NULL,
    Surname VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL,
    Emergency_Contact VARCHAR(150) NOT NULL,
    DOB DATE NOT NULL,
    Attendance_Percentage DECIMAL(5,2),
    Gender ENUM('Male', 'Female', 'Other') NOT NULL
);

CREATE TABLE Disability (
    Disability_ID INT AUTO_INCREMENT PRIMARY KEY,
    Disability_Type VARCHAR(100) NOT NULL,
    Disability_Name VARCHAR(100) NOT NULL,
    Category ENUM('Learning', 'Physical', 'Mental Health', 'Neurodevelopmental', 'Sensory', 'Other') NOT NULL,
    Disability_Desc TEXT NOT NULL
);

CREATE TABLE Teacher (
    Teacher_ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Title VARCHAR(20),
    Forename VARCHAR(100) NOT NULL,
    Surname VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL,
    Start_Working_Date DATE NOT NULL
);

CREATE TABLE Assistance (
    Assistance_ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Assistance_Type VARCHAR(100) NOT NULL,
    Assistance_Name VARCHAR(100) NOT NULL
);

CREATE TABLE Subject (
    Subject_ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Subject_Name VARCHAR(100) NOT NULL,
    Credential_Type ENUM('Key Stage', 'GCSE', 'A-level', 'BTEC', 'Other') NOT NULL,
    Entry_Requirements VARCHAR(200),
    Subject_Desc TEXT NOT NULL
);

/* Linked tables */

CREATE TABLE Class (
    Class_ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Subject_ID INT NOT NULL,

    Class_Name VARCHAR(200) NOT NULL,

    FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID)
);

CREATE TABLE Teacher_Class (
    Teacher_Class_ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Teacher_ID INT NOT NULL,
    Class_ID INT NOT NULL, 
    
    Role ENUM('Teacher', 'Co-Teacher', 'Teaching Assistant') NOT NULL,

    FOREIGN KEY (Teacher_ID) REFERENCES Teacher(Teacher_ID),
    FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID)
);

CREATE TABLE Student_Class (
    Class_ID INT NOT NULL,
    Student_ID INT NOT NULL,

    PRIMARY KEY (Class_ID, Student_ID),
    
    FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID)
);

CREATE TABLE Test (
    Test_ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Subject_ID INT NOT NULL,

    Name VARCHAR(250) NOT NULL,
    Percent_of_subject DECIMAL(5,2) NOT NULL,
    Total_Marks INT NOT NULL,
    Pass_Marks INT NOT NULL,
    Completion_Date Date NOT NULL,
    
    FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID)
);

CREATE TABLE Test_Student (
    Student_ID INT NOT NULL,
    Test_ID INT NOT NULL,

    Score DECIMAL(6,2) NOT NULL,
    Grade VARCHAR(20) NOT NULL,

    PRIMARY KEY (Student_ID, Test_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),
    FOREIGN KEY (Test_ID) REFERENCES Test(Test_ID)
);

CREATE TABLE Student_Disability_Support (
    Student_ID INT NOT NULL,
    Disability_ID INT NOT NULL,
    Assistance_ID INT NOT NULL,

    PRIMARY KEY (Student_ID, Disability_ID, Assistance_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),
    FOREIGN KEY (Disability_ID) REFERENCES Disability(Disability_ID),
    FOREIGN KEY (Assistance_ID) REFERENCES Assistance(Assistance_ID)
);

CREATE TABLE Class_Test (
    Class_ID INT NOT NULL,
    Test_ID INT NOT NULL,

    PRIMARY KEY (Class_ID, Test_ID),
    FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID),
    FOREIGN KEY (Test_ID) REFERENCES Test(Test_ID)
);




