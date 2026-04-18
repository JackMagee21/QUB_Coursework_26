

/* Current database setup 11/04/26 */

/* Non-linked tables */

CREATE TABLE Student (
    Student_ID INT AUTO_INCREMENT PRIMARY KEY,
    Forename VARCHAR(100),
    Surname VARCHAR(100),
    Email VARCHAR(150),
    Emergency_Contact VARCHAR(150),
    DOB DATE,
    Attendance_Percentage DECIMAL(5,2),
    Gender ENUM('Male', 'Female', 'Other')
);

CREATE TABLE Disability (
    Disability_ID INT AUTO_INCREMENT PRIMARY KEY,
    Disability_Type VARCHAR(100),
    Disability_Name VARCHAR(100),
    Category ENUM('Learning', 'Physical', 'Mental Health', 'Neurodevelopmental', 'Sensory', 'Other'),
    Disability_Desc TEXT
);

CREATE TABLE Teacher (
    Teacher_ID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(20),
    Forename VARCHAR(100),
    Surname VARCHAR(100),
    Email VARCHAR(150),
    Start_Working_Date DATE
);

CREATE TABLE Assistance (
    Assistance_ID INT AUTO_INCREMENT PRIMARY KEY,
    Assistance_Type VARCHAR(100),
    Assistance_Name VARCHAR(100)
);

CREATE TABLE Subject (
    Subject_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_Name VARCHAR(100),
    Credential_Type ENUM('Key Stage', 'GCSE', 'A-level', 'BTEC', 'Other'),
    Entry_Requirements VARCHAR(200),
    Subject_Desc TEXT
);

/* Linked tables */

CREATE TABLE Class (
    Class_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_ID INT,

    Class_Name VARCHAR(200) NOT NULL,

    FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID)
);

CREATE TABLE Teacher_Class (
    Teacher_Class_ID INT AUTO_INCREMENT PRIMARY KEY,
    Teacher_ID INT,
    Class_ID INT, 

    Role ENUM('Teacher', 'Co-Teacher', 'Teaching Assistant'),

    FOREIGN KEY (Teacher_ID) REFERENCES Teacher(Teacher_ID),
    FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID)
);

CREATE TABLE Student_Class (
    Class_ID INT,
    Student_ID INT,

    PRIMARY KEY (Class_ID, Student_ID),
    
    FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID)
);

CREATE TABLE Test (
    Test_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_ID INT,

    Name VARCHAR(250),
    Percent_of_subject DECIMAL(5,2),
    Total_Marks INT,
    Pass_Marks INT,
    Completion_Date Date,
    
    FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID)
);

CREATE TABLE Test_Student (
    Student_ID INT,
    Test_ID INT,

    Score DECIMAL(6,2),
    Grade VARCHAR(20),

    PRIMARY KEY (Student_ID, Test_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),
    FOREIGN KEY (Test_ID) REFERENCES Test(Test_ID)
);

CREATE TABLE Student_Disability_Support (
    Student_ID INT,
    Disability_ID INT,
    Assistance_ID INT,

    PRIMARY KEY (Student_ID, Disability_ID, Assistance_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),
    FOREIGN KEY (Disability_ID) REFERENCES Disability(Disability_ID),
    FOREIGN KEY (Assistance_ID) REFERENCES Assistance(Assistance_ID)
);

CREATE TABLE Class_Test (
    Class_ID INT,
    Test_ID INT,

    PRIMARY KEY (Class_ID, Test_ID),
    FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID),
    FOREIGN KEY (Test_ID) REFERENCES Test(Test_ID)
);




