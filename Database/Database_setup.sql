
CREATE TABLE Assistance (
    Assistance_ID INT AUTO_INCREMENT PRIMARY KEY,
    Assistance_Type VARCHAR(100),
    Assistance_Name VARCHAR(100)
);

CREATE TABLE Disability (
    Disability_ID INT AUTO_INCREMENT PRIMARY KEY,
    Disability_Type VARCHAR(100),
    Disability_Name VARCHAR(100),
    Disability_Desc TEXT
);


CREATE TABLE Student (
    Student_ID INT AUTO_INCREMENT PRIMARY KEY,
    Forename VARCHAR(100),
    Surname VARCHAR(100),
    Email VARCHAR(150),
    Emergency_Contact VARCHAR(150)
);


CREATE TABLE Subject (
    Subject_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_Name VARCHAR(100),
    Subject_Desc TEXT,
    Required_Subject TEXT
);


CREATE TABLE Class (
    Class_ID INT AUTO_INCREMENT PRIMARY KEY,
    Class_Name VARCHAR(100) NOT NULL,
    Subject_ID INT,
    FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID)
);


CREATE TABLE Test (
    Test_ID INT AUTO_INCREMENT PRIMARY KEY,
    Subject_ID INT,
    Percent_of_subject DECIMAL(5,2),
    Total_Marks INT,
    Pass_Marks INT,
    FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID)
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

CREATE TABLE Test_Student (
    Student_ID INT,
    Test_ID INT,
    Grade DECIMAL(5,2),
    Pass_Fail BOOLEAN,
    PRIMARY KEY (Student_ID, Test_ID),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),
    FOREIGN KEY (Test_ID) REFERENCES Test(Test_ID)
);
